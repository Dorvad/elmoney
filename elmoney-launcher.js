/*!
 * elmoney-launcher.js
 * Embeds the סגירת קופה app as a floating widget or inline iframe.
 *
 * Usage — floating button (default):
 *   <script src="elmoney-launcher.js"
 *           data-src="https://your-server.com/elmoney/"></script>
 *
 * Usage — inline embed:
 *   <div data-elmoney-widget></div>
 *   <script src="elmoney-launcher.js"
 *           data-src="https://your-server.com/elmoney/"
 *           data-mode="inline"></script>
 *
 * Options (data attributes on the <script> tag):
 *   data-src    (required) URL where the app is deployed
 *   data-mode   "float" (default) | "inline"
 *   data-label  Button label (default: "סגירת קופה")
 *   data-position "bottom-right" (default) | "bottom-left"
 */
(function () {
  'use strict';

  var script  = document.currentScript;
  var src     = script && script.getAttribute('data-src');
  var mode    = (script && script.getAttribute('data-mode'))     || 'float';
  var label   = (script && script.getAttribute('data-label'))    || 'סגירת קופה';
  var position= (script && script.getAttribute('data-position')) || 'bottom-right';

  if (!src) {
    console.warn('[ElMoney] Missing data-src attribute. Provide the URL where the app is deployed.');
    return;
  }

  /* ── CSS ─────────────────────────────────────────── */
  var css = [
    '.ew-fab{',
      'position:fixed;',
      (position === 'bottom-left' ? 'left:28px;' : 'right:28px;'),
      'bottom:28px;',
      'display:flex;align-items:center;gap:9px;',
      'padding:13px 22px;',
      'background:#5b8dee;',
      'border:none;border-radius:50px;',
      'color:#fff;font-size:15px;font-weight:700;',
      "font-family:'Rubik','Segoe UI',-apple-system,sans-serif;",
      'cursor:pointer;direction:rtl;white-space:nowrap;',
      'box-shadow:0 4px 24px rgba(91,141,238,.5),0 1px 4px rgba(0,0,0,.3);',
      'z-index:2147483646;',
      'transition:transform .18s,box-shadow .18s;',
    '}',
    '.ew-fab:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(91,141,238,.6),0 2px 8px rgba(0,0,0,.3);}',
    '.ew-fab:active{transform:scale(.97);}',

    '.ew-overlay{',
      'position:fixed;inset:0;',
      'background:rgba(5,8,18,.72);',
      'backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);',
      'display:flex;align-items:center;justify-content:center;',
      'padding:16px;z-index:2147483647;',
      'animation:ewFadeIn .2s ease;',
    '}',

    '.ew-panel{',
      'position:relative;',
      'width:100%;max-width:440px;',
      'height:85dvh;max-height:780px;min-height:520px;',
      'background:#0d1117;',
      'border-radius:24px;border:1.5px solid #2b3352;',
      'overflow:hidden;',
      'box-shadow:0 32px 80px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.04) inset;',
      'display:flex;flex-direction:column;',
      'animation:ewSlideUp .3s cubic-bezier(.34,1.15,.64,1);',
    '}',

    '.ew-frame{width:100%;height:100%;border:none;display:block;flex:1;}',

    '.ew-close{',
      'position:absolute;top:12px;left:12px;',
      'width:30px;height:30px;border-radius:50%;',
      'background:#1e2437;border:1px solid #2b3352;',
      'color:#7c849e;font-size:13px;line-height:1;',
      'display:flex;align-items:center;justify-content:center;',
      'cursor:pointer;z-index:10;',
      "font-family:'Rubik','Segoe UI',sans-serif;",
      'transition:background .15s,color .15s;',
    '}',
    '.ew-close:hover{background:#232a3e;color:#eef0f8;}',

    '.ew-inline-wrap{',
      'width:100%;height:700px;max-height:90vh;',
      'border-radius:20px;overflow:hidden;',
      'border:1.5px solid #2b3352;',
      'background:#0d1117;',
      'box-shadow:0 12px 48px rgba(0,0,0,.4),0 2px 8px rgba(0,0,0,.2);',
    '}',
    '.ew-inline-wrap iframe{width:100%;height:100%;border:none;display:block;}',

    '@keyframes ewFadeIn{from{opacity:0}to{opacity:1}}',
    '@keyframes ewSlideUp{from{opacity:0;transform:scale(.94) translateY(16px)}to{opacity:1;transform:scale(1) translateY(0)}}',
  ].join('');

  function injectStyles() {
    if (document.getElementById('ew-styles')) return;
    var s = document.createElement('style');
    s.id = 'ew-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ── Floating mode ───────────────────────────────── */
  function initFloat() {
    injectStyles();

    var fab     = document.createElement('button');
    var overlay = document.createElement('div');
    var panel   = document.createElement('div');
    var close   = document.createElement('button');
    var frame   = document.createElement('iframe');

    fab.className = 'ew-fab';
    fab.dir = 'rtl';
    fab.setAttribute('aria-label', label);
    fab.innerHTML = '<span aria-hidden="true">🏧</span><span>' + label + '</span>';

    overlay.className = 'ew-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', label);

    panel.className = 'ew-panel';

    close.className = 'ew-close';
    close.setAttribute('aria-label', 'סגור');
    close.textContent = '✕';

    frame.className = 'ew-frame';
    frame.src = src;
    frame.allow = 'clipboard-write';
    frame.title = label;

    function openWidget() {
      overlay.style.display = 'flex';
      fab.style.display = 'none';
      // Lazy-load: only set src when first opened
      if (!frame.src) frame.src = src;
    }

    function closeWidget() {
      overlay.style.display = 'none';
      fab.style.display = '';
    }

    fab.addEventListener('click', openWidget);
    close.addEventListener('click', closeWidget);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeWidget();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.style.display !== 'none') closeWidget();
    });

    panel.appendChild(close);
    panel.appendChild(frame);
    overlay.appendChild(panel);
    overlay.style.display = 'none';

    document.body.appendChild(fab);
    document.body.appendChild(overlay);
  }

  /* ── Inline mode ─────────────────────────────────── */
  function initInline() {
    injectStyles();

    var targets = document.querySelectorAll('[data-elmoney-widget]');
    if (!targets.length) {
      console.warn('[ElMoney] No elements with [data-elmoney-widget] found for inline mode.');
      return;
    }

    targets.forEach(function (el) {
      var wrap  = document.createElement('div');
      var frame = document.createElement('iframe');

      wrap.className = 'ew-inline-wrap';
      frame.src   = src;
      frame.title = label;
      frame.allow = 'clipboard-write';

      wrap.appendChild(frame);
      el.appendChild(wrap);
    });
  }

  /* ── Init ────────────────────────────────────────── */
  function init() {
    if (mode === 'inline') {
      initInline();
    } else {
      initFloat();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
