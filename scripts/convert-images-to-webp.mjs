#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const projectRoot = process.cwd()
const args = process.argv.slice(2)

const FORCE = args.includes('--force')
const DRY_RUN = args.includes('--dry-run')

const REMOVE_MISSING = !args.includes('--no-remove-missing')
const DELETE_ORIGINALS = !args.includes('--keep-originals')

const publicArg = args.find((a) => a.startsWith('--public='))
const PUBLIC_OVERRIDE =
  (publicArg && publicArg.slice('--public='.length)) ||
  process.env.PUBLIC_DIR ||
  null

const scanArgs = args.filter((a) => !a.startsWith('--'))

// ===== 配置 =====
const CONVERT_EXTS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.bmp',
  '.tif',
  '.tiff',
  '.avif'
])

const WEBP_QUALITY = 80

// 删除原图重试配置（应对 Windows EPERM/EBUSY）
const UNLINK_RETRIES = 5
const UNLINK_RETRY_DELAY_MS = 150
// ================

const stats = {
  converted: 0,
  skipped: 0,
  updatedFiles: 0,
  removed: 0,
  deleted: 0,
  warnings: []
}

const webpCache = new Map()

let PUBLIC_DIR = null
let SCAN_DIRS = []

async function main() {
  PUBLIC_DIR = await findPublicDir()

  if (!PUBLIC_DIR) {
    console.error('未找到 public 目录，请使用 --public=docs/public 显式指定')
    process.exit(1)
  }

  SCAN_DIRS = scanArgs.length
    ? scanArgs.map((p) => path.resolve(projectRoot, p))
    : [path.resolve(projectRoot, 'docs')]

  console.log(`项目根目录: ${projectRoot}`)
  console.log(`public 目录: ${PUBLIC_DIR}`)
  console.log(`扫描目录: ${SCAN_DIRS.join(', ')}`)
  console.log(`删除缺失/损坏图片链接: ${REMOVE_MISSING ? '开启' : '关闭'}`)
  console.log(`转换后删除原图: ${DELETE_ORIGINALS ? '开启' : '关闭'}`)

  if (DRY_RUN) console.log('模式: dry-run，不会写入/删除任何文件')
  if (FORCE) console.log('模式: force，会覆盖已存在的 .webp')

  const mdFiles = []

  for (const dir of SCAN_DIRS) {
    try {
      mdFiles.push(...(await walk(dir)))
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.warn(`目录不存在，已跳过: ${dir}`)
      } else {
        throw err
      }
    }
  }

  console.log(`找到 ${mdFiles.length} 个 Markdown 文件`)

  for (const file of mdFiles) {
    await processMarkdownFile(file)
  }

  console.log('\n完成')
  console.log(`转换/生成 webp: ${stats.converted}`)
  console.log(`跳过已存在 webp: ${stats.skipped}`)
  console.log(`更新 Markdown 文件: ${stats.updatedFiles}`)
  console.log(`删除的缺失/损坏图片链接: ${stats.removed}`)
  console.log(`删除的原图文件: ${stats.deleted}`)

  if (stats.warnings.length) {
    console.log(`\n警告 ${stats.warnings.length} 条:`)
    for (const warning of stats.warnings) {
      console.log(`- ${warning}`)
    }
  }
}

async function findPublicDir() {
  if (PUBLIC_OVERRIDE) {
    const abs = path.resolve(projectRoot, PUBLIC_OVERRIDE)
    return (await exists(abs)) ? abs : null
  }

  const candidates = [
    path.resolve(projectRoot, 'docs/public'),
    path.resolve(projectRoot, 'public'),
    path.resolve(projectRoot, 'src/public')
  ]

  for (const c of candidates) {
    if (await exists(c)) return c
  }

  return null
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (
        ['node_modules', '.git', '.vitepress', 'dist', 'public'].includes(
          entry.name
        )
      ) {
        continue
      }

      files.push(...(await walk(fullPath)))
    } else if (/\.mdx?$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

async function processMarkdownFile(file) {
  let content = await fs.readFile(file, 'utf8')
  const original = content

  const mdLinkRe = /(!?\[[^\]]*\]\()([^)\s]+)([^)]*\))/g

  content = await replaceAsync(
    content,
    mdLinkRe,
    async (match, prefix, url, suffix) => {
      const result = await processUrl(url, file)

      if (result.remove && REMOVE_MISSING) {
        return ''
      }

      if (result.remove) {
        return prefix + url + suffix
      }

      return prefix + result.url + suffix
    }
  )

  const htmlImgRe = /(<img\b[^>]*\bsrc=["'])([^"']+)(["'][^>]*>)/gi

  content = await replaceAsync(
    content,
    htmlImgRe,
    async (match, prefix, url, suffix) => {
      const result = await processUrl(url, file)

      if (result.remove && REMOVE_MISSING) {
        return ''
      }

      if (result.remove) {
        return prefix + url + suffix
      }

      return prefix + result.url + suffix
    }
  )

  if (content !== original) {
    if (!DRY_RUN) {
      await fs.writeFile(file, content, 'utf8')
    }

    stats.updatedFiles++
    console.log(
      `${DRY_RUN ? '[dry-run] 将更新' : '更新'}: ${path.relative(
        projectRoot,
        file
      )}`
    )
  }
}

