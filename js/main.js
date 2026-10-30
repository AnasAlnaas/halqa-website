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
  var PRICES = window.HALQA_PRICES || {};
  var STATS = window.HALQA_STATS || {};
  var STORE_KEY = 'halqa:lang';
  var THEME_KEY = 'halqa:theme';
  var SUPPORTED = ['en', 'ar'];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var darkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  /* Strings may carry {rating}, {lessons}, {reviews} or {students}; those are
     filled from HALQA_STATS so a number only ever lives in one place. Any
     other {placeholder} is left alone for the caller to fill. */
  function fill(value) {
    if (typeof value !== 'string') return value;
    return value.replace(/\{(\w+)\}/g, function (match, name) {
      return has(STATS, name) ? String(STATS[name]) : match;
    });
  }

  function t(key, lang) {
    var table = DICT[lang] || DICT.en || {};
    return has(table, key) ? fill(table[key]) : null;
  }

  function currentLang() {
    return document.documentElement.getAttribute('lang') || 'en';
  }

  /* Runs onChange(true/false) as an element comes on and off screen, and
     treats a hidden browser tab as off screen. The looping animations use it
     so they only spend effort while someone can actually see them. */
  function watchVisibility(el, onChange) {
    var onScreen = false;
    var report = function () {
      onChange(onScreen && !document.hidden);
    };

    new IntersectionObserver(function (entries) {
      onScreen = entries[entries.length - 1].isIntersecting;
      report();
    }).observe(el);

    document.addEventListener('visibilitychange', report);
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

  /* Prices come from HALQA_PRICES at the bottom of i18n.js: one private rate
     and one group rate. A course card lists the formats it offers in
     data-formats; a card offering a group shows "From <group rate>" with the
     private rate underneath, a private-only card shows the private rate. */
  function money(amount) {
    return (PRICES.currency || '$') + amount;
  }

  function priceFor(kind) {
    return PRICES[kind] === null || PRICES[kind] === undefined ? null : PRICES[kind];
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function applyPrices(lang) {
    var slots = document.querySelectorAll('[data-formats]');

    for (var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      var formats = slot.getAttribute('data-formats').split(/\s+/);
      var group = formats.indexOf('group') !== -1 ? priceFor('group') : null;
      var priv = formats.indexOf('private') !== -1 ? priceFor('private') : null;

      slot.textContent = '';

      if (group === null && priv === null) {
        slot.textContent = t('price.ask', lang) || 'Pricing on request';
        continue;
      }

      var main = el('span', 'price__main');
      if (group !== null) main.appendChild(el('span', null, t('price.from', lang)));
      main.appendChild(el('strong', null, money(group !== null ? group : priv)));
      main.appendChild(document.createTextNode(' '));
      main.appendChild(el('span', null, t('price.perLesson', lang)));
      slot.appendChild(main);

      var sub = null;
      if (group !== null && priv !== null) {
        sub = (t('price.privateLine', lang) || '').replace('{price}', money(priv));
      } else if (group === null) {
        sub = t('price.privateOnly', lang);
      }
      if (sub) slot.appendChild(el('span', 'price__sub', sub));
    }

    /* The large tags in the "Groups & private" panels */
    var tags = document.querySelectorAll('[data-price]');
    for (var j = 0; j < tags.length; j++) {
      var tag = tags[j];
      var kind = tag.getAttribute('data-price');
      var amount = priceFor(kind);

      tag.hidden = amount === null;
      if (amount === null) continue;

      tag.textContent = '';
      tag.appendChild(el('strong', null, money(amount)));
      tag.appendChild(document.createTextNode(' '));
      tag.appendChild(
        el('span', null, t(kind === 'group' ? 'price.perStudent' : 'price.perLesson', lang))
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

    /* The typed headline and the example chat rebuild themselves on this */
    document.dispatchEvent(new CustomEvent('halqa:lang', { detail: lang }));
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

    /* Stagger: --i is each item's place in its row, and the CSS turns it into
       a delay, so a row of cards arrives one after another instead of all at
       once. Inside a .stagger block the children are numbered instead. */
    for (var s = 0; s < items.length; s++) {
      var item = items[s];
      if (item.parentElement && item.parentElement.classList.contains('grid')) {
        var siblings = item.parentElement.querySelectorAll(':scope > .reveal');
        item.style.setProperty('--i', Array.prototype.indexOf.call(siblings, item) % 3);
      }
      if (item.classList.contains('stagger')) {
        for (var c = 0; c < item.children.length; c++) {
          item.children[c].style.setProperty('--i', c);
        }
      }
    }

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
     Numbers from HALQA_STATS, counting up from zero
     The HTML already holds the real numbers, so Google and visitors without
     JavaScript see them. Here they are refreshed from HALQA_STATS and, when
     motion is allowed, wound back to zero and counted up the first time
     each one comes into view. data-static skips the count.
     ------------------------------------------------------------------ */

  function initStats() {
    var nodes = document.querySelectorAll('[data-stat]');
    var animate =
      !reduceMotion.matches &&
      'IntersectionObserver' in window &&
      'requestAnimationFrame' in window;

    var observer =
      animate &&
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            countUp(entry.target);
          });
        },
        { threshold: 0.6 }
      );

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var key = node.getAttribute('data-stat');
      var suffix = node.getAttribute('data-suffix') || '';
      var value = has(STATS, key) ? String(STATS[key]) : node.textContent.replace(suffix, '');

      node.textContent = value + suffix;
      if (!animate || node.hasAttribute('data-static') || isNaN(parseFloat(value))) continue;

      node.textContent = format(0, value) + suffix;
      observer.observe(node);
    }

    /* Keeps the decimals of the target: "5.0" counts 0.0, 0.1 ... 5.0 */
    function format(n, target) {
      var decimals = (target.split('.')[1] || '').length;
      return n.toFixed(decimals);
    }

    function countUp(node) {
      var key = node.getAttribute('data-stat');
      var suffix = node.getAttribute('data-suffix') || '';
      var target = has(STATS, key) ? String(STATS[key]) : '0';
      var end = parseFloat(target);
      var duration = 1600;
      var start = null;

      function frame(now) {
        if (start === null) start = now;
        var p = Math.min(1, (now - start) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = (p < 1 ? format(end * eased, target) : target) + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }

      requestAnimationFrame(frame);
    }
  }

  /* ------------------------------------------------------------------
     Typed headline: "Learn ___ with a teacher beside you"
     The blank types out, holds, deletes and types the next word, looping
     through hero.typedWords for as long as the hero is on screen. The full
     sentence stays in the h1 for Google and screen readers; only the eye
     sees the typed version.
     ------------------------------------------------------------------ */

  function initTyper() {
    var title = document.querySelector('.hero__title');
    var typed = title && title.querySelector('.hero__typed');
    var out = typed && typed.querySelector('.typer__text');
    if (!out || reduceMotion.matches || !('IntersectionObserver' in window)) return;

    var words = [];
    var index = 0;
    var chars = [];
    var shown = 0;
    var mode = 'hold';
    var timer = null;
    var visible = false;

    function load() {
      var list = t('hero.typedWords', currentLang());
      words = Array.isArray(list) && list.length ? list : [];
      index = 0;
      chars = Array.from(words[0] || '');
      shown = chars.length;
      out.textContent = words[0] || '';
      mode = 'hold';
    }

    function tick() {
      timer = null;
      if (!visible || words.length < 2) return;
      var delay;

      if (mode === 'hold') {
        mode = 'delete';
        delay = 2600;
      } else if (mode === 'delete') {
        if (shown > 0) {
          shown -= 1;
          out.textContent = chars.slice(0, shown).join('');
          delay = 40;
        } else {
          index = (index + 1) % words.length;
          chars = Array.from(words[index]);
          mode = 'type';
          delay = 380;
        }
      } else if (shown < chars.length) {
        shown += 1;
        out.textContent = chars.slice(0, shown).join('');
        delay = 80 + Math.random() * 60;
      } else {
        mode = 'hold';
        delay = 0;
      }

      timer = setTimeout(tick, delay);
    }

    function restart() {
      clearTimeout(timer);
      timer = null;
      load();
      if (visible) tick();
    }

    load();
    title.classList.add('is-typing');
    typed.hidden = false;

    watchVisibility(title, function (isVisible) {
      visible = isVisible;
      if (visible && !timer) tick();
      if (!visible) {
        clearTimeout(timer);
        timer = null;
      }
    });

    document.addEventListener('halqa:lang', restart);
  }

  /* ------------------------------------------------------------------
     Example chat in "How it works"
     A list of steps — type a character, send, show "typing…", reply — each
     with a pause after it. It plays while the chat is on screen, picks up
     where it stopped when it comes back, and loops with a fade between
     rounds. The words are chat.m1–m4 in i18n.js.
     ------------------------------------------------------------------ */

  function initChat() {
    var chat = document.querySelector('.chat');
    if (!chat || reduceMotion.matches || !('IntersectionObserver' in window)) return;

    var log = chat.querySelector('.chat__log');
    var input = chat.querySelector('.chat__input');
    var inputText = chat.querySelector('.chat__input-text');
    var status = chat.querySelector('.chat__status');
    var SCRIPT = [
      ['me', 'chat.m1'],
      ['them', 'chat.m2'],
      ['me', 'chat.m3'],
      ['them', 'chat.m4']
    ];

    var steps = [];
    var step = 0;
    var timer = null;
    var visible = false;

    function say(key) {
      status.textContent = t(key, currentLang()) || '';
    }

    function bubble(side, text) {
      var msg = el('p', 'chat__msg chat__msg--' + side + ' is-new', text);
      log.appendChild(msg);
      return msg;
    }

    function build() {
      var list = [];
      var add = function (fn, wait) {
        list.push({ fn: fn, wait: wait });
      };

      add(function () {
        log.textContent = '';
        log.classList.remove('is-fading');
        inputText.textContent = '';
        input.classList.remove('is-typing');
        say('chat.online');
      }, 900);

      SCRIPT.forEach(function (line) {
        var text = t(line[1], currentLang()) || '';

        if (line[0] === 'me') {
          add(function () {
            input.classList.add('is-typing');
          }, 250);

          Array.from(text).forEach(function (ch) {
            add(function () {
              inputText.textContent += ch;
            }, /[\s.,!?،؟]/.test(ch) ? 90 : 42);
          });

          add(null, 450);
          add(function () {
            inputText.textContent = '';
            input.classList.remove('is-typing');
            bubble('me', text);
          }, 1000);
        } else {
          var dots = null;
          add(function () {
            say('chat.typing');
            dots = bubble('them chat__typing', '');
            dots.innerHTML = '<i></i><i></i><i></i>';
          }, Math.min(2600, 900 + text.length * 14));

          add(function () {
            if (dots) dots.remove();
            say('chat.online');
            bubble('them', text);
          }, 1200 + text.length * 24);
        }
      });

      add(null, 4500);
      add(function () {
        log.classList.add('is-fading');
      }, 700);

      return list;
    }

    function next() {
      timer = null;
      if (!visible) return;
      if (step >= steps.length) {
        steps = build();
        step = 0;
      }
      var current = steps[step++];
      if (current.fn) current.fn();
      timer = setTimeout(next, current.wait);
    }

    function restart() {
      clearTimeout(timer);
      timer = null;
      steps = build();
      step = 0;
      if (visible) next();
    }

    chat.classList.add('is-animated');
    log.textContent = '';
    steps = build();

    watchVisibility(chat, function (isVisible) {
      visible = isVisible;
      if (visible && !timer) next();
      if (!visible) {
        clearTimeout(timer);
        timer = null;
      }
    });

    document.addEventListener('halqa:lang', restart);
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
    initStats();
    initTyper();
    initChat();
    initYear();
  });
})();
