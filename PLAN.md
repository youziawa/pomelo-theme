# Pomelo Theme — Hexo 主题项目规划书

## 一、项目概述

**项目名称**: Pomelo (柚子)  
**类型**: Hexo 博客主题  
**定位**: 面向程序员的技术博客，融合科技感、赛博朋克与二次元视觉风格  
**核心理念**: 高自定义度、视觉冲击力强、开发者友好

---

## 二、设计美学原则

本主题遵循以下设计原则，确保视觉系统的一致性、可用性与美感：

### 2.1 核心设计原则

| 原则 | 说明 | 实践 |
|------|------|------|
| **层次感** | 通过深度、模糊和透明度构建清晰的空间层级 | 亚克力材质 + Z 轴深度系统 |
| **一致性** | 统一的视觉语言贯穿全站 | 全局 Design Token、复用 mixin |
| **对比度** | 保证内容可读性，WCAG AA 标准 | 文字/背景对比度 ≥ 4.5:1 |
| **克制** | 赛博朋克元素作为调味而非主菜 | 霓虹色占比 ≤ 10% 面积 |
| **留白** | 呼吸感 > 信息密度 | 宽松的行高、卡片间距、页边距 |
| **反馈** | 每一次交互都有明确视觉响应 | hover/press 过渡动画 |

### 2.2 色彩体系

```
┌─────────────────────────────────────────────────────────────┐
│  背景层 (Background)                                        │
│  ┌── 深色基底:  #08080F (主背景)                            │
│  └── 渐变点缀:  radial-gradient 暗青/暗紫微光                 │
├─────────────────────────────────────────────────────────────┤
│  功能色 (Functional)                                        │
│  ┌── 主色:  #00FFC8  霓虹青  ─ 链接、强调、主按钮           │
│  ├── 辅色:  #FF0088  品红    ─ 装饰点缀、标签、hover 状态     │
│  ├── 强调:  #FFD700  金色    ─ 重要提示、高亮标记            │
│  ├── 终端:  #00FF41  终端绿  ─ 代码块、命令行                │
│  ├── 警告:  #FF6B35  暖橙    ─ 警告提示、error               │
│  └── 信息:  #5BC0EB  天蓝    ─ info 提示                    │
├─────────────────────────────────────────────────────────────┤
│  亚克力层 (Acrylic Tints)                                   │
│  ┌── 默认:   rgba(18,18,30,0.65)  微暖深色半透明             │
│  ├── 青色:   rgba(0,255,200,0.06) 霓虹青染色                 │
│  ├── 品红:   rgba(255,0,136,0.06) 品红染色                   │
│  └── 纯黑:   rgba(8,8,15,0.80)   高不透明磨砂               │
├─────────────────────────────────────────────────────────────┤
│  文字色 (Text)                                              │
│  ┌── 正文:    #D8D8E0  主文字                                │
│  ├── 次级:    #9A9AB0  辅助文字、meta 信息                    │
│  ├── 禁用:    #5A5A6E  占位符、禁用态                        │
│  └── 背景上:  #0A0A0F  浅色/亚克力表面上的暗色文字            │
└─────────────────────────────────────────────────────────────┘
```

### 2.3 亚克力材质系统 (Acrylic Material System)

亚克力（毛玻璃/磨砂玻璃）是本主题的核心材质语言，用于构建空间层次感。参考 Microsoft Fluent Design 亚克力体系并适配赛博朋克风格。

#### 深度层级 (Z-Depth Layers)

```
  Z-40  ▓▓▓▓  模态层 (Modal/Lightbox)
        blur(48px) + rgba(8,8,15,0.88) + 边框 rgba(255,255,255,0.12)

  Z-30  ▓▓▓▓  抽屉层 (Drawer)
        blur(36px) + rgba(18,18,30,0.82) + 边框 rgba(255,255,255,0.10)

  Z-20  ▓▓▓▓  悬浮层 (Header/Sidebar)
        blur(28px) + rgba(18,18,30,0.70) + 边框 rgba(255,255,255,0.08)

  Z-10  ▓▓▓▓  卡片层 (Card/Panel)
        blur(20px) + rgba(18,18,30,0.55) + 边框 rgba(255,255,255,0.06)

  Z-0   ░░░░  背景层 (Background)
        纯色 #08080F + 微径向渐变 + 可选粒子/网格线
```

