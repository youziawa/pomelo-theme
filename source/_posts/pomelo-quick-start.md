---
title: Pomelo 主题快速开始
date: 2026-08-24 12:30:00
categories:
  - 主题教程
  - 快速开始
tags:
  - Hexo
  - 配置
  - 入门
thumbnail: /images/logo.svg
---

Pomelo 是一个以深色亚克力和克制霓虹为主调的 Hexo 主题。这篇文章从最短路径开始，带你确认站点、主题和本地预览都已经就绪。

> 建议先保留默认配置跑通一次，再逐项替换成自己的内容。主题的视觉效果来自一套统一 token，过早覆盖 CSS 往往会让层级感消失。

## 启动本地站点

在项目根目录运行下面的命令：

```bash
npm install
npm run server
```

浏览器打开终端显示的本地地址。修改文章或主题文件后，Hexo 会自动重建页面；遇到资源缓存时，可以手动执行一次完整生成：

```bash
npm run build
```

## 最小配置清单

站点级信息在根目录的 `_config.yml`，主题的观感和组件配置在 `themes/pomelo/_config.yml`。先从下面几项开始替换：

| 配置位置 | 用途 | 建议 |
| --- | --- | --- |
| `title` | 浏览器标题与站点名 | 使用简短、易记的名称 |
| `author` | 文章版权署名 | 填写作者或团队名称 |
| `github.username` | 侧边栏 GitHub 状态 | 填 GitHub 用户名 |
| `menu` | 顶部导航 | 保留常用页面，避免过长 |

```yaml
# themes/pomelo/_config.yml
github:
  username: your_github_username

menu:
  Home: /
  Archives: /archives/
  Gallery: /gallery/
```

## 创建第一篇文章

新建 Markdown 文件，或使用 Hexo 命令：

```bash
npx hexo new "my-first-post"
```

文章开头的 Front Matter 用来控制标题、时间、分类、标签和卡片封面。`thumbnail` 或 `banner` 存在时，首页文章卡片会显示封面区域。

```yaml
---
title: 我的第一篇文章
categories:
  - 随笔
tags:
  - 生活
thumbnail: /images/cover.jpg
---
```

按下 <kbd>Ctrl</kbd> + <kbd>C</kbd> 结束本地服务，准备发布时再运行部署命令即可。下一篇会专门展示文章内容的排版效果。
