# 项目结构

本站采用 VitePress 的默认项目结构。

## 目录布局

```
ulnae.github.io/
├── docs/                  # 文档根目录
│   ├── .vitepress/        # VitePress 配置
│   │   ├── config.mts     # 站点配置文件
│   │   └── public/        # 静态资源（logo、favicon 等）
│   ├── guide/             # 指南文档
│   ├── about.md           # 关于页面
│   └── index.md           # 首页
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions 部署配置
├── package.json
└── README.md
```

## 配置说明

- `config.mts`：VitePress 核心配置文件，包含站点标题、导航、侧边栏等
- `public/`：存放不需要经过构建处理的静态资源，如 `logo.svg`、`favicon.ico` 等

## 部署

本站通过 GitHub Actions 自动部署到 GitHub Pages，推送到 `main` 分支即可触发。