#### 亚克力实现规范

```css
/* 核心 Mixin 示例 */
.pt-glass--card {
  background: rgba(18, 18, 30, 0.55);
  backdrop-filter: blur(20px) saturate(130%);
  -webkit-backdrop-filter: blur(20px) saturate(130%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  /* 上边缘微亮高光 —— 模拟玻璃厚度 */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 4px 24px rgba(0, 0, 0, 0.3);
}

.pt-glass--header {
  background: rgba(18, 18, 30, 0.70);
  backdrop-filter: blur(28px) saturate(150%);
  -webkit-backdrop-filter: blur(28px) saturate(150%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 1px 32px rgba(0, 0, 0, 0.4);
}
```

#### 亚克力染色 (Tinting)

在亚克力表面叠加极低透明度的霓虹色，营造环境光透过玻璃的视觉效果：

- **悬停卡片**: 叠加 `rgba(0,255,200,0.04)` 青色微染
- **hover 按钮**: 叠加 `rgba(255,0,136,0.06)` 品红微染
- **代码区**: 叠加 `rgba(0,255,65,0.03)` 终端绿微染

#### 噪声纹理 (Noise Texture)

为亚克力材质添加微弱的噪点纹理，增加真实感和质感，同时也减少 CSS `backdrop-filter` 纯色渐变可能出现的色带问题：

```css
/* SVG 噪声滤镜 —— 全局定义一次，各处引用 */
.pt-glass--textured {
  position: relative;
}
.pt-glass--textured::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,..."); /* 内联 SVG 噪声 */
  pointer-events: none;
}
```

#### 边框高光 (Edge Highlight)

亚克力材质的边框不是单一的，而是顶部更亮、底部更暗，模拟真实玻璃的厚度感与光源反射：

```css
.pt-glass--elevated {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
```

### 2.4 字体与排版

```
字号阶梯 (Type Scale, 1.25 ratio):

  Size    | 用途                     | 字重
  ────────┼──────────────────────────┼──────
  2.5rem  │ 页面大标题 (Hero)        │ 700
  1.75rem │ 文章标题 / 区块标题      │ 600
  1.25rem │ 小标题 / 卡片标题        │ 600
  1rem    │ 正文 (基准 16px)         │ 400
  0.875rem│ 辅助文字 / meta 信息     │ 400
  0.75rem │ 标签 / 脚注 / 时间戳     │ 500
```

**字体栈**:
- **正文**: `"PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Hiragino Sans GB", sans-serif`
- **代码**: `"JetBrains Mono", "Fira Code", "Cascadia Code", "Consolas", monospace`（启用连字 `font-feature-settings: "liga"`）
- **标题**: 与正文同栈（用户可自行替换为二次元风格字体，如 ZCOOL KuaiLe 或自定义 web font）

**排版规范**:
- 正文字号 16px，行高 1.8（中文阅读舒适区）
- 段落间距 1em，首行不缩进
- 最大阅读宽度 720px（`max-width: 72ch`）
- 代码块字号 14px，行高 1.6

### 2.5 间距系统 (Spacing Scale)

基于 4px 网格的间距体系，保证视觉节奏一致：

```
Token   | px  | 用途
────────┼────┼──────────
xs      │  4 │ 图标与文字之间
sm      │  8 │ 紧密关联元素
md      │ 16 │ 卡片内边距、列表间距
lg      │ 24 │ 内容区块间距
xl      │ 32 │ 页面大区块间距
2xl     │ 48 │ 页面头部/底部留白
3xl     │ 64 │ Hero 区域留白
```

### 2.6 圆角系统 (Border Radius)

亚克力风格需要柔和的圆角来强化玻璃质感：

```
Token   | px  | 应用
────────┼────┼──────────
sm      │  4 │ 标签、徽章、代码块内联元素
md      │  8 │ 按钮、输入框、小卡片
lg      │ 12 │ 卡片、面板
xl      │ 16 │ 大面板、模态框
full    │ 50%│ 头像、圆形按钮
```

### 2.7 视觉元素汇总

