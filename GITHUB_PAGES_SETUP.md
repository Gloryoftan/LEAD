# GitHub Pages 部署问题解决方案

## 错误原因分析

您遇到的错误 `Permission to Gloryoftan/LEAD.git denied to github-actions[bot]` 是由于以下原因：

### 1. 权限配置问题
- GitHub Actions 缺少必要的权限来推送代码到 `gh-pages` 分支
- `peaceiris/actions-gh-pages@v3` 需要 `contents: write` 权限

### 2. GitHub Pages 设置问题
- 可能没有正确启用 GitHub Pages
- 部署源设置不正确

## 解决方案

### 步骤 1: 检查 GitHub Pages 设置

1. 进入您的 GitHub 仓库：`https://github.com/Gloryoftan/LEAD`
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 确保 **Source** 设置为 **"GitHub Actions"**

### 步骤 2: 检查仓库权限

1. 在 Settings 中，点击 **Actions** → **General**
2. 确保 **Workflow permissions** 设置为：
   - **Read repository contents and packages permissions**
   - **Read and write permissions** (推荐)

### 步骤 3: 推送修复后的代码

我已经修复了以下问题：

1. **添加了权限配置**：
   ```yaml
   permissions:
     contents: read
     pages: write
     id-token: write
   ```

2. **修复了 Angular 配置**：
   - 在生产环境配置中添加了 `baseHref: "/LEAD/"`

现在推送代码：

```bash
git add .
git commit -m "修复 GitHub Pages 部署权限问题"
git push origin main
```

### 步骤 4: 监控部署

1. 推送后，进入 **Actions** 标签
2. 查看最新的工作流运行状态
3. 如果成功，您的应用将在 `https://gloryoftan.github.io/LEAD/` 可用

## 常见问题

### 问题 1: 仍然出现权限错误
**解决方案**：
- 确保仓库是公开的
- 检查 GitHub Pages 是否已启用
- 确认 Actions 权限设置正确

### 问题 2: 应用显示 404 错误
**解决方案**：
- 检查 `baseHref` 设置是否正确
- 确保构建输出目录是 `./dist/lead-app`
- 验证 Angular 路由配置

### 问题 3: 样式或资源加载失败
**解决方案**：
- 检查 `angular.json` 中的 `baseHref` 配置
- 确保所有资源路径使用相对路径
- 验证环境配置文件

## 验证部署

部署成功后，您可以通过以下方式验证：

1. **访问应用**：`https://gloryoftan.github.io/LEAD/`
2. **检查控制台**：确保没有 404 或资源加载错误
3. **测试路由**：确保 Angular 路由正常工作

## 联系支持

如果问题仍然存在，请检查：
- GitHub Actions 日志中的详细错误信息
- 仓库的公开/私有设置
- GitHub Pages 的启用状态
