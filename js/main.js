/* ==========================================================================
   Halqa — behaviour
   --------------------------------------------------------------------------
   Plain ES2019, no dependencies, no build step. Everything degrades: with
   JavaScript switched off the page is still complete, readable and bookable —
   only the language toggle, the lightbox and the scroll fades are lost.
   ========================================================================== */

(function () {
  'use strict';

  var DICT = window.HALQA_I18N || {};
  var CONTACT = window.HALQA_CONTACT || {};
  var PRICES = window.HALQA_PRICES || { confirmed: false, values: {} };
  var STORE_KEY = 'halqa:lang';
  var THEME_KEY = 'halqa:theme';
  var SUPPORTED = ['en', 'ar'];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var darkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  function t(key, lang) {
    var table = DICT[lang] || DICT.en || {};
    return Object.prototype.hasOwnProperty.call(table, key) ? table[key] : null;
  }

  /* ------------------------------------------------------------------
     Language
     ------------------------------------------------------------------ */

  function storedLang() {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (e) {
      /* private browsing — fall through to the default */
    }
    return null;
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORE_KEY, lang);
    } catch (e) {
      /* nothing we can do, and nothing that needs saying */
    }
  }

  function applyText(lang) {
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var value = t(el.getAttribute('data-i18n'), lang);
      if (value !== null) el.textContent = value;
    }

    /* data-i18n-attr="aria-label:some.key, title:other.key" */
    var attrNodes = document.querySelectorAll('[data-i18n-attr]');
    for (var j = 0; j < attrNodes.length; j++) {
      var node = attrNodes[j];
      var pairs = node.getAttribute('data-i18n-attr').split(',');
      for (var k = 0; k < pairs.length; k++) {
        var parts = pairs[k].split(':');
        if (parts.length !== 2) continue;
        var attr = parts[0].trim();
        var val = t(parts[1].trim(), lang);
        if (val !== null) node.setAttribute(attr, val);
      }
    }
  }

  function applyHead(lang) {
    var title = t('meta.title', lang);
    if (title) document.title = title;

    var desc = t('meta.description', lang);
    var metaDesc = document.querySelector('meta[name="description"]');
    if (desc && metaDesc) metaDesc.setAttribute('content', desc);
  }

  function applyLinks(lang) {
    var number = CONTACT.whatsapp;
    var bank = (CONTACT.messages && CONTACT.messages[lang]) || {};

    var waLinks = document.querySelectorAll('[data-msg]');
    for (var i = 0; i < waLinks.length; i++) {
      var link = waLinks[i];
      var msg = bank[link.getAttribute('data-msg')];
      if (number && msg) {
        link.href = 'https://wa.me/' + number + '?text=' + encodeURIComponent(msg);
      }
    }

    /* Telegram and Preply are language-independent, but they are still
       written from one config so the number/handle lives in a single place. */
    var tg = document.querySelectorAll('[data-link="telegram"]');
    for (var j = 0; j < tg.length; j++) {
      if (CONTACT.telegram) tg[j].href = 'https://t.me/' + CONTACT.telegram;
    }

    var py = document.querySelectorAll('[data-link="preply"]');
    for (var k = 0; k < py.length; k++) {
      if (CONTACT.preply) py[k].href = CONTACT.preply;
    }
  }

  /* Prices stay hidden behind an explicit switch so placeholder numbers can
     never reach a student. See the notes at the bottom of i18n.js. */
  function applyPrices(lang) {
    var slots = document.querySelectorAll('[data-course]');
    var symbol = PRICES.currency || '$';

    for (var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      var amount = PRICES.values ? PRICES.values[slot.getAttribute('data-course')] : null;

      if (!PRICES.confirmed || amount === null || amount === undefined) {
        slot.textContent = t('price.ask', lang) || 'Pricing on request';
        continue;
      }

      slot.textContent = '';
      var from = document.createElement('span');
      from.textContent = t('price.from', lang) || 'From';
      var value = document.createElement('strong');
      value.textContent = symbol + amount;
      var per = document.createElement('span');
      per.textContent = t('price.perLesson', lang) || 'per lesson';

      slot.appendChild(from);
      slot.appendChild(value);
      slot.appendChild(per);
    }

    if (!PRICES.confirmed && window.console && console.info) {
      console.info(
        '[Halqa] Prices are hidden. Set HALQA_PRICES.confirmed = true in js/i18n.js once the real rates are in.'
      );
    }
  }

  function setLang(lang, options) {
    if (SUPPORTED.indexOf(lang) === -1) lang = 'en';
    var root = document.documentElement;

    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    applyText(lang);
    applyHead(lang);
    applyLinks(lang);
    applyPrices(lang);

    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      btn.setAttribute(
        'aria-pressed',
        btn.getAttribute('data-set-lang') === lang ? 'true' : 'false'
      );
    }

    if (!options || options.save !== false) saveLang(lang);
  }

  function initLangToggle() {
    var buttons = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        setLang(this.getAttribute('data-set-lang'));
      });
    }

    /* The inline script in <head> has already set lang/dir to avoid a flash;
       this pass fills in the text. */
    setLang(storedLang() || document.documentElement.getAttribute('lang') || 'en', {
      save: false
    });
  }

  /* ------------------------------------------------------------------
     Light / dark theme

     The inline script in <head> has already written data-theme before the
     first paint, so there is no flash to fix here. This only wires the
     button, keeps its label truthful, and follows the operating system for
     as long as the visitor has not made a choice of their own.
     ------------------------------------------------------------------ */

  function storedTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {
      /* private browsing */
    }
    return null;
  }

  function applyTheme(theme, options) {
    document.documentElement.setAttribute('data-theme', theme);

    /* The label has to describe what the button will DO, not what is showing,
       which means it says the opposite of the current theme. */
    var next = theme === 'dark' ? 'theme.toLight' : 'theme.toDark';
    var lang = document.documentElement.getAttribute('lang') || 'en';
    var buttons = document.querySelectorAll('.theme-toggle');

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('data-i18n-attr', 'aria-label:' + next);
      var label = t(next, lang);
      if (label) buttons[i].setAttribute('aria-label', label);
    }

    if (options && options.save) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (e) {
        /* nothing to be done */
      }
    }
  }

  function initTheme() {
    var saved = storedTheme();
    applyTheme(saved || (darkScheme.matches ? 'dark' : 'light'));

    var buttons = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'dark' ? 'light' : 'dark', { save: true });
      });
    }

    /* Follow the system if — and only if — no explicit choice has been saved. */
    var onSchemeChange = function (event) {
      if (storedTheme()) return;
      applyTheme(event.matches ? 'dark' : 'light');
    };

    if (typeof darkScheme.addEventListener === 'function') {
      darkScheme.addEventListener('change', onSchemeChange);
    } else if (typeof darkScheme.addListener === 'function') {
      darkScheme.addListener(onSchemeChange); /* Safari < 14 */
    }
  }

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */

  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var panel = document.getElementById('site-nav');
    if (!toggle || !panel) return;

    var isMobile = function () {
      return !window.matchMedia('(min-width: 980px)').matches;
    };

    function open() {
      panel.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
    }

    function close() {
      if (isMobile()) panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      if (toggle.getAttribute('aria-expanded') === 'true') close();
      else open();
    });

    /* Any nav link closes the panel — otherwise it covers the section you
       just jumped to. */
    var links = panel.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', close);
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        close();
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (panel.contains(event.target) || toggle.contains(event.target)) return;
      close();
    });

    /* Crossing the breakpoint with the panel open would leave it hidden on
       desktop, where it must always show. */
    window.addEventListener('resize', function () {
      if (!isMobile()) {
        panel.hidden = false;
        toggle.setAttribute('aria-expanded', 'false');
      } else if (toggle.getAttribute('aria-expanded') !== 'true') {
        panel.hidden = true;
      }
    });

    if (isMobile()) panel.hidden = true;
  }

  /* ------------------------------------------------------------------
     Reveal on scroll + current section in the nav
     ------------------------------------------------------------------ */

  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('is-visible');
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    for (var j = 0; j < items.length; j++) observer.observe(items[j]);
  }

  function initCurrentSection() {
    if (!('IntersectionObserver' in window)) return;

    var links = document.querySelectorAll('.nav__link[href^="#"]');
    if (!links.length) return;

    var map = {};
    var sections = [];

    for (var i = 0; i < links.length; i++) {
      var id = links[i].getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) continue;
      map[id] = links[i];
      sections.push(section);
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    for (var j = 0; j < sections.length; j++) observer.observe(sections[j]);
  }

  /* ------------------------------------------------------------------
     Gallery lightbox
     Uses <dialog>, which brings the focus trap, Escape and the backdrop
     with it instead of us reimplementing all three.
     ------------------------------------------------------------------ */

  /* A gallery tile whose photo is missing removes itself rather than showing a
     broken-image icon. That covers a renamed file, a failed upload, or a slot
     added to the markup before its photo arrives. */
  function initGalleryImages() {
    var imgs = document.querySelectorAll('.gallery__btn img');

    for (var i = 0; i < imgs.length; i++) {
      (function (img) {
        var hide = function () {
          var item = img.closest && img.closest('.gallery__item');
          if (item) item.hidden = true;
        };

        /* A cached failure may already have happened before this ran */
        if (img.complete && img.naturalWidth === 0) hide();
        img.addEventListener('error', hide);
      })(imgs[i]);
    }
  }

  function initLightbox() {
    var dialog = document.getElementById('lightbox');
    var buttons = Array.prototype.slice.call(
      document.querySelectorAll('.gallery__btn')
    );
    if (!dialog || !buttons.length || typeof dialog.showModal !== 'function') return;

    /* Resolved at open time, not at startup, so a tile that removed itself
       above is not left in the arrow-key rotation as a blank frame. */
    var openable = function () {
      return buttons.filter(function (btn) {
        var item = btn.closest && btn.closest('.gallery__item');
        return !(item && item.hidden);
      });
    };

    var image = dialog.querySelector('.lightbox__img');
    var prevBtn = dialog.querySelector('.icon-btn--prev');
    var nextBtn = dialog.querySelector('.icon-btn--next');
    var index = 0;
    var opener = null;

    function show(i) {
      var list = openable();
      if (!list.length) return;

      index = (i + list.length) % list.length;
      var btn = list[index];
      var thumb = btn.querySelector('img');

      image.src = btn.getAttribute('data-large') || (thumb ? thumb.src : '');
      image.alt = thumb ? thumb.alt : '';
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        show(openable().indexOf(btn));
        dialog.showModal();
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        show(index - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        show(index + 1);
      });
    }

    var closeBtn = dialog.querySelector('[data-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        dialog.close();
      });
    }

    dialog.addEventListener('keydown', function (event) {
      /* In RTL the arrow keys keep their visual meaning: left goes left. */
      var rtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (event.key === 'ArrowRight') show(index + (rtl ? -1 : 1));
      else if (event.key === 'ArrowLeft') show(index + (rtl ? 1 : -1));
    });

    /* A click landing on the dialog itself is a click on the backdrop. */
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', function () {
      image.removeAttribute('src');
      if (opener) opener.focus();
    });
  }

  /* ------------------------------------------------------------------
     Small things
     ------------------------------------------------------------------ */

  function initYear() {
    var slot = document.getElementById('year');
    if (slot) slot.textContent = String(new Date().getFullYear());
  }

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    initTheme();
    initLangToggle();
    initNav();
    initReveal();
    initCurrentSection();
    initGalleryImages();
    initLightbox();
    initYear();
  });
})();
