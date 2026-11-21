# AhaStation 设计系统

本仓库是 **AhaStation 设计系统**，只维护视觉规范与组件库站点。可点击的产品原型（桌面工作区、掌机附屏）在独立的原型仓库里，不和本仓库混在一起：[AhaStation-prototype](https://github.com/Leonardolee351-LMX/AhaStation-prototype)。本仓库地址：[AhaStation-design-system](https://github.com/Leonardolee351-LMX/AhaStation-design-system)。

可视化、可点击的组件库站点。用于维护颜色、字体、间距、圆角、光效与整套界面组件。本目录是独立静态站点，不依赖打包工具。

## 如何打开

在本目录启动一个本地静态服务（推荐）：

```bash
python -m http.server 5174
```

或在已安装 Node 的机器上：

```bash
npx --yes serve -l 5174
```

然后在浏览器打开 [http://localhost:5174/](http://localhost:5174/)。

也可以直接用浏览器打开 `index.html`（`file://`）。相对路径可以工作；Google Fonts 需要联网。若字体未载入，系统会回退到苹方、雅黑或 system-ui。

## 如何改 token

所有颜色与字体都写在 `css/tokens.css`。不要在组件或文档样式里再写死色值或字体名。

文件分三层：

1. **原始值（Primitive）**  
   蓝色阶（中段 `#2563EB`）、中性色、警告橙、危险红、成功绿、图表专用色，以及午夜 / 天蓝 / 水蓝 / 白光谱停点。
2. **语义值（Semantic）**  
   组件实际使用的名字，例如 `--aha-canvas`、`--aha-ink`、`--aha-color-primary`、间距、圆角、阴影、字体角色。改语义映射即可让整库一起变。
3. **组件映射**  
   只在确实需要特例时使用，例如 `--aha-button-height-md`、`--aha-card-padding`。

保存 `tokens.css` 后刷新页面即可看到变化。本站没有可视化 token 编辑器，对照在页面上，修改在代码里。

变量一律使用 `--aha-` 前缀。文档文案是中文，token 名是英文。

## 结构

```
index.html                 概述（光场英雄区与组件一览）
foundations/               基础：颜色、字体、间距、圆角、层级与光效（阴影）、图标、动效原则
components/                原子与组合组件（含动效编排：弹出、拖拽、消失、页面切换）
components/index.html      组件总览画廊
patterns/                  应用框架、上传与确认
css/tokens.css             设计 token
css/base.css               重置、焦点、减少动效
css/components.css         组件样式
css/docs.css               文档框架
js/nav.js                  侧栏导航、筛选、图标
js/docs.js                 对话框、吐司、选择器、标签页、上传与动效演示
assets/                    站点标记
```

侧栏由 `js/nav.js` 统一生成。新增页面时，把条目加进该文件的 `NAV` 列表，并使用相同的文档外壳（`data-root`、四份 CSS、两份脚本）。

信息架构按「样式 → 原子 → 组合 → 模式」组织，接近常见设计系统文档，但页面本身按更高的视觉标准来排：疏朗的字体、光谱光效、浮起的真实界面碎片，同时保留完整的状态矩阵。

## 已确认的设计决定

- 品牌主语言是蓝色与光。主色是 `#2563EB`（`--aha-color-primary`）。橙色只用于警告或次要强调，绝不用作主按钮。
- 标题使用 Plus Jakarta Sans，正文、标签与界面使用 Inter。两者都通过 Google Fonts 加载。
- IP 形象目前是发光软团占位（两只椭圆眼睛），页面上标为「占位」，待正式形象替换。
- 演示文案围绕项目室、会议、看板、上传与文件，不使用虚构的品牌口号或社交证明。

## 文档语言与无障碍

- 可见文案为中文。
- 交互元素具有即时的 `:focus-visible` 轮廓。
- 正文与次级文字在画布和卡片上达到至少 4.5:1。参考板中的 `#64748B` 仅作装饰中灰，正文次级色使用更深的 `--aha-muted`。
- 图标是描边 SVG，不使用表情符号。
- `html` 与 `body` 使用 `overflow-x: clip`。动效尊重 `prefers-reduced-motion`，且不使用 `transition: all`，也不动画 width / height / top / left。
