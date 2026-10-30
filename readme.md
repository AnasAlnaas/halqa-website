# halqa.ly

A static, bilingual (English / Arabic) site for Halqa. No build step, no
framework, no CDN — you can open `index.html` in a browser and it works.

---

## Before you publish

**1. Prices — live.** $10 per lesson one-to-one and $6 per student in a group,
for lessons booked directly. Both numbers live in `window.HALQA_PRICES` at the
bottom of `js/i18n.js`. Each course card says which formats it offers with
`data-formats="private group"` in `index.html`. If you change a price, also
update the FAQ answer (`faq.aPrice`, both languages), the `offers` in the
JSON-LD block at the top of `index.html`, and the English fallback prices
written in `index.html`. Preply shows its own (higher) rate on its site; the
FAQ says so, so nobody is surprised.

**Numbers from Preply — one place, one section.** The rating, lesson count
and review count come from `window.HALQA_STATS` in `js/i18n.js`, and appear
only in the Reviews section (its heading and the Preply card) — on purpose,
so they are not repeated around the page. "300+ students" and "5 courses" in
the strip under the hero come from the same place.
Preply cannot be read automatically, so copy them across by hand every month
or two. `index.html` also has them as plain text for Google; search for the
old number there too.

**2. Preply link — done.** Both Preply buttons now point at
`https://preply.in/ANAS6EN29906995102?ts=17866532`. If it ever changes, it lives
in one place, `window.HALQA_CONTACT` in `js/i18n.js`, plus a plain fallback
`href` in `index.html` for visitors with JavaScript off.

**3. The Seerah timetable — settled, nothing to do.** No day or time appears
anywhere on the site. The Seerah card says a weekly session and that you will
send a suitable time when someone messages you, which is how you work.

**4. The Prophetic Day date — "opening soon".** No date anywhere. When the
date is fixed, change `now.soonBadge`, `now.dayP1`, `now.lede` and
`course.day.m3` in `js/i18n.js` (both languages), the same English text in
`index.html`, and add a `startDate` to the Prophetic Day course in the JSON-LD.

**5. Photos — six in place.** The five from the old site, plus the Sirah session
screenshot leading the gallery as a double-width tile at its full 2.08:1 (a 4:3
crop would have cut a third of it away). The original PNG was 1.9 MB; the site
serves a 111 KB WebP tile and a 171 KB full-size copy for the lightbox.

To add more, see `IMAGES.md` — including the rules for wide tiles, which are
fussier than ordinary photos.

---

## Claims you have approved

Confirmed by you, and safe to leave on the page: the **first lesson is free**,
**catch-up notes** for a missed group session, **material sent after each
session**, and lessons on **Google Meet or the Preply classroom** only.

Still my assumption rather than your word, so worth a glance: lesson lengths of
45–60 minutes for adults and 30–45 for children, the 6–14 age range on the
recitation course, parents being welcome to sit in on first lessons, and
"usually replies within a few hours". All of them are in `js/i18n.js`.

Also worth a look before publishing: I wrote the Arabic translations, and you
are a native Arabic teacher. Read through the `ar` block in `js/i18n.js` and fix
anything that does not sound like you. Nothing in the layout depends on the
length of the words.

---

## Where everything is

```
index.html          The whole page. All English text lives here.
404.html            Shown for a bad URL.
css/styles.css      All styling. Hand-written, commented by section.
js/i18n.js          Every string in English and Arabic + your contact details
                    + prices. This is the file you will edit most.
js/main.js          Language switching, menu, gallery lightbox, scroll fades.
images/             Photos. See IMAGES.md for the naming rules.
fonts/              Inter, Source Serif 4, Amiri, Noto Sans Arabic (self-hosted).
favicon.svg         Your logo mark, used as the browser icon.
apple-touch-icon.png, icon-192.png, icon-512.png, site.webmanifest
robots.txt, sitemap.xml     So Google can index the site properly.
netlify.toml        Caching and security headers (git deploys only).
```

## Editing text

English text is in `index.html`. Arabic text is in `js/i18n.js`.

Each element that can be translated carries a key:

```html
<h2 data-i18n="courses.title">Courses</h2>
```

To change that heading in both languages you edit the English **in the HTML**,
and the `'courses.title'` line in **both** the `en` and `ar` blocks of
`js/i18n.js`. The English is duplicated in both places on purpose: the page
must read correctly before any JavaScript runs, otherwise Google and WhatsApp
link previews see an empty page.

If the two ever disagree, `js/i18n.js` wins once the page has loaded.

## Changing your phone number or Telegram handle

One place only — the top of `window.HALQA_CONTACT` in `js/i18n.js`. Every
WhatsApp button on the page is rebuilt from it, with the message pre-filled in
whichever language the visitor is reading.