| 元素 | 实现方式 | 设计意图 |
|------|----------|----------|
| 亚克力卡片 | `backdrop-filter: blur()` + 半透明背景 + 边框 | 核心材质，构建层次 |
| 噪声纹理 | SVG/CSS 内联纹理叠加 | 增加质感，减少色带 |
| 霓虹发光 | `box-shadow` 多层叠加（0 0 10px + 0 0 40px） | 赛博朋克点缀 |
| 网格线背景 | CSS `repeating-linear-gradient` 叠加 | CRT/终端美学 |
| 扫描线 | `repeating-linear-gradient` 半透明条纹 | CRT 怀旧效果 |
| 粒子系统 | Canvas 动态粒子连线 | 科技感动态背景 |
| 边框高光 | 非对称边框颜色（上亮下暗） | 模拟玻璃厚度 |
| 代码终端 | macOS 三色圆点 + 深色终端背景 + 亚克力 | 开发者身份标识 |
| 霓虹滚动条 | `::-webkit-scrollbar` 细条 + 霓虹色 | 细节沉浸 |
| 二次元装饰 | SVG 装饰线、分割符、光标图案 | 二次元趣味 |
| 渐变文字 | `background-clip: text` + 霓虹渐变 | 视觉焦点 |

---

## 三、技术架构

### 3.1 技术选型

| 层 | 技术 | 说明 |
|----|------|------|
| 模板引擎 | EJS | Hexo 原生支持，灵活且性能好 |
| 样式预处理 | Stylus | Hexo 原生支持，简洁的 CSS 预处理器 |
| 脚本 | Vanilla JS / 少量 Alpine.js | 保持轻量，避免框架依赖 |
| 构建工具 | Hexo 原生 | 零配置，开箱即用 |
| 图标 | 自定义 SVG + Heroicons | 统一风格且体积可控 |
| 代码高亮 | highlight.js（霓虹主题） | 或使用 Hexo 内置的 prismjs |

### 3.2 依赖原则

- **零外部运行时依赖**（不使用 jQuery、Bootstrap 等）
- 所有资源内联或最小化 CDN 引用
- 图片懒加载使用原生 `loading="lazy"`
- 响应式布局使用 CSS Grid + Flexbox

---

## 四、目录结构

```
pomelo-theme/
├── _config.yml                 # 主题默认配置
├── languages/                  # 国际化
│   ├── zh-CN.yml
│   ├── en.yml
│   └── ja.yml                  # 日语（二次元加成）
├── layout/                     # EJS 模板
│   ├── layout.ejs              # 基础布局
│   ├── index.ejs               # 首页
│   ├── post.ejs                # 文章详情
│   ├── page.ejs                # 自定义页面
│   ├── archive.ejs             # 归档页
│   ├── category.ejs            # 分类页
│   ├── tag.ejs                 # 标签页
│   ├── friends.ejs             # 友链页
│   ├── about.ejs               # 关于页
│   ├── gallery.ejs             # 相册页
│   └── _partial/               # 局部模板
│       ├── head.ejs
│       ├── header.ejs
│       ├── footer.ejs
│       ├── sidebar.ejs
│       ├── post-card.ejs
│       ├── pagination.ejs
│       └── widgets/            # 小工具组件
│           ├── github-status.ejs
│           ├── recent-posts.ejs
│           ├── tag-cloud.ejs
│           ├── category-list.ejs
│           ├── toc.ejs
│           └── friend-link.ejs
├── source/                     # 静态资源
│   ├── css/
│   │   ├── style.styl          # 主样式入口
│   │   ├── _variables.styl     # 设计令牌 (Design Tokens)
│   │   ├── _mixins.styl        # 混入/函数
│   │   ├── _acrylic.styl       # 亚克力材质系统
│   │   ├── _reset.styl         # 重置样式
│   │   ├── _typography.styl    # 排版系统
│   │   ├── _layout.styl        # 布局
│   │   ├── _header.styl
│   │   ├── _footer.styl
│   │   ├── _sidebar.styl
│   │   ├── _post.styl          # 文章样式
│   │   ├── _code.styl          # 代码高亮
│   │   ├── _archive.styl
│   │   ├── _tag.styl
│   │   ├── _category.styl
│   │   ├── _friends.styl
│   │   ├── _about.styl
│   │   ├── _gallery.styl
│   │   ├── _widgets.styl       # 小工具样式
│   │   ├── _animations.styl    # 动画
│   │   ├── _dark-mode.styl     # 深色模式（默认）
│   │   └── _responsive.styl    # 响应式
│   ├── js/
│   │   ├── main.js             # 主脚本
│   │   ├── theme.js            # 主题切换/配置
│   │   ├── github-status.js    # GitHub 状态获取
│   │   ├── gallery.js          # 相册灯箱
│   │   ├── search.js           # 本地搜索
│   │   └── particles.js        # 粒子效果
│   ├── images/                 # 主题内置图片
│   │   ├── logo.svg
│   │   ├── avatar-default.svg
│   │   └── decoration/         # 二次元装饰元素
│   └── fonts/                  # 可选字体文件
└── scripts/                    # Hexo 辅助脚本
    ├── helpers.js              # 模板辅助函数
    └── generators.js           # 页面生成器
```

