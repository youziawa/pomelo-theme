---
title: 配置 Gallery、友链与侧边栏组件
date: 2026-08-24 12:32:00
categories:
  - 主题教程
  - 页面组件
tags:
  - Gallery
  - 友链
  - 侧边栏
thumbnail: /images/post-cover.svg
---

除了文章列表，Pomelo 还提供相册、友链、归档、分类和标签页面。它们共享同一套亚克力面板、间距和交互状态，因此配置时更像是在补充内容，而不是重新搭一个页面。

## Gallery 相册

在主题配置的 `gallery.images` 中添加图片。旧配置只写 `src` 和 `caption` 也能正常显示；补充分类、地点和描述后，相册会自动提供筛选、搜索和详情信息。

```yaml
gallery:
  enable: true
  title: 相册
  images:
    - src: /images/gallery/night-terminal.jpg
      title: 深夜终端
      category: 桌面
      date: 2026-08-24
      location: Hangzhou
      description: 编译完成后，屏幕留下的一点安静亮光。
      featured: true
```

点击图片会进入预览。可以使用左右方向键、滑动手势、<kbd>Esc</kbd> 或关闭按钮浏览和退出；详情面板还能打开原图或复制图片链接。

## 友链卡片

友链按数组顺序展示，适合把长期关注的站点整理成一面简洁的卡片墙：

```yaml
friends:
  - name: 柚子小栈
    url: https://www.youziawa.top
    avatar: https://www.youziawa.top/favicon.ico
    description: 记录编程与技术学习的个人笔记。
```

头像和说明不宜过长。卡片的重点是名称、识别图和一句准确的描述，链接会在新标签页打开。保存配置并重新生成站点后，就能在 `/friends/` 页面看到新增的卡片。

## 调整侧边栏

侧边栏组件通过 `sidebar.widgets` 排序。推荐从最有信息价值的组件开始：

```yaml
sidebar:
  position: right
  widgets:
    - github-status
    - recent-posts
    - tag-cloud
    - category-list
```

在窄屏下，侧边栏会自动排到内容下方，不会挤压文章和相册网格。页面保持一列时，图片卡片也会随可用宽度调整展示面积。
