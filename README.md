# Pomelo Theme

Pomelo 是一个面向技术博客的 Hexo 主题。它使用深色亚克力质感、青绿色与洋红色点缀，提供首页文章卡片、Gallery、友链、标签云和文章阅读增强功能。

## 本地运行

```bash
npm install
npm run server
```

生产构建与部署：

```bash
npm run build
npm run deploy
```

主题的主要配置文件位于 `themes/pomelo/_config.yml`。

## 首页文章卡片

在主题配置中选择默认卡片样式：

```yaml
post:
  card_style: image # image 或 text
```

文章也可以在 Front Matter 中单独指定：

```yaml
thumbnail: /images/cover.jpg
card_style: text
```

`image` 会展示封面图；`text` 则强调分类、标题、摘要、日期、阅读时间与标签。

## 友链

在 `themes/pomelo/_config.yml` 的 `friends` 中添加站点：

```yaml
friends:
  - name: 柚子小栈
    url: https://www.youziawa.top
    avatar: https://www.youziawa.top/favicon.ico
    description: 记录编程与技术学习的个人笔记。
```

重新生成后，友链会显示在 `/friends/` 页面。

## Gallery

在 `gallery.images` 中配置图片，可为每张图片设置标题、描述、分类和日期。Gallery 页面支持分类筛选、关键词搜索和大图查看。

```yaml
gallery:
  images:
    - src: /images/gallery/example.jpg
      title: 示例图片
      category: 日常
      date: 2026-08-24
```

## 文档

- `source/_posts/pomelo-quick-start.md`：主题快速开始与首页卡片配置。
- `source/_posts/pomelo-pages-and-components.md`：Gallery、友链与侧边栏组件配置。
- `PLAN.md`：主题的视觉与工程规范。