---

## 五、页面模板清单

### 5.1 必需页面

| 页面 | 路由 | 模板 | 说明 |
|------|------|------|------|
| 首页 | `/` | `index.ejs` | 文章列表 + 侧边栏小工具 |
| 文章详情 | `/:title/` | `post.ejs` | 文章内容 + TOC + 评论区 |
| 归档 | `/archives/` | `archive.ejs` | 按时间轴展示全部文章 |
| 分类 | `/categories/` | `category.ejs` | 分类云 + 分类下文章列表 |
| 标签 | `/tags/` | `tag.ejs` | 标签云 + 标签下文章列表 |
| 友链 | `/friends/` | `friends.ejs` | 友链卡片墙 |
| 关于 | `/about/` | `about.ejs` | 个人介绍 + 技能 + GitHub |

### 5.2 可选页面

| 页面 | 路由 | 模板 | 说明 |
|------|------|------|------|
| 相册 | `/gallery/` | `gallery.ejs` | 图片墙 + 灯箱预览 |
| 搜索 | `/search/` | `search.ejs` | 本地搜索页面 |
| 404 | — | `404.ejs` | 自定义 404 页面 |

---

## 六、功能模块

### 6.1 全局功能

- [ ] **深色/浅色模式切换**（默认深色，自动/手动）
- [ ] **亚克力材质全局开关**（一键退化到纯色模式）
- [ ] **亚克力透明度/模糊度调节**
- [ ] **霓虹光标跟随效果**（可开关）
- [ ] **粒子背景 + 网格线**（Canvas 实现，可分别开关）
- [ ] **扫描线叠加层**（CRT 效果，可开关，可调透明度）
- [ ] **背景噪声纹理**（可开关）
- [ ] **回到顶部按钮**（霓虹亚克力风格）
- [ ] **阅读进度条**（页面顶部霓虹线）
- [ ] **响应式布局**（桌面/平板/手机，移动端亚克力降级）
- [ ] **PJAX 无刷新加载**（可选开启，注意 backdrop-filter 兼容）
- [ ] **RSS 订阅**

### 6.2 文章相关

- [ ] 文章卡片（带封面图、标签、日期、阅读时长）
- [ ] 文章目录（TOC，侧边栏固定或抽屉式）
- [ ] 代码块（终端风格 + 行号 + 一键复制 + 语言标识）
- [ ] 版权声明（文章底部）
- [ ] 文章标签/分类展示
- [ ] 上一篇/下一篇导航
- [ ] 相关文章推荐
- [ ] 评论系统集成（Gitalk / Waline / Twikoo 多选）

### 6.3 小工具模块

#### GitHub 状态
- 调用 GitHub API 获取用户信息
- 展示：头像、昵称、bio、仓库数、followers、star 数
- 可选展示 Contribution 热力图
- 可选展示 Pinned 仓库卡片

#### 相册
- 支持本地图片或远程 URL
- 瀑布流 / 网格布局
- 灯箱预览（支持左右切换）
- 可配置是否启用

#### 友链
- 卡片式布局（头像 + 昵称 + 描述）
- 支持分组展示
- 随机排序 / 自定义排序

#### 其他小工具
- [ ] 最新文章
- [ ] 标签云（3D 旋转可选）
- [ ] 分类列表
- [ ] 站点运行时间
- [ ] 一言 / 随机动漫台词
- [ ] 音乐播放器（Aplayer 集成，可选）

### 6.4 二次元特色功能

