# AhaStation 设计系统

本仓库是 **AhaStation 设计系统**：颜色、字体、间距、圆角、光效和组件的对照站点。它是静态页面，不需要打包。

产品原型是另一个仓库：[AhaStation-prototype](https://github.com/Leonardolee351-LMX/AhaStation-prototype)。原型用来点按桌面工作区和掌机附屏，不在这里改交互流程。本仓库地址：[AhaStation-design-system](https://github.com/Leonardolee351-LMX/AhaStation-design-system)。

## 打开设计系统

需要本机有 Python 3。没有 Python 时，脚本会直接打开 `index.html`。Google Fonts 需要联网；字体没载入时会回退到苹方、雅黑或 system-ui。

- **Windows：** 双击 `start.cmd`，浏览器打开 [http://localhost:5174/](http://localhost:5174/)。
- **macOS：** 双击 `start.command`。若系统拦截，在终端执行：

```bash
chmod +x start.command
./start.command
```

也可以手动启动：

```bash
python -m http.server 5174
```

打开后从侧栏进入。基础规范在「基础」，组件在「原子组件」和「组合组件」，整页结构在「模式」。IP 参考在 **基础 → IP设计（施工中）**。动画资产和动作库还在制作，那一页只有静态参考。

## 打开原型

原型是未完成的界面演示，不是成品软件。语音、Git、终端和模型调用都是模拟。需要 [Node.js](https://nodejs.org) 18 或更高版本。

在原型仓库根目录：

- **Windows：** 双击 `start.cmd`
- **macOS：** 双击 `start.command`。若被拦截，执行 `chmod +x start.command && ./start.command`

首次运行会自动 `npm install`，然后打开 [http://localhost:5175/](http://localhost:5175/)。这个地址已经在跑时，脚本只打开浏览器，不会再起一份服务。

也可以手动执行：

```bash
npm install
npm start
```

掌机附屏：左侧栏底部的「掌机」，或「设置 → 通用」里的「打开掌机附屏」。直接访问 [http://localhost:5175/?view=handheld](http://localhost:5175/?view=handheld) 也可以。

原型的视觉以本设计系统为准。改颜色、字号、圆角和组件外观时改这里；改页面流程和假数据时改原型仓库。

## 引用规范

产品界面只消费这个库里已经命名的东西，不另起一套颜色或圆角。

1. **先链三份样式，再写组件类名。** 产品页面引入 `css/tokens.css`、`css/base.css`、`css/components.css`。`css/docs.css` 只给本站文档用，不要带到产品里。
2. **颜色、字体、间距、圆角、阴影只用 `var(--aha-…)`。** 改色改 `css/tokens.css` 的语义层，例如 `--aha-color-primary`、`--aha-canvas`、`--aha-ink`、`--aha-muted`。不要在组件里写 `#2563EB` 这种色值，也不要新造没有 `--aha-` 前缀的变量。
3. **原始色和语义色分开。** `--aha-blue-500`、`--aha-neutral-600` 是原始值。界面用语义名：主按钮 `--aha-color-primary`，正文 `--aha-text-body`，次级文字 `--aha-muted`，警告 `--aha-color-warning`。橙色只用于警告或次要强调，不用作主按钮。
4. **类名沿用组件页里的写法。** 前缀是 `aha-`。主按钮是 `aha-btn aha-btn--primary aha-btn--pill`，次按钮是 `aha-btn aha-btn--secondary`，危险是 `aha-btn--danger`，警告是 `aha-btn--warning`。输入用 `aha-input`，卡片、对话框、吐司等同理，以对应 HTML 示例为准。
5. **图标用描边 SVG，或 `<span data-icon="名称"></span>`。** 名称见 `js/nav.js` 的 `ICONS`，以及「基础 → 图标」。不要用表情符号代替图标。
6. **新页面放进现有信息架构。** 基础进 `foundations/`，原子或组合组件进 `components/`，整页模式进 `patterns/`。侧栏条目加在 `js/nav.js` 的 `NAV` 里，并沿用现有文档外壳：`data-root`、四份 CSS、`nav.js` 和 `docs.js`。
7. **动效只动透明度和变换。** 尊重 `prefers-reduced-motion`。不要使用 `transition: all`，也不要动画 `width`、`height`、`top`、`left`。
8. **文案用中文，围绕项目室、会议、看板、上传和文件。** IP 形象仍以「基础 / IP设计（施工中）」的两套方案为参考；组件页里的发光软团是占位，不要把它当成最终形象。

标题字体是 Plus Jakarta Sans，界面和正文是 Inter。主色是 `#2563EB`（`--aha-color-primary`）。

## 给 AI 的提示词

把下面整段复制给负责改 UI 的 AI，并把「改动目标」换成这次要做的界面。

```text
你正在按 AhaStation 设计系统改 UI。先阅读本仓库的 css/tokens.css、css/base.css、css/components.css，以及和这次界面对应的 components/ 或 foundations/ 示例页。不要另起视觉风格。

必须遵守：
- 只使用已有的 --aha- 语义变量和 aha- 组件类。颜色、字体、间距、圆角、阴影都写 var(--aha-…)，不要在组件里写死色值或字体名。
- 主行动用 aha-btn aha-btn--primary aha-btn--pill。橙色（--aha-color-warning / aha-btn--warning）只用于警告，绝不做主按钮。
- 标题用 Plus Jakarta Sans，正文和界面用 Inter。可见文案用中文。
- 图标用现有描边 SVG 或 data-icon，不用表情符号。
- 动效只使用 opacity 和 transform，并尊重 prefers-reduced-motion。
- 产品页面只引入 tokens.css、base.css、components.css。不要引入 docs.css。
- IP 形象以 foundations/ip.html 的两套参考为准。动画资产和动作库仍在制作，不要编造动作或把占位软团当成最终 IP。
- 原型仓库只负责流程和假数据。视觉差异以设计系统为准。

改动目标：
（在这里写要改的页面、组件和期望结果。）

做完后说明你用了哪些现有类名和 token；如果设计系统里没有对应组件，先指出缺口，不要发明一套新的视觉语言。
```
