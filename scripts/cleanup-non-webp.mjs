#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'

const projectRoot = process.cwd()
const args = process.argv.slice(2)

const DRY_RUN = args.includes('--dry-run')
const YES = args.includes('--yes') || args.includes('-y')

const publicArg = args.find((a) => a.startsWith('--public='))
const PUBLIC_OVERRIDE =
  (publicArg && publicArg.slice('--public='.length)) ||
  process.env.PUBLIC_DIR ||
  null

// ===== 配置 =====
// 需要删除的图片扩展名（svg 与 webp 除外）
const DELETE_EXTS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.bmp',
  '.tif',
  '.tiff',
  '.avif',
  '.ico',
  '.jfif',
  '.pjpeg',
  '.pjp',
  '.apng'
])

const UNLINK_RETRIES = 5
const UNLINK_RETRY_DELAY_MS = 150
// ================

const stats = {
  scanned: 0,
  deleted: 0,
  failed: 0,
  warnings: []
}

let PUBLIC_DIR = null

async function main() {
  PUBLIC_DIR = await findPublicDir()

  if (!PUBLIC_DIR) {
    console.error('未找到 public 目录，请使用 --public=docs/public 显式指定')
    process.exit(1)
  }

  console.log(`项目根目录: ${projectRoot}`)
  console.log(`public 目录: ${PUBLIC_DIR}`)

  if (DRY_RUN) console.log('模式: dry-run，不会删除任何文件')
  if (!DRY_RUN && !YES) {
    console.log('提示: 未加 --yes，仅列出将要删除的文件')
  }

  const targets = await collectTargets(PUBLIC_DIR)

  stats.scanned = targets.length

  console.log(`\n找到 ${targets.length} 个待删除图片文件`)

  for (const file of targets) {
    const rel = path.relative(projectRoot, file)
    console.log(`删除: ${rel}`)
  }

  if (DRY_RUN || !YES) {
    console.log('\n未执行删除（dry-run 或未加 --yes）')
    console.log(`共 ${targets.length} 个文件会被删除`)
    return
  }

  console.log('\n开始删除...')

  for (const file of targets) {
    const rel = path.relative(projectRoot, file)
    const ok = await safeUnlink(file)
    if (ok) {
      stats.deleted++
    } else {
      stats.failed++
      stats.warnings.push(`删除失败: ${rel}`)
    }
  }

  // 清理可能残留的空目录（可选，注释掉即可保留空目录）
  await removeEmptyDirs(PUBLIC_DIR)

  console.log('\n完成')
  console.log(`扫描到图片文件: ${stats.scanned}`)
  console.log(`已删除: ${stats.deleted}`)
  console.log(`失败: ${stats.failed}`)

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

async function collectTargets(dir) {
  const out = []

  async function walk(current) {
    const entries = await fs.readdir(current, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)

      if (entry.isDirectory()) {
        await walk(fullPath)
        continue
      }

      const ext = path.extname(entry.name).toLowerCase()

      // 只删图片类且不在白名单（svg / webp）
      if (DELETE_EXTS.has(ext)) {
        out.push(fullPath)
      }
    }
  }

  await walk(dir)
  return out
}

/**
 * 带重试的删除，应对 Windows 上的 EPERM / EBUSY
 */
async function safeUnlink(filePath) {
  for (let i = 0; i < UNLINK_RETRIES; i++) {
    try {
      await fs.unlink(filePath)
      return true
    } catch (err) {
      if (err.code === 'ENOENT') return true

      // 只对可重试的错误重试
      if (!['EPERM', 'EBUSY', 'EACCES'].includes(err.code)) {
        console.warn(`unlink 失败: ${filePath} -> ${err.code} ${err.message}`)
        return false
      }

      await delay(UNLINK_RETRY_DELAY_MS * (i + 1))
    }
  }

  console.warn(`unlink 最终失败: ${filePath} -> 文件可能被其他程序占用`)
  return false
}

/**
 * 递归删除 public 下的空目录（自底向上）
 */
async function removeEmptyDirs(dir) {
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return false
  }

  let isEmpty = true

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      const childEmpty = await removeEmptyDirs(fullPath)
      if (childEmpty) {
        try {
          await fs.rmdir(fullPath)
          console.log(
            `删除空目录: ${path.relative(projectRoot, fullPath)}`
          )
        } catch {
          isEmpty = false
        }
      } else {
        isEmpty = false
      }
    } else {
      isEmpty = false
    }
  }

  return isEmpty
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})