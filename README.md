# Useless Code Show

> 无用代码展览馆 — 收集互联网上最没用的代码作品

## 项目结构

```
├── src/                    # 主站框架（Vite + React + Tailwind）
│   ├── pages/Gallery.tsx   # 画廊主页
│   ├── pages/ProjectPage.tsx # 子项目展示页
│   └── data/projects.json  # 项目列表配置
├── projects/               # 所有子项目
│   ├── bouncing-balls/     # 弹跳球
│   ├── matrix-rain/        # 矩阵代码雨
│   └── useless-button/     # 无用按钮
└── .github/workflows/      # GitHub Actions 部署
```

## 添加新项目

1. 在 `projects/` 下新建文件夹，放入 `index.html`
2. 在 `src/data/projects.json` 中添加项目信息
3. 提交代码，自动部署到 GitHub Pages

## 开发

```bash
pnpm install
pnpm dev
```
