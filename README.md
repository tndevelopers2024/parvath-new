# Parvath Life and Legacy Advisors

Marketing site for Parvath Life and Legacy Advisors — a boutique financial planning
and wealth advisory practice founded by K Sridhar and Varalakshmi Sridhar.

React + Vite + Tailwind CSS v4, with Motion for animation and Lucide for icons.
Light theme only; there is no dark mode and none should be added.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint
```

## Where things live

```
src/
├── data/
│   ├── site.js       # every piece of copy and all company facts
│   └── images.js     # every image path, alt text and aspect ratio
├── components/       # Navbar, Hero, sections, Footer, primitives
├── pages/            # one file per route
└── lib/motion.js     # the shared easing curve and viewport trigger
```

**`src/data/site.js` is the single source of truth for content.** Services,
process steps, pillars, insights, navigation, the disclaimer and the structured
data all come from there. Changing copy should almost never mean touching a
component.

## Content rules

Nothing on this site asserts a fact that has not been verified. There are no
awards, certifications, registrations, licences, assets under management,
return figures or rankings anywhere in the copy, and none should be added
without a source.

Everything still awaiting real content is marked `PLACEHOLDER` and is visible
as such on the page, not silently faked:

| What | Where | Shown as |
| --- | --- | --- |
| Client testimonials | `testimonials` in `src/data/site.js` | A labelled notice under the quote |
| Photography | `public/images/*.svg` | A "Placeholder imagery" marker on each plate |
| Founder portrait | `images.founder` | A caption under the image |
| Insight articles | `insights` in `src/data/site.js` | "Article in preparation" on each card |
| Regulatory disclosure | `disclaimer` in `src/data/site.js` | Inline in the footer text |
| Address | `site.location` | Currently city-level only |

See `public/images/README.md` for how to swap the placeholder plates for real
photography and for the art direction to brief a photographer against.

## Design system

Tokens live in `@theme` at the top of `src/index.css`.

| Token | Value | Use | Contrast on ivory |
| --- | --- | --- | --- |
| `ivory` | `#F8F6F0` | Primary background | — |
| `cream` | `#F7F4EC` | Alternating sections | — |
| `charcoal` | `#242522` | Body text | 14.6:1 |
| `forest` | `#173F35` | Headings, primary buttons, the closing CTA | 10.9:1 |
| `forest-soft` | `#315B4E` | Button hover | — |
| `gold` | `#A98842` | Rules, borders, diamonds — **decoration only** | 3.1:1 |
| `gold-ink` | `#7C5C20` | Gold **text** | 5.7:1 |
| `gold-soft` | `#E4D2A6` | Gold text **on forest** | 7.8:1 on forest |
| `line` | `#CEC6B2` | Hairlines | 1.6:1 |
| `muted` | `#4F4F46` | Secondary body text | 7.7:1 |

Two rules govern the palette.

**Gold never carries text.** The decorative gold is 3.1:1 on ivory — enough for
a rule or a border to read, not enough to be legible as type. Anything readable
that should look gold uses `gold-ink` on light grounds (5.7:1 on ivory, 5.3:1
on cream) or `gold-soft` on the forest CTA (7.8:1).

**Secondary text stays well clear of the minimum.** `muted` carries nearly all
the body copy at 7.7:1 rather than sitting just over the 4.5:1 floor, because a
warm ivory ground makes light greys read as washed out long before they fail an
automated check.

Every text/background pair on the site is audited against WCAG AA; all pass.

Type is Cormorant Garamond for display and Inter for body. Cormorant defaults
to old-style figures, so `font-variant-numeric: lining-nums` is set on `body`
to keep numerals and phone numbers legible.

## Motion

One easing curve (`EASE` in `src/lib/motion.js`), durations between 0.4s and
1.0s, short travel, no bounce or parallax. Reveals fire once via
`whileInView`.

`prefers-reduced-motion` is honoured in two places: every motion component
takes a `useReducedMotion()` branch that renders the final state directly, and
`src/index.css` collapses CSS transitions. The site reads correctly with motion
fully disabled.

Note for anyone editing `EditorialImage`: the clip-path wipe is deliberately on
an **inner** element. An element clipped to `inset(0 0 100% 0)` has no visible
area, so an IntersectionObserver watching it would never fire and the reveal
would deadlock.

## Deployment

The app uses client-side routing, so any static host must rewrite unknown paths
to `/index.html` or every route except `/` will 404 on refresh. `vercel.json`
does this for Vercel; on another host configure the equivalent SPA fallback.

`public/` also carries `robots.txt`, `sitemap.xml` and the Open Graph image.
Update the `site.url` in `src/data/site.js` and the URLs in `sitemap.xml`,
`robots.txt` and `index.html` when the real domain is known.