The `href` written in the HTML is a fallback for visitors with JavaScript
disabled, so if you change the number, search `index.html` for the old number
and replace it there too.

## Deploying

**After changing the CSS or JavaScript,** change the `?v=` stamp on the
stylesheet and script links in `index.html` (and the stylesheet in `404.html`)
to today's date. Browsers keep those files for an hour; without a new stamp a
returning visitor can get the new page with the old styles.

Same Netlify site as before, so the domain and HTTPS carry over.

**Drag and drop:** open your Netlify dashboard → the halqa site → Deploys →
drag this whole folder onto the drop area. Live in about thirty seconds.

**Git:** commit the folder and connect the repo. Publish directory is `.`.
This route also applies `netlify.toml`, which sets the caching and security
headers — worth having, but not worth blocking a deploy over.

To check it locally first, just double-click `index.html`.

---

## Notes on how it is built

Things worth knowing if you or someone else changes this later.

**No Tailwind CDN.** The old site loaded `cdn.tailwindcss.com`, which is a
compiler that runs in the visitor's browser on every page view and prints a
"not for production" warning to the console. The CSS here is written directly.

**No Font Awesome.** The icons are an inline SVG sprite at the top of the body —
about 4 KB for all of them, instead of a ~100 KB stylesheet for twelve glyphs.
Add one by adding a `<symbol>`.

**Fonts are self-hosted** in `fonts/`. Nothing is requested from Google at
runtime. The two Arabic fonts carry a `unicode-range`, so an English visitor
never downloads them — they arrive only when Arabic letters actually render on
the page.

**RTL is done with logical properties** — `margin-inline-start`, `padding-inline`,
`inset-inline-end` — never `left` or `right`. That is why the Arabic layout
mirrors correctly with no separate stylesheet. If you add CSS, keep to logical
properties or the Arabic version will break in that one spot.

**Light and dark mode are one block of tokens.** The sun/moon button in the
header switches them, and the choice is remembered. With nothing chosen the site
follows the visitor's phone or computer setting.

Everything lives in the `:root[data-theme='dark']` block near the top of
`css/styles.css` — about forty colour values. Not one rule below that block
knows which theme is on, which is exactly why the two cannot drift apart. If you
add a colour, add it as a token there too, and **never** hardcode a colour like
`#fff` in a rule: that is the one thing that breaks dark mode.

One thing that will look odd until you know why: in dark mode the brand scale
**inverts** — `--brand-50` becomes the darkest teal and `--brand-900` the
lightest. That is deliberate. It means a rule like "dark text on a pale teal
chip" becomes "pale text on a dark teal chip" automatically, without being
touched. The contact band and the footer are dark in *both* themes, so they were
given their own tokens (`--contact-from`, `--footer-bg`) rather than borrowing
from a scale that flips underneath them.

**The header breakpoint is written as `not all and (min-width: 980px)`**, not
`max-width: 979px`. On a screen with a fractional pixel ratio the CSS viewport
can land on something like 979.33px, which is inside neither `max-width: 979px`
nor `min-width: 980px` — the navigation ends up in a state that matches no rule.
The `not all` form is the exact complement, so no gap can exist. `js/main.js`
tests the same query for the same reason.

**Animations.** All in `css/styles.css` (section 17) and `js/main.js`:

- the hero headline types out `hero.typedWords` from `js/i18n.js`, while the
  full sentence stays in the `<h1>` for Google and screen readers;
- Arabic words with class `ink-write` (the hero حَلْقَة and the word on each
  course card) write themselves in from right to left;
- the ring of dots behind the portrait is the halqa, turning once every two
  minutes;
- numbers marked `data-stat` count up the first time they appear;
- the example chat in "How it works" replays itself while it is on screen
  (its words are `chat.*` in `js/i18n.js`);
- cards, steps, reviews and photos arrive one after another (`.stagger`).

The looping ones (typing, chat) pause when they are off screen or the tab is
hidden. Anyone with "reduce motion" switched on gets the finished, still page.

**The scroll fade-ins are scoped to `html.js`.** If JavaScript fails, nothing is
stuck invisible — the page just appears without animation. Anyone who has
"reduce motion" switched on in their system settings sees no animation at all.

**Accessibility things not to undo:** the page can be pinch-zoomed (the old one
blocked it), the menu button reports its state with `aria-expanded`, and the text
colours were picked to pass WCAG AA contrast against their backgrounds — in both
themes. The teal `#006071` is from your logo file.

**The gallery photos carry no visible captions**, as you asked. They still have
`alt` text, which is not a caption: it is invisible on screen, and exists for
blind visitors and for Google. Please do keep it filled in when you add photos.
