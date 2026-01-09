# Gitee 部署指南

本指南将帮助您将 Excel 转图片工具部署到 Gitee Pages，这样您就可以在 iOS 设备上通过 PWA 应用使用它。

## 步骤 1：在 Gitee 上创建仓库

1. 访问 [Gitee](https://gitee.com/) 并登录您的账号
2. 点击右上角的 **"+"** 按钮 → **"新建仓库"**
3. 填写仓库信息：
   - **仓库名称**：建议使用 `excel-to-image` 或类似名称
   - **路径**：会自动生成，保持默认即可
   - **仓库介绍**：可填写 "Excel 转高清图片工具，支持 iOS 端文件分享"
   - **是否开源**：选择 **"公开"**
   - **初始化仓库**：**不要** 勾选 "使用 README.md 初始化仓库"
4. 点击 **"创建仓库"** 按钮

## 步骤 2：推送本地仓库到 Gitee

1. 在新创建的 Gitee 仓库页面，复制仓库的 HTTPS 或 SSH 地址
   - 例如：`https://gitee.com/yourusername/excel-to-image.git`

2. 在本地项目目录中执行以下命令：

   ```bash
   # 添加 Gitee 远程仓库
   git remote add origin https://gitee.com/yanyanhenxian/excel-to-image-conversion
   
   # 推送代码到 Gitee
   git push -u origin main
   ```

   注意：如果 Gitee 默认分支是 `master` 而不是 `main`，请使用：
   ```bash
   git push -u origin main:master
   ```

## 步骤 3：启用 Gitee Pages

1. 在 Gitee 仓库页面，点击 **"服务"** → **"Gitee Pages"**

2. 配置部署设置：
   - **部署分支**：选择 `main` 或 `master`（根据您实际的分支名称）
   - **部署目录**：保持为空（使用根目录）
   - **HTTPS**：勾选启用（推荐）

3. 点击 **"启动"** 按钮

4. 等待部署完成，Gitee 会生成一个访问地址
   - 例如：`https://yourusername.gitee.io/excel-to-image`

## 步骤 4：验证部署

1. 打开生成的 Gitee Pages 地址，确认网站可以正常访问
2. 测试上传 Excel 文件并转换为图片的功能
3. 在 iOS Safari 中打开该地址，测试 PWA 功能

## 步骤 5：在 iOS 上添加到主屏幕

1. 在 iOS Safari 中打开部署好的 Gitee Pages 网站
2. 点击分享按钮（底部中间的正方形带箭头图标）
3. 选择 **"添加到主屏幕"**
4. 确认添加，在主屏幕上找到 **"Excel转图片"** 应用

## 步骤 6：使用方法

### 从其他应用分享 Excel 文件

1. 在 iOS 设备上打开包含 Excel 文件的应用（如 "文件" 应用、邮件等）
2. 找到要转换的 Excel 文件
3. 点击分享按钮 → 选择 **"Excel转图片"** 应用
4. 等待自动转换完成
5. 点击 **"下载 PNG 图片"** 保存到相册

### 直接在应用中选择文件

1. 在主屏幕上打开 **"Excel转图片"** 应用
2. 点击 **"选择文件"** 按钮
3. 浏览并选择 Excel 文件
4. 等待转换完成
5. 点击 **"下载 PNG 图片"** 保存

## 常见问题

### 1. Gitee Pages 部署失败

- **检查分支名称**：确保选择了正确的分支（main 或 master）
- **检查文件结构**：确保根目录有 index.html 文件
- **检查仓库权限**：确保仓库是公开的

### 2. iOS 无法添加到主屏幕

- **使用 Safari**：必须使用 Safari 浏览器，其他浏览器（如 Chrome）不支持此功能
- **HTTPS 访问**：确保使用 HTTPS 地址访问
- **PWA 配置**：确保 manifest.json 和 sw.js 文件配置正确

### 3. 转换失败

- **文件大小**：大型 Excel 文件可能转换时间较长，请耐心等待
- **网络连接**：首次使用需要网络连接下载依赖库
- **浏览器兼容性**：建议使用 Safari 浏览器获得最佳体验

## 部署成功后

部署成功后，您可以：

- 分享 Gitee Pages 链接给朋友使用
- 在 iOS 设备上通过 PWA 应用一键转换 Excel 文件
- 享受完全免费的 Excel 转图片服务

如果您在部署过程中遇到任何问题，请参考 Gitee 的官方文档或联系 Gitee 客服获取帮助。