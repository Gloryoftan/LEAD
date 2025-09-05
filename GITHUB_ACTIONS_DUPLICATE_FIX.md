# GitHub Actions 重复触发问题解决方案

## 问题描述

每次提交代码时，GitHub Actions 都会触发两次部署，导致：
- 浪费 GitHub Actions 的免费额度
- 部署时间翻倍
- 可能造成部署冲突

## 问题原因

您的仓库中有两个 GitHub Actions 工作流文件：

1. **`.github/workflows/deploy.yml`** - 使用 `peaceiris/actions-gh-pages@v3`
2. **`.github/workflows/pages.yml`** - 使用官方的 `actions/deploy-pages@v4`

两个文件都配置了相同的触发条件：
```yaml
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

因此，每次推送到 `main` 分支时，两个工作流都会同时运行。

## 解决方案

### 已执行的修复

1. **删除了重复的工作流文件**：
   - 删除了 `.github/workflows/deploy.yml`
   - 保留了 `.github/workflows/pages.yml`

### 为什么保留 `pages.yml`

`pages.yml` 使用 GitHub 官方的 Pages 部署方式，具有以下优势：

1. **官方支持**：使用 GitHub 官方维护的 Actions
2. **更好的集成**：与 GitHub Pages 原生集成
3. **环境管理**：支持 GitHub Pages 环境配置
4. **更稳定**：官方维护，更新及时

### 当前工作流配置

保留的 `pages.yml` 配置：

```yaml
name: Deploy Angular App to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build Angular app
        run: npm run build:prod
        
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/lead-app'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 验证修复

### 1. 推送代码测试
```bash
git add .
git commit -m "修复 GitHub Actions 重复触发问题"
git push origin main
```

### 2. 检查 Actions 标签
- 进入 GitHub 仓库的 **Actions** 标签
- 应该只看到一个工作流运行，而不是两个

### 3. 确认部署成功
- 检查部署是否成功完成
- 访问 `https://gloryoftan.github.io/LEAD/` 确认应用正常运行

## 预防措施

### 1. 避免重复工作流
- 在添加新的工作流文件前，检查是否已有类似功能的工作流
- 使用不同的文件名和描述来区分不同用途的工作流

### 2. 使用条件触发
如果需要多个工作流，可以使用条件来避免冲突：
```yaml
on:
  push:
    branches: [ main ]
    paths:
      - 'src/**'  # 只有 src 目录变化时才触发
```

### 3. 使用 concurrency 控制
```yaml
concurrency:
  group: "pages"
  cancel-in-progress: true  # 取消正在运行的相同工作流
```

## 总结

通过删除重复的工作流文件，现在每次提交只会触发一次部署，这将：
- ✅ 节省 GitHub Actions 使用额度
- ✅ 减少部署时间
- ✅ 避免潜在的部署冲突
- ✅ 使用更稳定的官方部署方式

问题已解决！🎉
