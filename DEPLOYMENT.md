# GitHub Pages 部署指南

## 问题解决

您的Angular应用在GitHub Pages上出现404错误的问题已经解决，同时修复了本地开发环境的白屏问题。主要修复包括：

### 1. 智能base href配置
- 保持 `src/index.html` 中的 `<base href="/">` 用于本地开发
- 创建了 `src/set-base-href.js` 脚本，自动检测环境并设置正确的base href
- 在GitHub Pages上自动设置为 `/LEAD/`，在本地开发时保持 `/`

### 2. 创建了GitHub Actions工作流
- 文件位置：`.github/workflows/deploy.yml`
- 自动构建和部署到GitHub Pages
- 无需手动设置base href，脚本会自动处理

### 3. 添加了404.html处理
- 处理Angular SPA路由问题
- 自动重定向到主页

### 4. 更新了构建脚本
- 简化了 `build:gh-pages` 脚本
- 智能脚本会自动处理不同环境的base href

## 部署步骤

1. **启用GitHub Pages**：
   - 进入您的GitHub仓库
   - 点击 Settings → Pages
   - Source 选择 "GitHub Actions"

2. **推送代码**：
   ```bash
   git add .
   git commit -m "配置GitHub Pages部署"
   git push origin main
   ```

3. **等待部署**：
   - GitHub Actions会自动运行
   - 部署完成后，您的应用将在 `https://yourusername.github.io/LEAD/` 可用

## 本地测试

### 本地开发环境测试
```bash
npm start
```
访问 `http://localhost:4200` - 应该正常显示，无白屏问题

### GitHub Pages构建测试
```bash
npm run build:gh-pages
```

构建完成后，`dist/lead-app` 目录将包含部署到GitHub Pages的文件。

### 本地预览GitHub Pages构建
```bash
# 安装http-server（如果还没有安装）
npm install -g http-server

# 在dist/lead-app目录中启动服务器
cd dist/lead-app
http-server -p 8080
```

访问 `http://localhost:8080` - 应该正常显示，模拟GitHub Pages环境

## 注意事项

- 确保您的GitHub仓库是公开的
- 如果您的仓库名称不是 "LEAD"，请相应修改base href
- 首次部署可能需要几分钟时间
