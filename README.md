# ulnae.github.io

> 一个爱钓鱼的切图仔，用代码记录钓鱼装备与鱼类知识。

基于 [VitePress](https://vitepress.dev/) 构建的个人钓鱼知识库，系统整理垂钓相关的鱼类学与钓具知识，涵盖**鱼类、鱼钩、鱼线、鱼竿、渔轮、鱼漂**六大知识体系。

**在线访问**：[https://ulnae.github.io](https://ulnae.github.io)

## 内容概览

| 板块 | 内容概述 | 文档数量 |
|------|----------|----------|
| [鱼类](docs/fish/started.md) | 中国鱼类完整物种名录，按「纲 → 目 → 科 → 种」逐种单列，收录体型、分布、习性、特征四要素 | 10 卷，1,881 种 |
| [鱼钩](docs/hook/started.md) | 按垂钓方式分类的鱼钩指南：海钓、淡水、路亚、矶钓、飞钓、筵钓、特殊钩型 | 7 篇 + 规格对照 + 选钩指南 |
| [鱼线](docs/line/started.md) | 鱼线材质分类、核心参数概念、选型速查、品牌参考 | 7 篇 |
| [鱼竿](docs/pole/started.md) | 按使用场景分类的鱼竿总览，涵盖 5 大场景 16 种竿型 | 5 篇 |
| [渔轮](docs/ship/started.md) | 按使用场景分类的渔轮总览，涵盖 5 大场景 18 种轮型 | 5 篇 |
| [鱼漂](docs/float/started.md) | 按形状、材质、结构、用途四维分类的鱼漂指南，涵盖 5 大场景 24 种漂型 | 5 篇 |

钓具类文章均包含：使用场景、价位参考、特点与优缺点、对象鱼种、鱼线鱼竿搭配建议等维度。

## 目录结构

```text
ulnae.github.io/
├── docs/
│   ├── .vitepress/        # VitePress 配置（config.mts）
│   ├── about/             # 关于本站
│   ├── fish/              # 鱼类物种名录（01-10 卷 + 总览）
│   ├── hook/              # 鱼钩（01-07 分场景 + 总览 + 选钩指南）
│   ├── line/              # 鱼线（01-07 分场景 + 总览）
│   ├── pole/              # 鱼竿（01-05 分场景 + 总览）
│   ├── ship/              # 渔轮（01-05 分场景 + 总览）
│   ├── float/             # 鱼漂（01-05 分场景 + 总览）
│   ├── public/            # 静态资源（按板块/文档名分目录存放图片）
│   └── index.md           # 首页
├── LICENSE
└── package.json
```

图片资源约定：`docs/public/<板块>/<文档名>/` 与文章一一对应，如 `docs/fish/05.md` 的图片位于 `docs/public/fish/05/`。

## 快速开始

```bash
# 安装依赖（推荐 pnpm）
pnpm install

# 本地开发
pnpm docs:dev

# 构建生产版本
pnpm docs:build

# 本地预览构建产物
pnpm docs:preview
```

环境要求：Node.js >= 20。

## 部署

推送到 `master` 分支后，由 [GitHub Actions](.github/workflows/deploy.yml) 自动构建并发布至 GitHub Pages。

## 参与贡献

- 发现内容有误或有补充建议？欢迎提 [Issue](https://github.com/ulnae/ulnae.github.io/issues/new)
- 想直接编辑某页内容？点击站点页面底部「在 GitHub 上编辑此页」即可提交 PR

## 联系方式

| 平台 | 链接 |
|------|------|
| GitHub | [@ulnae](https://github.com/ulnae) |
| 掘金 | [@ulnae](https://juejin.cn/user/3650034336020430) |

## 许可

本站内容基于 [MIT License](LICENSE) 发布。

鱼类图片来源于维基百科（Wikimedia Commons），遵循各自原始许可协议；钓具图片部分来源于维基百科，部分为站内整理。如认为有侵权内容，请通过 Issue 联系删除。
