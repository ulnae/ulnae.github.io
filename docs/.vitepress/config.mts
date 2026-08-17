import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',

  title: 'ulnae',
  description: 'ulnae 的个人网站 - 记录技术、生活与思考',

  lang: 'zh-CN',

  head: [
    [
      'link',
      { rel: 'icon', href: '/logo.svg' }
    ]
  ],

  cleanUrls: true,

  // 需要 git 支持，本地开发如无 git 请设为 false；CI/生产环境建议设为 true
  lastUpdated: false,

  ignoreDeadLinks: true,

  sitemap: {
    hostname: 'https://ulnae.github.io'
  },

  themeConfig: {
    logo: '/logo.svg',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ulnae' },
      { icon: 'juejin', link: 'https://juejin.cn/user/3650034336020430' },
    ],

    nav: [
      { text: '首页', link: '/' },
      { text: '鱼类', link: '/fish/started' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/fish/': [
        {
          text: '鱼类',
          items: [
            { text: '中国鱼类完整物种名录', link: '/fish/started' },
            { text: '无颌与软骨鱼纲', link: '/fish/01' },
            { text: '原始类群与鲱鳗类', link: '/fish/02' },
            { text: '鲤形目_鲤科(上)', link: '/fish/03' },
            { text: '鲤形目_鲤科(下)与鳅类', link: '/fish/04' },
            { text: '鲇鲑等淡水目', link: '/fish/05' },
            { text: '鲈形目_海洋(一)', link: '/fish/06' },
            { text: '鲈形目_海洋(二)', link: '/fish/07' },
            { text: '鲈形目_淡水与鳜鳢类', link: '/fish/08' },
            { text: '鲀鲽鮟鱇等特化类', link: '/fish/09' },
            { text: '其余海洋类群与外来种', link: '/fish/10' },
          ]
        }
      ]
    },

    // footer: {
    //   message: '基于 MIT 许可发布',
    //   copyright: '版权所有 © 2026-至今 三文鱼'
    // },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: { // 如果你想翻译默认语言，请将此处设为 `root`
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '输入',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc'
                }
              }
            }
          }
        }
      }
    },

    editLink: {
      pattern: 'https://github.com/ulnae/ulnae.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short',
        hourCycle: 'h24'
      }
    },

    outline: {
      label: '页面导航'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    externalLinkIcon: true
  },

  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoad: true,
    },
    lineNumbers: true

  },
})