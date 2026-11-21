/* AhaStation docs interactions: modal, toast, select, tabs, upload, tokens */
(function () {
  document.documentElement.classList.add("js");
  function qs(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }
  function qsa(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  /* Token copy */
  document.addEventListener("click", function (e) {
    var tok = e.target.closest(".docs-token, .aha-token, [data-copy]");
    if (!tok) return;
    var text = tok.getAttribute("data-copy") || tok.textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showToast("已复制 " + text);
      });
    }
  });

  /* Chips */
  document.addEventListener("click", function (e) {
    var chip = e.target.closest(".aha-chip[data-toggle]");
    if (!chip || chip.disabled) return;
    var on = chip.classList.toggle("is-selected");
    chip.setAttribute("aria-pressed", on ? "true" : "false");
  });

  /* Custom select */
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest(".aha-select-trigger");
    var option = e.target.closest(".aha-select-option");
    if (option) {
      var box = option.closest(".aha-select");
      var t = qs(".aha-select-trigger .aha-select-value", box) || qs(".aha-select-trigger", box);
      var val = option.getAttribute("data-value") || option.textContent.trim();
      if (t) {
        if (t.classList.contains("aha-select-value") || t.classList.contains("aha-select-trigger")) {
          var label = qs(".aha-select-value", box);
          if (label) label.textContent = option.textContent.trim();
        }
      }
      qsa(".aha-select-option", box).forEach(function (o) {
        o.classList.toggle("is-selected", o === option);
      });
      box.classList.remove("is-open");
      qs(".aha-select-trigger", box).setAttribute("aria-expanded", "false");
      e.preventDefault();
      return;
    }
    if (trigger && !trigger.disabled) {
      var box = trigger.closest(".aha-select");
      var open = box.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      qsa(".aha-select.is-open").forEach(function (other) {
        if (other !== box) {
          other.classList.remove("is-open");
          var tr = qs(".aha-select-trigger", other);
          if (tr) tr.setAttribute("aria-expanded", "false");
        }
      });
      e.stopPropagation();
      return;
    }
    qsa(".aha-select.is-open").forEach(function (box) {
      box.classList.remove("is-open");
      var tr = qs(".aha-select-trigger", box);
      if (tr) tr.setAttribute("aria-expanded", "false");
    });
  });

  /* Tabs */
  document.addEventListener("click", function (e) {
    var tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    var list = tab.closest('[role="tablist"]');
    if (!list) return;
    var tabs = qsa('[role="tab"]', list);
    tabs.forEach(function (t) {
      var selected = t === tab;
      t.setAttribute("aria-selected", selected ? "true" : "false");
      t.tabIndex = selected ? 0 : -1;
      var panel = document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !selected;
    });
  });

  /* Modal */
  function openModal(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.add("is-open");
    el.setAttribute("aria-hidden", "false");
    var close = qs("[data-close-modal]", el);
    var focusable = qs("button, [href], input, textarea, [tabindex]:not([tabindex='-1'])", el);
    if (focusable) focusable.focus();
    document.documentElement.style.overflow = "clip";
  }
  function closeModal(el) {
    if (!el) return;
    el.classList.remove("is-open");
    el.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    var opener = document.querySelector('[data-open-modal="' + el.id + '"]');
    if (opener) opener.focus();
  }
  document.addEventListener("click", function (e) {
    var open = e.target.closest("[data-open-modal]");
    if (open) {
      openModal(open.getAttribute("data-open-modal"));
      return;
    }
    var closer = e.target.closest("[data-close-modal]");
    if (closer) {
      closeModal(closer.closest(".aha-backdrop"));
      return;
    }
    if (e.target.classList && e.target.classList.contains("aha-backdrop")) {
      closeModal(e.target);
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    qsa(".aha-backdrop.is-open").forEach(closeModal);
  });

  /* Toast */
  function ensureRegion() {
    var r = document.getElementById("aha-toasts");
    if (!r) {
      r = document.createElement("div");
      r.id = "aha-toasts";
      r.className = "aha-toast-region";
      r.setAttribute("aria-live", "polite");
      document.body.appendChild(r);
    }
    return r;
  }
  function showToast(message, kind) {
    var r = ensureRegion();
    var t = document.createElement("div");
    t.className = "aha-toast" + (kind ? " aha-toast--" + kind : "");
    t.setAttribute("role", "status");
    t.textContent = message;
    r.appendChild(t);
    setTimeout(function () {
      t.style.opacity = "0";
      t.style.transition = "opacity 200ms ease";
      setTimeout(function () {
        if (t.parentNode) t.parentNode.removeChild(t);
      }, 220);
    }, 2800);
  }
  window.ahaToast = showToast;
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-toast]");
    if (!btn) return;
    showToast(btn.getAttribute("data-toast") || "已完成", btn.getAttribute("data-toast-kind") || "");
  });

  /* Dual range */
  function syncDual(wrap) {
    var inputs = qsa('input[type="range"]', wrap);
    if (inputs.length < 2) return;
    var a = Number(inputs[0].value);
    var b = Number(inputs[1].value);
    if (a > b) {
      var tmp = a;
      a = b;
      b = tmp;
    }
    var min = Number(inputs[0].min || 0);
    var max = Number(inputs[0].max || 100);
    var fill = qs(".aha-range-dual-fill", wrap);
    if (fill) {
      fill.style.left = ((a - min) / (max - min)) * 100 + "%";
      fill.style.width = ((b - a) / (max - min)) * 100 + "%";
    }
    var host = wrap.parentNode;
    var meta = host && qs("[data-range-meta]", host);
    if (meta) meta.textContent = a + " – " + b;
    var values = host && qs(".docs-kit-values", host);
    if (values) {
      var strongs = qsa("strong", values);
      if (strongs[0]) strongs[0].textContent = a + " 月";
      if (strongs[1]) strongs[1].textContent = b + " 月";
    }
  }
  qsa(".aha-range-dual").forEach(function (wrap) {
    qsa('input[type="range"]', wrap).forEach(function (input) {
      input.addEventListener("input", function () {
        syncDual(wrap);
      });
    });
    syncDual(wrap);
  });

  /* Single slider meta */
  qsa("[data-slider-value]").forEach(function (label) {
    var id = label.getAttribute("data-slider-value");
    var input = document.getElementById(id);
    if (!input) return;
    var paint = function () {
      label.textContent = input.value;
    };
    input.addEventListener("input", paint);
    paint();
  });

  /* Upload demo */
  function fakeUpload(box) {
    var bar = qs(".aha-progress > span", box);
    var status = qs("[data-upload-status]", box);
    var row = qs(".aha-file-row", box);
    if (row) row.hidden = false;
    if (!bar) return;
    var p = 0;
    bar.style.transform = "scaleX(0)";
    var timer = setInterval(function () {
      p += 8 + Math.round(Math.random() * 10);
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        if (status) status.textContent = "已准备上传";
      }
      bar.style.transform = "scaleX(" + p / 100 + ")";
      if (status && p < 100) status.textContent = "读取中 " + p + "%";
    }, 160);
  }
  qsa(".aha-upload").forEach(function (box) {
    var input = qs('input[type="file"]', box);
    box.addEventListener("dragover", function (e) {
      e.preventDefault();
      box.classList.add("is-hot");
    });
    box.addEventListener("dragleave", function () {
      box.classList.remove("is-hot");
    });
    box.addEventListener("drop", function (e) {
      e.preventDefault();
      box.classList.remove("is-hot");
      fakeUpload(box);
    });
    if (input) {
      input.addEventListener("change", function () {
        fakeUpload(box);
      });
    }
    var start = qs("[data-upload-start]", box);
    if (start) {
      start.addEventListener("click", function () {
        fakeUpload(box);
      });
    }
  });

  /* Indeterminate checkbox demo */
  qsa('input[type="checkbox"][data-indeterminate]').forEach(function (el) {
    el.indeterminate = true;
  });

  /* Mascot mount */
  qsa("[data-mascot]").forEach(function (el) {
    el.innerHTML = mascotSvg();
  });

  function mascotSvg() {
    return (
      '<svg class="aha-mascot" viewBox="0 0 120 120" role="img" aria-label="AhaStation IP 形象占位">' +
      "<defs>" +
      '<radialGradient id="aha-blob" cx="40%" cy="35%" r="70%">' +
      '<stop offset="0%" stop-color="var(--aha-aqua)"/>' +
      '<stop offset="45%" stop-color="var(--aha-azure)"/>' +
      '<stop offset="100%" stop-color="var(--aha-midnight)"/>' +
      "</radialGradient>" +
      '<filter id="aha-blob-glow" x="-40%" y="-40%" width="180%" height="180%">' +
      '<feGaussianBlur stdDeviation="6" result="b"/>' +
      '<feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>' +
      "</filter>" +
      "</defs>" +
      '<ellipse cx="60" cy="66" rx="46" ry="28" fill="var(--aha-azure)" opacity="0.2" filter="url(#aha-blob-glow)"/>' +
      '<path fill="url(#aha-blob)" filter="url(#aha-blob-glow)" d="M34 70c-8-16 2-38 22-44 14-4 30 2 36 16 6 12 4 28-6 36-12 9-32 10-46 2-6-4-8-6-6-10z"/>' +
      '<ellipse cx="50" cy="60" rx="6.2" ry="9" fill="var(--aha-midnight)"/>' +
      '<ellipse cx="72" cy="59" rx="6.2" ry="9" fill="var(--aha-midnight)"/>' +
      '<ellipse cx="52" cy="57" rx="2" ry="2.4" fill="var(--aha-white)" opacity="0.85"/>' +
      '<ellipse cx="74" cy="56" rx="2" ry="2.4" fill="var(--aha-white)" opacity="0.85"/>' +
      "</svg>"
    );
  }
  window.ahaMascot = mascotSvg;

  /* Motion and elevation demos */
  function reducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function replayClass(el, cls) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  function initDurationPlays() {
    qsa("[data-duration-play]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.classList.remove("is-run");
        void btn.offsetWidth;
        btn.classList.add("is-run");
      });
    });
  }

  function initEnterDemo() {
    var root = qs('[data-demo="enter"]');
    if (!root) return;
    var card = qs(".docs-pop-card", root);
    var play = qs('[data-play="enter"]', root);
    var reset = qs('[data-reset="enter"]', root);
    if (play) {
      play.addEventListener("click", function () {
        card.classList.remove("is-in");
        void card.offsetWidth;
        requestAnimationFrame(function () {
          card.classList.add("is-in");
        });
      });
    }
    if (reset) {
      reset.addEventListener("click", function () {
        card.classList.remove("is-in");
      });
    }
    requestAnimationFrame(function () {
      card.classList.add("is-in");
    });
  }

  function initExitDemo() {
    var root = qs('[data-demo="exit"]');
    if (!root) return;
    var card = qs(".docs-exit-card", root);
    var play = qs('[data-play="exit"]', root);
    function dismiss() {
      card.classList.add("is-out");
    }
    function reopen() {
      card.classList.remove("is-out");
    }
    qsa("[data-dismiss]", root).forEach(function (btn) {
      btn.addEventListener("click", dismiss);
    });
    if (play) play.addEventListener("click", reopen);
  }

  function pointInRect(x, y, rect) {
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }

  function initDragCards() {
    var board = qs('[data-demo="drag"] .docs-drag-board');
    if (!board) return;
    var source = null;
    var originLane = null;
    var originNext = null;
    var startX = 0;
    var startY = 0;
    var offsetX = 0;
    var offsetY = 0;
    var dragging = false;

    function lists() {
      return qsa("[data-lane]", board);
    }

    function clearSlot() {
      qsa(".docs-drag-slot", board).forEach(function (s) {
        s.parentNode.removeChild(s);
      });
    }

    function refreshEmpty() {
      lists().forEach(function (lane) {
        var empty = qs(".docs-drag-empty", lane);
        if (!empty) return;
        var cards = qsa("[data-drag-card]", lane).filter(function (c) {
          return !c.classList.contains("is-origin");
        });
        var slot = qs(".docs-drag-slot", lane);
        empty.hidden = cards.length > 0 || !!slot;
      });
    }

    function placeSlot(clientX, clientY, height) {
      var target = null;
      var best = Infinity;
      lists().forEach(function (lane) {
        var r = lane.getBoundingClientRect();
        var inside = clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom;
        var d = inside ? 0 : Math.hypot(clientX - (r.left + r.width / 2), clientY - (r.top + r.height / 2));
        if (d < best) {
          best = d;
          target = lane;
        }
      });
      if (!target) return null;
      var slot = qs(".docs-drag-slot", board);
      if (!slot) {
        slot = document.createElement("div");
        slot.className = "docs-drag-slot";
        slot.style.height = height + "px";
      } else {
        slot.style.height = height + "px";
      }
      var before = null;
      qsa("[data-drag-card]", target).forEach(function (c) {
        if (c.classList.contains("is-origin")) return;
        var r = c.getBoundingClientRect();
        if (clientY < r.top + r.height / 2 && !before) before = c;
      });
      if (before) target.insertBefore(slot, before);
      else target.appendChild(slot);
      refreshEmpty();
      return slot;
    }

    function release(e) {
      if (!dragging || !source) return;
      dragging = false;
      var slot = qs(".docs-drag-slot", board);
      var dest = slot ? slot.parentNode : originLane;
      var before = slot ? slot.nextSibling : originNext;
      source.classList.remove("is-dragging", "is-origin");
      source.style.cssText = "";
      if (dest) {
        if (before && before.parentNode === dest) dest.insertBefore(source, before);
        else dest.appendChild(source);
      }
      clearSlot();
      refreshEmpty();
      source = null;
      originLane = null;
      originNext = null;
    }

    board.addEventListener("pointerdown", function (e) {
      var card = e.target.closest("[data-drag-card]");
      if (!card || (e.button && e.button !== 0)) return;
      if (e.target.closest("button, a, input, textarea")) return;
      e.preventDefault();
      var rect = card.getBoundingClientRect();
      dragging = true;
      source = card;
      originLane = card.parentNode;
      originNext = card.nextElementSibling;
      startX = e.clientX;
      startY = e.clientY;
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      card.classList.add("is-origin", "is-dragging");
      card.style.position = "fixed";
      card.style.left = rect.left + "px";
      card.style.top = rect.top + "px";
      card.style.width = rect.width + "px";
      card.style.margin = "0";
      card.style.zIndex = "20";
      card.style.pointerEvents = "none";
      placeSlot(e.clientX, e.clientY, rect.height);
      card.setPointerCapture(e.pointerId);
    });

    board.addEventListener("pointermove", function (e) {
      if (!dragging || !source) return;
      source.style.left = e.clientX - offsetX + "px";
      source.style.top = e.clientY - offsetY + "px";
      placeSlot(e.clientX, e.clientY, source.getBoundingClientRect().height);
    });

    board.addEventListener("pointerup", release);
    board.addEventListener("pointercancel", release);

    qsa('[data-reset="drag"]').forEach(function (btn) {
      btn.addEventListener("click", function () {
        var inbox = qs('[data-lane="inbox"]', board);
        if (!inbox) return;
        clearSlot();
        qsa("[data-drag-card]", board).forEach(function (card) {
          card.classList.remove("is-dragging", "is-origin");
          card.style.cssText = "";
          inbox.appendChild(card);
        });
        refreshEmpty();
      });
    });
  }

  function initSequenceDemo() {
    var root = qs('[data-demo="sequence"]');
    if (!root) return;
    var card = qs("[data-seq-card]", root);
    var drop = qs("[data-seq-drop]", root);
    var play = qs('[data-play="sequence"]', root);
    var timers = [];

    function clear() {
      timers.forEach(function (id) { clearTimeout(id); });
      timers = [];
    }

    function later(fn, ms) {
      timers.push(setTimeout(fn, reducedMotion() ? 0 : ms));
    }

    function travel() {
      if (!drop) return "translate(0, 0)";
      var c = card.getBoundingClientRect();
      var d = drop.getBoundingClientRect();
      var dx = d.left + 16 - c.left;
      var dy = d.top + 28 - c.top;
      return { dx: dx, dy: dy };
    }

    if (!play) return;
    play.addEventListener("click", function () {
      clear();
      card.classList.remove("is-in", "is-dragging", "is-out");
      card.style.transform = "";
      void card.offsetWidth;
      later(function () {
        card.classList.add("is-in");
      }, 20);
      later(function () {
        var pos = travel();
        card.setAttribute("data-seq-x", String(pos.dx));
        card.setAttribute("data-seq-y", String(pos.dy));
        card.classList.add("is-dragging");
        card.style.transform = "translate(" + pos.dx + "px, " + pos.dy + "px) scale(1.04)";
      }, 420);
      later(function () {
        var dx = card.getAttribute("data-seq-x");
        var dy = card.getAttribute("data-seq-y");
        card.classList.remove("is-dragging");
        card.style.transform = "translate(" + dx + "px, " + dy + "px)";
      }, 820);
      later(function () {
        var dx = card.getAttribute("data-seq-x");
        var dy = parseFloat(card.getAttribute("data-seq-y") || "0");
        card.style.transform = "translate(" + dx + "px, " + (dy + 8) + "px) scale(0.96)";
        card.classList.add("is-out");
      }, 1180);
    });
  }

  function initPageDemo() {
    var frame = qs("[data-page-frame]");
    if (!frame) return;

    function show(name, dir) {
      var next = qs('[data-view="' + name + '"]', frame);
      var cur = qs("[data-view].is-active", frame);
      if (!next || next === cur) return;
      frame.setAttribute("data-dir", dir < 0 ? "back" : "forward");
      if (reducedMotion()) {
        if (cur) cur.classList.remove("is-active", "is-leaving", "is-preparing");
        next.classList.add("is-active");
        next.classList.remove("is-leaving", "is-preparing");
        return;
      }
      if (cur) {
        cur.classList.add("is-leaving");
        cur.classList.remove("is-active");
        cur.addEventListener("transitionend", function te(e) {
          if (e.propertyName && e.propertyName !== "transform") return;
          cur.classList.remove("is-leaving");
          cur.removeEventListener("transitionend", te);
        });
      }
      next.classList.add("is-preparing");
      next.classList.remove("is-leaving");
      void next.offsetWidth;
      requestAnimationFrame(function () {
        next.classList.remove("is-preparing");
        next.classList.add("is-active");
      });
    }

    frame.addEventListener("click", function (e) {
      var go = e.target.closest("[data-go]");
      if (!go) return;
      e.preventDefault();
      var dir = go.getAttribute("data-dir") === "back" ? -1 : 1;
      show(go.getAttribute("data-go"), dir);
    });
  }

  function ensureFieldVeils() {
    qsa(".docs-hero, .docs-stage--field, .docs-elev-field, .docs-field, .docs-gallery").forEach(function (el) {
      if (qs(".aha-field-veil", el)) return;
      var v = document.createElement("span");
      v.className = "aha-field-veil";
      v.setAttribute("aria-hidden", "true");
      el.insertBefore(v, el.firstChild);
    });
  }

  function initMotionDemos() {
    ensureFieldVeils();

    initDurationPlays();
    initEnterDemo();
    initExitDemo();
    initDragCards();
    initSequenceDemo();
    initPageDemo();
  }

  initMotionDemos();

  /* Overview kit · make every card usable */
  function initKit() {
    var kit = qs(".docs-kit");
    if (!kit) return;

    qsa(".docs-kit-search input[type=search]", kit).forEach(function (input) {
      var card = input.closest(".docs-kit-search");
      if (!card) return;
      input.addEventListener("input", function () {
        var q = input.value.trim();
        qsa(".docs-kit-row", card).forEach(function (row) {
          var text = row.textContent.replace(/\s+/g, " ").trim();
          row.hidden = q ? text.indexOf(q) === -1 : false;
        });
      });
    });

    kit.addEventListener("click", function (e) {
      var row = e.target.closest(".docs-kit-row");
      if (row && kit.contains(row)) {
        qsa(".docs-kit-row", row.parentNode).forEach(function (r) {
          r.classList.toggle("is-selected", r === row);
        });
        return;
      }

      var seg = e.target.closest(".docs-kit-seg");
      if (seg) {
        qsa(".docs-kit-seg", seg.parentNode).forEach(function (s) {
          var on = s === seg;
          s.classList.toggle("is-active", on);
          s.setAttribute("aria-pressed", on ? "true" : "false");
        });
        return;
      }

      var tab = e.target.closest(".docs-kit-tab");
      if (tab) {
        qsa(".docs-kit-tab", tab.parentNode).forEach(function (t) {
          t.classList.toggle("is-active", t === tab);
        });
        return;
      }

      var tool = e.target.closest(".docs-kit-tool");
      if (tool) {
        tool.classList.toggle("is-active");
        return;
      }

      var fav = e.target.closest(".docs-kit-fav");
      if (fav) {
        var on = fav.classList.toggle("is-on");
        var count = qs(".docs-kit-count", fav);
        if (count) {
          var n = parseInt(count.textContent, 10) || 0;
          count.textContent = String(on ? n + 1 : Math.max(0, n - 1));
        }
        fav.setAttribute("aria-pressed", on ? "true" : "false");
        return;
      }

      var copyBtn = e.target.closest('[aria-label="复制会议号"]');
      if (copyBtn) {
        var code = copyBtn.closest(".docs-kit-code");
        var text = code ? (qs(".docs-kit-event-meta span", code) || {}).textContent : "";
        if (text && navigator.clipboard) {
          navigator.clipboard.writeText(text.trim()).then(function () {
            showToast("已复制 " + text.trim(), "success");
          });
        }
        return;
      }

      var eye = e.target.closest('[data-kit-eye]');
      if (eye) {
        var field = eye.closest(".docs-kit-affix");
        var input = field && qs("input", field);
        if (input) {
          var hide = input.type === "text";
          input.type = hide ? "password" : "text";
          if (input.hasAttribute("readonly") && input.value.indexOf("•") !== -1) {
            input.value = hide ? "••••••••" : "aha-studio";
          }
          eye.setAttribute("aria-label", hide ? "显示访问码" : "隐藏访问码");
        }
        return;
      }

      var play = e.target.closest(".docs-kit-play");
      if (play) {
        showToast("正在打开会议纪要", "success");
        return;
      }

      var apply = e.target.closest(".docs-kit-actions .aha-btn--primary");
      if (apply) {
        showToast("已应用时间筛选", "success");
        return;
      }

      var cancel = e.target.closest(".docs-kit-actions .aha-btn--secondary");
      if (cancel) {
        var range = qs(".docs-kit-range .aha-range-dual", kit);
        if (range) {
          var inputs = qsa('input[type="range"]', range);
          if (inputs[0]) inputs[0].value = "2";
          if (inputs[1]) inputs[1].value = "8";
          syncDual(range);
        }
        showToast("已取消更改");
        return;
      }

      var upload = e.target.closest(".docs-kit-upload .aha-btn");
      if (upload) {
        showToast("请选择要上传的文件", "warning");
        return;
      }

      var enter = e.target.closest(".docs-kit-join .aha-btn--primary");
      if (enter) {
        showToast("已进入项目室 · 品牌升级", "success");
        return;
      }

      var openRoom = e.target.closest(".docs-kit-search .aha-btn--primary");
      if (openRoom) {
        var picked = qs(".docs-kit-search .docs-kit-row.is-selected", kit);
        var name = picked ? picked.textContent.replace(/\s+/g, " ").trim() : "项目室";
        showToast("正在打开" + name, "success");
      }
    });
  }
  initKit();

  function initPixelBlast() {
    if (typeof window.AhaPixelBlast === "undefined") return;
    var nodes = document.querySelectorAll("[data-pixel-blast]");
    if (!nodes.length) return;
    var styles = getComputedStyle(document.documentElement);
    var brand = (styles.getPropertyValue("--aha-color-primary") || "#2563EB").trim() || "#2563EB";
    var accent = (styles.getPropertyValue("--aha-white") || "#ffffff").trim() || "#ffffff";
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    nodes.forEach(function (node) {
      window.AhaPixelBlast.mount(node, {
        color: brand,
        accentColor: accent,
        variant: "square",
        hoverEffect: "reveal",
        pixelSize: 3,
        patternScale: 2,
        patternDensity: 1,
        softness: 0.6,
        smoothing: 1,
        glow: 0.4,
        twinkle: reduce ? 0 : 0.25,
        speed: reduce ? 0 : 0.5,
        drift: reduce ? 0 : 0.2,
        driftAngle: 30,
        hoverRadius: 140,
        rippleSpeed: 0.3,
        rippleThickness: 0.1,
        rippleIntensityScale: 1,
        enableRipples: !reduce,
        autoRipple: 0,
        edgeFade: 0.25,
        intro: false,
        lightMode: false,
        transparent: true
      });
    });
  }
  initPixelBlast();

})();