- [ ] 看板娘（Live2D 可选集成，默认关闭）
- [ ] 随机动漫背景图（可配置图源）
- [ ] 打字机效果（首页标语）
- [ ] 樱花/雪花飘落效果（Canvas，可开关）
- [ ] 文章底部 "owo" 表情反应（可选）

---

## 七、主题自定义系统

### 7.1 配置文件 `_config.yml` 结构

```yaml
# ── 基础信息 ──
avatar: /images/avatar.png
favicon: /images/favicon.ico
logo: /images/logo.svg
site_title_typing: true          # 首页标题打字机效果

# ── 色彩主题 ──
theme_color:
  primary: "#00FFC8"              # 霓虹青 — 主色调
  accent: "#FF0088"               # 品红 — 辅助色
  highlight: "#FFD700"            # 金色 — 强调
  terminal_green: "#00FF41"       # 终端绿 — 代码
  background: "#08080F"           # 深色基底
  text: "#D8D8E0"                # 正文
  text_secondary: "#9A9AB0"      # 次级文字
  acrylic_tint: "cyber"           # 亚克力染色方向: cyber / magenta / neutral

# ── 亚克力材质 ──
acrylic:
  card_blur: 20                   # 卡片模糊度 (px)
  header_blur: 28                 # 头部模糊度 (px)
  modal_blur: 48                  # 模态框模糊度 (px)
  card_opacity: 0.55              # 卡片背景透明度
  header_opacity: 0.70            # 头部背景透明度
  saturation: 130                 # backdrop 饱和度 (%)
  noise_texture: true             # 噪声纹理叠加
  edge_highlight: true            # 边框高光（上亮下暗）

# ── 视觉效果 ──
effects:
  particles: true                 # 粒子背景
  grid_lines: true                # 网格线背景
  scanline: true                  # 扫描线
  neon_cursor: true               # 霓虹光标跟随
  neon_glow: true                 # 霓虹发光效果
  typing_effect: true             # 打字机效果
  glassmorphism: true             # 全局亚克力效果（关闭则退化为纯色卡片）
  sakura_fall: false              # 樱花飘落（季节性）
  noise_bg: true                  # 背景噪点纹理

# ── 导航 ──
menu:
  Home: /
  Archives: /archives/
  Categories: /categories/
  Tags: /tags/
  Friends: /friends/
  Gallery: /gallery/
  About: /about/
  Search: /search/

# ── 侧边栏 ──
sidebar:
  position: right                 # left / right
  widgets:
    - github-status
    - recent-posts
    - tag-cloud
    - category-list

# ── GitHub 状态 ──
github:
  username: your_github_username
  show_pinned: true
  show_heatmap: true
  cache_time: 3600                # 缓存时间（秒）

# ── 相册 ──
gallery:
  enable: true
  title: 相册
  layout: masonry                 # masonry / grid / justified
  images:
    - src: /images/gallery/01.jpg
      caption: 示例图片1
    - src: https://example.com/img.jpg
      caption: 远程图片

# ── 友链 ──
friends:
  - name: 示例博客
    url: https://example.com
    avatar: https://example.com/avatar.png
    description: 一个很棒的博客
  # 或从友情链接页面自动生成
  auto_from_posts: true

# ── 评论系统 ──
comments:
  enable: true
  type: waline                     # gitalk / waline / twikoo / disqus
  # ... 各平台独立配置

# ── 代码高亮 ──
code_highlight:
  theme: neon                     # neon / dracula / monokai
  line_number: true
  copy_button: true
  lang_label: true
  mac_style: true                 # 终端三色圆点

# ── 文章设置 ──
post:
  toc: true
  copyright: true
  related_posts: true
  reading_time: true
  word_count: true

# ── 二次元模块 ──
anime:
  live2d: false                    # 看板娘（默认关闭）
  live2d_model: /live2d/hijiki    # 模型路径
  random_bg: false                # 随机动漫背景
  bg_source: local                 # local / api
  hitokoto: true                  # 一言
  ow_emoji: false                 # owo 表情反应

# ── 页脚 ──
footer:
  since: 2024
  icp: ""                          # 备案号
  powered_by: true
  theme_name: true
  runtime: true                    # 站点运行时间

# ── CDN / 性能 ──
cdn:
  enable: false
  base_url: ""
  
pjax:
  enable: false

# ── 自定义 CSS/JS ──
custom:
  css: ""
  js: ""
  head: ""                         # 自定义 <head> 内容
```

