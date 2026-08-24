---
title: 用设计 Token 定制 Pomelo 的视觉风格
date: 2026-08-24 12:33:00
categories:
  - 主题教程
  - 个性化
tags:
  - CSS
  - Stylus
  - Design Token
thumbnail: /images/avatar-default.svg
card_style: text
---

Pomelo 的颜色、间距、圆角、层级和动效都集中在设计 Token 中。定制时优先调整 token，再针对单个组件补充规则，这样不会破坏全站的一致性。

## 颜色与材质

基础颜色在 `themes/pomelo/source/css/_variables.styl`。主色用于链接、焦点和少量强调，品红更适合 hover 点缀，而不是大面积背景。

```stylus
$clr-primary = #00FFC8
$clr-accent = #FF0088
$clr-bg = #08080F
$clr-text = #D8D8E0
```

亚克力卡片并不是单纯的半透明背景，它还包含模糊、边框高光和阴影。保持这些层次，主题才能在深色背景中显得干净，而不是浑成一片。

## 间距与圆角

主题以 4px 网格组织间距：`$space-sm` 是 8px，`$space-md` 是 16px，`$space-lg` 是 24px。卡片通常使用 `$radius-lg`，也就是 12px。

```stylus
.pt-example-panel
  padding: $space-lg
  border-radius: $radius-lg
  background: rgba(22, 22, 35, 0.8)
```

## 自定义 CSS 的边界

小范围调整可以通过主题配置的 `custom.css` 注入；当样式需要复用时，再放到对应的 Stylus 模块中。不要用过强的选择器覆盖组件，也不要把霓虹色铺满整个界面。

> 一个很好用的判断标准是：关闭特效后，页面的内容层级依然清楚吗？如果答案是否定的，应该先调整排版和对比度，而不是继续增加发光。

## 发布前验证

1. 在桌面和手机宽度下查看标题是否换行自然。
2. 检查文本、边框和背景之间的对比度。
3. 运行 `npm run build`，确认 Stylus 和模板都能正常生成。
4. 最后再部署到 GitHub Pages。

这套顺序看起来朴素，却能避免大多数主题定制时的意外样式回归。
