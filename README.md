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
| Address | `site.location` | Published office address |

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
to `/index.html` or every route except `/` will 404 on refresh. `public/.htaccess`
does this on Hostinger.

`public/` also carries `robots.txt`, `sitemap.xml` and the Open Graph image.
Update the `site.url` in `src/data/site.js` and the URLs in `sitemap.xml`,
`robots.txt` and `index.html` if the domain ever changes.

## Enquiry email

The contact form and welcome popup submit to `/api/enquiry`. Both forms send
each submission to `varalakshmi@parvathfinserv.com` and
`contact@parvathfinserv.com` through `smtp.hostinger.com` (TLS, port 465). The
visitor's email, when provided, is set as Reply-To.

The route has two implementations which must stay in step:

- `public/api/enquiry.php` runs in production on Hostinger.
- `api/enquiry.js` runs inside the Vite dev server for local work.

`npm test` fails if their recipients or interest options differ.

Mail settings:

- Local development: copy `.env.example` to `.env.local`, fill in `SMTP_USER`
  (the full sending mailbox address) and `SMTP_PASSWORD`, and restart
  `npm run dev`.
- Production: copy `public/api/enquiry-config.example.php` to
  `public/api/enquiry-config.php` and fill in the same two values. The file is
  ignored by git and blocked by `.htaccess`; it is copied into `dist/api/` by
  the build.

## Deploying to Hostinger

1. Run `npm run verify`.
2. Upload the contents of `dist/` to `public_html`, including the hidden
   `.htaccess` files and the `api/` folder.
3. Check that `public_html/api/enquiry-config.php` exists on the server.
4. In hPanel, keep PHP at 7.4 or newer and turn on "Force HTTPS".

`public/.htaccess` sends every page path to `index.html`, redirects `www` to
the bare domain, routes `/api/enquiry` to the PHP file and sets the security
and caching headers. `vercel.json` is the equivalent for a Vercel deployment
and is not used on Hostinger.

## Checks

- `npm test` runs the calculator maths and enquiry endpoint tests. The endpoint
  tests use a stub mail transport, so no email is sent.
- `npm run check:routes` server-renders every sitemap route and the 404 page,
  and fails on a render error, a missing image or a page without exactly one H1.
- `npm run verify` runs lint, tests, the route check and the production build.
  Run it before deploying.