### 7.2 自定义方式

1. **配置文件**: 修改 `_config.pomelo.yml` 即可改变 90% 的视觉与功能
2. **自定义 CSS**: 配置中注入自定义样式
3. **自定义 JS**: 配置中注入自定义脚本
4. **模板覆盖**: 用户可在博客根目录 `layout/` 下覆盖任意主题模板
5. **语言文件**: 完整的中/英/日三语支持，可自行扩展

---

## 八、开发路线图

### Phase 1: 骨架搭建（基础可用）
- [ ] 初始化 Hexo 主题项目结构
- [ ] Stylus 设计令牌（变量、mixin、Z-index 尺度、间距尺度、圆角尺度）
- [ ] 亚克力材质基础 mixin（blur + opacity + 边框高光 + 噪声纹理）
- [ ] CSS 重置 + 基础排版（字体、字号阶梯、行高、颜色）
- [ ] 基础 EJS 布局（layout / head / header / footer）
- [ ] 首页文章列表（亚克力卡片）
- [ ] 文章详情页
- [ ] 暗色主题 + 霓虹配色 + 亚克力卡片
- [ ] 响应式布局（移动端亚克力降级方案）

### Phase 2: 核心页面
- [ ] 归档页（时间轴 + 亚克力年份组）
- [ ] 分类页（分类云 + 亚克力面板）
- [ ] 标签页（标签云 + 磨砂标签）
- [ ] 友链页（亚克力卡片墙，hover 浮起 + 霓虹边框）
- [ ] 关于页（个人信息 + GitHub 状态 + 技能进度条）
- [ ] 404 页面（趣味动画 + 霓虹装饰）
- [ ] 分页组件

### Phase 3: 视觉效果
- [ ] 亚克力材质完整实现（多层 blur + 染色 + 噪声 + 边框高光）
- [ ] 霓虹发光效果（文字 + 边框多层 box-shadow）
- [ ] 粒子背景 + 网格线 Canvas 系统
- [ ] CRT 扫描线叠加层（CSS 实现）
- [ ] 代码块终端风格（macOS 圆点 + 亚克力终端背景）
- [ ] 动画系统（过渡、hover 浮起、页面入场、骨架屏加载）
- [ ] 打字机效果（首页标题）
- [ ] 光标霓虹跟随（可选的交互增强）

### Phase 4: 功能模块
- [ ] GitHub 状态小工具
- [ ] 相册 + 亚克力灯箱
- [ ] 评论系统集成
- [ ] 本地搜索（亚克力搜索面板）
- [ ] 文章目录（TOC，磨砂侧边栏）
- [ ] 代码复制按钮
- [ ] 阅读进度条

### Phase 5: 进阶功能
- [ ] 深色/浅色模式切换（含亚克力参数联动）
- [ ] 看板娘集成
- [ ] Aplayer 音乐播放器（亚克力播放栏）
- [ ] PJAX 无刷新加载
- [ ] 随机动漫背景
- [ ] 樱花/雪花飘落

### Phase 6: 完善与发布
- [ ] 三语国际化
- [ ] 主题文档编写（含设计令牌说明）
- [ ] 配置校验脚本
- [ ] 性能优化（backdrop-filter GPU 加速、will-change 策略）
- [ ] 低性能设备亚克力自动降级
- [ ] npm 发布
- [ ] 示例站点

---

## 九、命名约定

- **CSS 类名**: BEM 风格，前缀 `pt-`（pomelo-theme）
  - 例: `pt-header`, `pt-post__title`, `pt-card--featured`
- **EJS 变量**: 使用 Hexo / 主题配置变量，命名清晰
- **JS 函数**: camelCase，避免全局污染，统一挂在 `window.PT` 命名空间下
- **Stylus 变量**: 定义在 `_variables.styl`，以 `pt-` 或语义化前缀命名

---

## 十、兼容性目标

- **浏览器**: Chrome 90+, Firefox 90+, Safari 15+, Edge 90+
- **Node.js**: 14+
- **Hexo**: 6.0+

---

> 下一步: 确认规划后，开始 Phase 1 骨架搭建 —— 初始化项目结构并完成基础布局模板。