async function processUrl(url, mdFile) {
  const resolved = resolveSource(url, mdFile)

  if (!resolved) {
    return { url, remove: false }
  }

  const { src } = resolved

  if (!(await exists(src))) {
    stats.warnings.push(
      `源文件不存在，将从文章中删除该链接: ${url} -> ${src}`
    )
    stats.removed++
    return { url, remove: true }
  }

  const result = await ensureWebp(src)

  if (!result.ok) {
    stats.warnings.push(
      `转换失败（视作缺失），将从文章中删除该链接: ${url} -> ${result.error}`
    )
    stats.removed++
    return { url, remove: true }
  }

  return { url: toWebpUrl(url), remove: false }
}

function resolveSource(url, mdFile) {
  if (isExternalUrl(url)) return null

  const { pathPart } = splitUrl(url)
  const ext = path.extname(pathPart).toLowerCase()

  if (!CONVERT_EXTS.has(ext)) return null

  const decoded = decodeURIComponent(pathPart)

  if (decoded.startsWith('/')) {
    const abs = path.join(PUBLIC_DIR, decoded)
    if (!isInside(PUBLIC_DIR, abs)) return null
    return { src: abs }
  }

  const absFromMd = path.resolve(path.dirname(mdFile), decoded)
  if (isInside(PUBLIC_DIR, absFromMd)) {
    return { src: absFromMd }
  }

  const absFromPublic = path.resolve(PUBLIC_DIR, decoded)
  if (isInside(PUBLIC_DIR, absFromPublic)) {
    return { src: absFromPublic }
  }

  return null
}

function isInside(parent, child) {
  const rel = path.relative(parent, child)
  return rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel)
}

async function ensureWebp(src) {
  if (webpCache.has(src)) {
    return webpCache.get(src)
  }

  const ext = path.extname(src).toLowerCase()

  if (!CONVERT_EXTS.has(ext)) {
    const r = { ok: false, error: '不支持的扩展名' }
    webpCache.set(src, r)
    return r
  }

  const dest = src.slice(0, -ext.length) + '.webp'

  try {
    let reused = false

    if (!FORCE && (await exists(dest))) {
      stats.skipped++
      reused = true
    } else if (DRY_RUN) {
      console.log(
        `[dry-run] 转换: ${path.relative(projectRoot, src)} -> ${path.relative(
          projectRoot,
          dest
        )}`
      )
      stats.converted++
    } else {
      await fs.mkdir(path.dirname(dest), { recursive: true })

      // === 关键修复 ===
      // 先读入内存，再交给 sharp 处理，避免 sharp 打开并锁定源文件句柄。
      // 这样在 Windows 上后续 unlink 才不会报 EPERM。
      const buffer = await fs.readFile(src)

      await sharp(buffer, { animated: true })
        .webp({ quality: WEBP_QUALITY, effort: 6 })
        .toFile(dest)

      stats.converted++
    }

    // === 删除原图：带重试，应对 Windows EPERM/EBUSY ===
    if (DELETE_ORIGINALS) {
      if (DRY_RUN) {
        console.log(`[dry-run] 将删除原图: ${path.relative(projectRoot, src)}`)
        stats.deleted++
      } else {
        const ok = await safeUnlink(src)
        if (ok) {
          stats.deleted++
          console.log(`删除原图: ${path.relative(projectRoot, src)}`)
        } else {
          stats.warnings.push(
            `删除原图失败（文件可能被其他程序占用）: ${path.relative(
              projectRoot,
              src
            )}`
          )
        }
      }
    }

    const r = { ok: true, dest, reused }
    webpCache.set(src, r)
    return r
  } catch (err) {
    const r = { ok: false, error: err.message }
    webpCache.set(src, r)
    return r
  }
}

/**
 * 带重试的删除，主要应对 Windows 上偶发的 EPERM / EBUSY
 * 返回 true 表示删除成功（或文件本来就不存在）
 */
async function safeUnlink(filePath) {
  let lastErr = null

  for (let i = 0; i < UNLINK_RETRIES; i++) {
    try {
      await fs.unlink(filePath)
      return true
    } catch (err) {
      if (err.code === 'ENOENT') return true

      lastErr = err

      // 只对可重试的错误重试
      if (!['EPERM', 'EBUSY', 'EACCES'].includes(err.code)) {
        break
      }

      await delay(UNLINK_RETRY_DELAY_MS * (i + 1))
    }
  }

  if (lastErr) {
    // 把最终失败原因附加进告警里
    console.warn(`unlink 最终失败: ${filePath} -> ${lastErr.code} ${lastErr.message}`)
  }

  return false
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function toWebpUrl(url) {
  const { pathPart, rest } = splitUrl(url)

  const newPathPart = pathPart.replace(
    /\.(jpe?g|png|gif|bmp|tif?f|avif)$/i,
    '.webp'
  )

  return newPathPart + rest
}

function splitUrl(url) {
  const match = url.match(/^([^?#]*)(.*)$/)

  return {
    pathPart: match[1],
    rest: match[2] || ''
  }
}

function isExternalUrl(url) {
  return (
    /^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(url) ||
    url.startsWith('data:') ||
    url.startsWith('mailto:') ||
    url.startsWith('tel:') ||
    url.startsWith('blob:')
  )
}

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function replaceAsync(str, regex, replacer) {
  const parts = []
  let lastIndex = 0

  for (const match of str.matchAll(regex)) {
    parts.push(str.slice(lastIndex, match.index))
    parts.push(await replacer(...match))
    lastIndex = match.index + match[0].length
  }

  parts.push(str.slice(lastIndex))

  return parts.join('')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})