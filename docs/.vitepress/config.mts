import { defineConfig } from 'vitepress'
export default defineConfig({
  base: '/',

  title: 'ulnae',
  description: 'ulnae 的个人网站 - 记录技术、生活与思考',

  lang: 'zh-CN',

  head: [
    [
      'meta',
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
    ],
    [
      'link',
      { rel: 'icon', href: '/favicon.svg' }
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
    logo: {
      light: '/logo/light.svg',
      dark: '/logo/dark.svg',
      alt: 'ulnae'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ulnae' },
      { icon: 'juejin', link: 'https://juejin.cn/user/3650034336020430' },
    ],

    nav: [
      { text: '鱼类', link: '/fish/started', activeMatch: '/fish/' },
      { text: '鱼钩', link: '/hook/started', activeMatch: '/hook/' },
      { text: '鱼线', link: '/line/started', activeMatch: '/line/' },
      { text: '鱼漂', link: '/float/started', activeMatch: '/float/' },
      { text: '渔轮', link: '/ship/started', activeMatch: '/ship/' },
      { text: '鱼竿', link: '/pole/started', activeMatch: '/pole/' },
      { text: '关于', link: '/about/started', activeMatch: '/about/' }
    ],

    sidebar: {
      '/fish/': [
        {
          text: '文档目录',
          items: [
            { text: '鱼类总览', link: '/fish/started' },
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
      ],
      '/hook/': [
        {
          text: '文档目录',
          items: [
            { text: '鱼钩总览', link: '/hook/started' },
            { text: '海钓类鱼钩', link: '/hook/01' },
            { text: '淡水钓类鱼钩', link: '/hook/02' },
            { text: '路亚钓类鱼钩', link: '/hook/03' },
            { text: '矶钓类鱼钩', link: '/hook/04' },
            { text: '飞钓类鱼钩', link: '/hook/05' },
            { text: '筏钓类鱼钩', link: '/hook/06' },
            { text: '特殊用途鱼钩', link: '/hook/07' },
            { text: '鱼钩规格对照表', link: '/hook/compare' },
            { text: '选钩速查指南', link: '/hook/guide' },
          ]
        }
      ],
      '/line/': [
        {
          text: '文档目录',
          items: [
            { text: '鱼线总览', link: '/line/started' },
            { text: '台钓鱼线', link: '/line/01' },
            { text: '路亚钓鱼线', link: '/line/02' },
            { text: '海钓鱼线', link: '/line/03' },
            { text: '飞钓鱼线', link: '/line/04' },
            { text: '筏钓与冰钓鱼线', link: '/line/05' },
            { text: '矶钓鱼线', link: '/line/06' },
            { text: '鱼线材质与编数', link: '/line/07' },
          ]
        }
      ],
      '/pole/': [
        {
          text: '文档目录',
          items: [
            { text: '鱼竿总览', link: '/pole/started' },
            { text: '淡水钓鱼竿', link: '/pole/01' },
            { text: '海钓鱼竿', link: '/pole/02' },
            { text: '路亚钓鱼竿', link: '/pole/03' },
            { text: '飞钓与冰钓鱼竿', link: '/pole/04' },
            { text: '筏钓及特殊钓法鱼竿', link: '/pole/05' },
          ]
        }
      ],
      '/ship/': [
        {
          text: '文档目录',
          items: [
            { text: '渔轮总览', link: '/ship/started' },
            { text: '淡水钓渔轮', link: '/ship/01' },
            { text: '海钓渔轮', link: '/ship/02' },
            { text: '路亚钓渔轮', link: '/ship/03' },
            { text: '飞钓与冰钓渔轮', link: '/ship/04' },
            { text: '特殊钓法与传统渔轮', link: '/ship/05' },
          ]
        }
      ],
      '/float/': [
        {
          text: '文档目录',
          items: [
            { text: '鱼漂总览', link: '/float/started' },
            { text: '台钓与竞技立漂', link: '/float/01' },
            { text: '传统钓漂', link: '/float/02' },
            { text: '远投与大水面浮漂', link: '/float/03' },
            { text: '矶钓浮标', link: '/float/04' },
            { text: '特殊用途漂', link: '/float/05' },
          ]
        }
      ],
      '/about/': [
        {
          text: '文档目录',
          items: [
            { text: '关于本站', link: '/about/started' },
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
      level: 'deep',
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
    // lineNumbers: true

  },

  vite: {
    server: {
      host: '0.0.0.0',
    },
    plugins: [
    ],
    build: {
      rollupOptions: {
        output: {
          // 配置代码分割
          codeSplitting: {
            groups: [
              {
                test: /node_modules\/medium-zoom/,
                name: 'medium-zoom',
              },
              {
                test: /node_modules\/@giscus\/vue/,
                name: 'giscus',
              },
            ],
          },
        },
      },
    },
  }
})