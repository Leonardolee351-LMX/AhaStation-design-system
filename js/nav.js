/* AhaStation docs navigation, icon sprite, sidebar filter */
(function () {
  var root = document.documentElement.getAttribute("data-root") || "";

  var ICONS = {
    plus: "M12 5v14M5 12h14",
    minus: "M5 12h14",
    check: "M5 12.5l4.5 4.5L19 7.5",
    close: "M6 6l12 12M18 6L6 18",
    search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.2-4.2",
    chevronDown: "M6 9l6 6 6-6",
    chevronRight: "M9 6l6 6-6 6",
    chevronLeft: "M15 18l-6-6 6-6",
    upload: "M12 16V5M7 9l5-5 5 5M5 19h14",
    download: "M12 5v11M7 12l5 5 5-5M5 19h14",
    folder: "M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    file: "M7 3h7l5 5v13a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM14 3v5h5",
    calendar: "M5 6h14a1 1 0 0 1 1 1v13H4V7a1 1 0 0 1 1-1zM8 3v4M16 3v4M4 11h16",
    message: "M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
    settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM4 12l1.6-1 .2-1.8-1.2-1.6 1.4-1.4 1.6 1.2 1.8-.2L10.2 4h3.6l1 1.6 1.8.2 1.6-1.2 1.4 1.4-1.2 1.6.2 1.8L20 12l-1.6 1-.2 1.8 1.2 1.6-1.4 1.4-1.6-1.2-1.8.2-1 1.6h-3.6l-1-1.6-1.8-.2-1.6 1.2-1.4-1.4 1.2-1.6-.2-1.8z",
    home: "M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z",
    grid: "M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z",
    list: "M8 7h12M8 12h12M8 17h12M5 7h.01M5 12h.01M5 17h.01",
    user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 20a7 7 0 0 1 14 0",
    bell: "M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9zM10 20a2 2 0 0 0 4 0",
    more: "M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
    warning: "M12 4l10 17H2L12 4zM12 10v5M12 17.5h.01",
    info: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 11v5M12 8h.01",
    trash: "M5 7h14M9 7V5h6v2M7 7l1 13h8l1-13",
    link: "M9 14l-1 1a4 4 0 0 0 6 6l3-3a4 4 0 0 0 0-6l-1-1M15 10l1-1a4 4 0 0 0-6-6L7 6a4 4 0 0 0 0 6l1 1",
    copy: "M8 8h11v13H8zM5 16H4V3h11v1",
    clock: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 8v5l3 2",
    pin: "M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    star: "M12 4l2.4 5.4 5.8.6-4.4 3.9 1.3 5.6L12 16.8 6.9 19.5l1.3-5.6L3.8 10l5.8-.6z",
    send: "M4 12l16-8-6 16-2-7z",
    paperclip: "M8 12.5V8a4 4 0 0 1 8 0v8a4 4 0 0 1-8 0V10",
    image: "M5 6h14v12H5zM5 16l4-4 3 3 2-2 5 5M9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
    mic: "M12 4a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V7a3 3 0 0 1 3-3zM7 12a5 5 0 0 0 10 0M12 17v3",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    lock: "M8 10V8a4 4 0 0 1 8 0v2M7 10h10v10H7z",
    edit: "M5 19h4l10-10-4-4L5 15v4zM13 7l4 4",
    share: "M16 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM4 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM16 18a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM7.5 13.2l8.2 3.3M15.7 7.5L7.8 10.8",
    filter: "M4 6h16l-6 8v5l-4-2v-3z",
    tag: "M4 10V4h6l10 10-6 6zM7.5 7.5h.01",
    menu: "M5 7h14M5 12h14M5 17h14",
    kanban: "M5 5h4v14H5zM11 5h4v9h-4zM17 5h4v11h-4z",
    meeting: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM2 20a6 6 0 0 1 12 0M14 20a5 5 0 0 1 8-4",
    project: "M4 6h16v13H4zM8 6V4h8v2",
    checkCircle: "M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.5 12l2.5 2.5 4.5-5",
    heart: "M12 20s-7-4.8-7-10.2A4.4 4.4 0 0 1 12 8a4.4 4.4 0 0 1 7 1.8C19 15.2 12 20 12 20z",
    play: "M9 7.5v9l8-4.5z",
    spinner: ""
  };

  function iconSvg(name, cls) {
    var d = ICONS[name];
    if (!d && name !== "spinner") return "";
    if (name === "spinner") {
      return '<span class="aha-spinner aha-spinner--sm aha-btn-spin" aria-hidden="true"></span>';
    }
    return (
      '<svg class="aha-icon' +
      (cls ? " " + cls : "") +
      '" viewBox="0 0 24 24" aria-hidden="true"><path d="' +
      d +
      '" /></svg>'
    );
  }

  window.ahaIcon = iconSvg;

  var NAV = [
    {
      label: "概述",
      items: [{ href: "index.html", key: "index.html", name: "欢迎" }]
    },
    {
      label: "基础",
      items: [
        { href: "foundations/colors.html", key: "foundations/colors.html", name: "颜色" },
        { href: "foundations/typography.html", key: "foundations/typography.html", name: "字体" },
        { href: "foundations/spacing.html", key: "foundations/spacing.html", name: "间距" },
        { href: "foundations/sizing.html", key: "foundations/sizing.html", name: "尺寸与自适应" },
        { href: "foundations/radius.html", key: "foundations/radius.html", name: "圆角" },
        { href: "foundations/elevation.html", key: "foundations/elevation.html", name: "层级与光效" },
        { href: "foundations/icons.html", key: "foundations/icons.html", name: "图标" },
        { href: "foundations/motion.html", key: "foundations/motion.html", name: "动效" },
        { href: "foundations/ip.html", key: "foundations/ip.html", name: "IP设计（施工中）" }
      ]
    },
    {
      label: "原子组件",
      items: [
        { href: "components/index.html", key: "components/index.html", name: "组件总览" },
        { href: "components/button.html", key: "components/button.html", name: "按钮" },
        { href: "components/input.html", key: "components/input.html", name: "输入" },
        { href: "components/select.html", key: "components/select.html", name: "选择器" },
        { href: "components/checkbox.html", key: "components/checkbox.html", name: "复选框" },
        { href: "components/radio.html", key: "components/radio.html", name: "单选" },
        { href: "components/switch.html", key: "components/switch.html", name: "开关" },
        { href: "components/slider.html", key: "components/slider.html", name: "滑杆" },
        { href: "components/progress.html", key: "components/progress.html", name: "进度" },
        { href: "components/badge.html", key: "components/badge.html", name: "徽章与标签" },
        { href: "components/avatar.html", key: "components/avatar.html", name: "头像" },
        { href: "components/tooltip.html", key: "components/tooltip.html", name: "提示" },
        { href: "components/divider.html", key: "components/divider.html", name: "分割线" },
        { href: "components/spinner.html", key: "components/spinner.html", name: "加载" },
        { href: "components/link.html", key: "components/link.html", name: "链接" }
      ]
    },
    {
      label: "组合组件",
      items: [
        { href: "components/card.html", key: "components/card.html", name: "卡片" },
        { href: "components/motion.html", key: "components/motion.html", name: "动效编排" },
        { href: "components/chat.html", key: "components/chat.html", name: "对话" },
        { href: "components/toast.html", key: "components/toast.html", name: "吐司" },
        { href: "components/modal.html", key: "components/modal.html", name: "对话框" },
        { href: "components/sidebar.html", key: "components/sidebar.html", name: "侧栏" },
        { href: "components/topbar.html", key: "components/topbar.html", name: "顶栏" },
        { href: "components/bottom-nav.html", key: "components/bottom-nav.html", name: "底栏" },
        { href: "components/tabs.html", key: "components/tabs.html", name: "标签页" },
        { href: "components/timeline.html", key: "components/timeline.html", name: "时间线" },
        { href: "components/upload.html", key: "components/upload.html", name: "上传" },
        { href: "components/info-panel.html", key: "components/info-panel.html", name: "信息面板" },
        { href: "components/empty-state.html", key: "components/empty-state.html", name: "空状态" },
        { href: "components/mascot.html", key: "components/mascot.html", name: "IP 形象（占位）" }
      ]
    },
    {
      label: "模式",
      items: [
        { href: "patterns/app-shell.html", key: "patterns/app-shell.html", name: "应用框架" },
        { href: "patterns/upload-flow.html", key: "patterns/upload-flow.html", name: "上传与确认" }
      ]
    }
  ];

  function currentKey() {
    var path = (location.pathname || "").replace(/\\/g, "/");
    var parts = path.split("/").filter(Boolean);
    var file = parts[parts.length - 1] || "index.html";
    var dir = parts[parts.length - 2] || "";
    if (!file || file.indexOf(".html") === -1) file = "index.html";
    if (dir === "foundations" || dir === "components" || dir === "patterns") {
      return dir + "/" + file;
    }
    return "index.html";
  }

  function buildSidebar() {
    var host = document.getElementById("docs-sidebar");
    if (!host) return;
    var key = currentKey();
    var html = "";
    html +=
      '<a class="docs-brand" href="' +
      root +
      'index.html">' +
      '<span class="docs-mark" aria-hidden="true"></span>' +
      '<span class="docs-brand-text"><span class="docs-brand-name">AhaStation</span>' +
      '<span class="docs-brand-sub">设计系统</span></span></a>';
    html +=
      '<div class="docs-filter">' +
      iconSvg("search") +
      '<input type="search" id="docs-filter" placeholder="筛选页面" aria-label="筛选页面" /></div>';
    html += '<nav class="docs-nav" aria-label="设计系统">';
    NAV.forEach(function (group) {
      html += '<div class="docs-nav-group">';
      html += '<div class="docs-nav-label">' + group.label + "</div>";
      group.items.forEach(function (item) {
        var active = item.key === key ? " is-active" : "";
        var aria = item.key === key ? ' aria-current="page"' : "";
        html +=
          '<a class="docs-nav-link' +
          active +
          '" data-name="' +
          item.name +
          '" href="' +
          root +
          item.href +
          '"' +
          aria +
          ">" +
          item.name +
          "</a>";
      });
      html += "</div>";
    });
    html += "</nav>";
    host.innerHTML = html;

    var input = document.getElementById("docs-filter");
    if (input) {
      input.addEventListener("input", function () {
        var q = (input.value || "").trim().toLowerCase();
        host.querySelectorAll(".docs-nav-link").forEach(function (a) {
          var name = (a.getAttribute("data-name") || "").toLowerCase();
          a.hidden = q && name.indexOf(q) === -1;
        });
        host.querySelectorAll(".docs-nav-group").forEach(function (g) {
          var any = g.querySelector(".docs-nav-link:not([hidden])");
          g.hidden = !any;
        });
      });
    }
  }

  function bindMenu() {
    var btn = document.querySelector(".docs-menu");
    var side = document.getElementById("docs-sidebar");
    var back = document.getElementById("docs-backdrop");
    if (!btn || !side) return;
    function close() {
      side.classList.remove("is-open");
      if (back) back.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
    }
    function open() {
      side.classList.add("is-open");
      if (back) back.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
    }
    btn.addEventListener("click", function () {
      if (side.classList.contains("is-open")) close();
      else open();
    });
    if (back) back.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  function hydrateIcons() {
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      var name = el.getAttribute("data-icon");
      var cls = el.getAttribute("data-icon-class") || "";
      el.innerHTML = iconSvg(name, cls);
    });
  }

  window.ahaNav = { buildSidebar: buildSidebar, icon: iconSvg, icons: Object.keys(ICONS) };

  buildSidebar();
  bindMenu();
  hydrateIcons();
})();
