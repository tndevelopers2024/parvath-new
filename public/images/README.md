# Image assets

## What is here now

`plate-*.svg` are **placeholders**, not final artwork. They are generated
architectural plates — nested Indo-Islamic arches receding toward warm light —
in the site palette. They exist so that the layout, framing and motion can be
judged accurately before real photography is commissioned, and so that nothing
on the site is a grey box.

| File | Used by | Aspect |
| --- | --- | --- |
| `plate-hero-wide.svg` | Home hero — full-bleed background | 16:9 landscape |
| `plate-hero.svg` | Unused since the hero moved to a full-bleed photo treatment; kept for reference | 4:5 portrait |
| `plate-founder.svg` | Founder sections (Home, About) | 4:5 portrait |
| `plate-business.svg` | Business-owner section | 3:2 landscape |
| `plate-consultation.svg` | About page | 4:3 landscape |
| `plate-legacy.svg` | Service detail pages | 3:2 landscape |

### The hero is a special case

Unlike every other image on the site, `plate-hero-wide.svg` is rendered as a
plain, unframed `<img>` filling the section (`object-cover`, no aspect-ratio
box, no gold frame) with a forest-green scrim on top for text legibility —
not through `<EditorialImage>`. Below the `lg` breakpoint the scrim is a
uniform wash; from `lg` up it's a left-to-right gradient that fades out so the
photo reads clearly beside the copy. Both were tuned by sampling the actual
composited pixel colours behind each piece of text (not eyeballed) so every
element clears WCAG AA at every breakpoint — if you swap in a real photograph,
re-check contrast, since a busier photo can sit lighter or darker under the
same scrim than this abstract plate does.

## Replacing them with real photography

1. Drop the real file into this folder, keeping the aspect ratio in the table
   above (e.g. `hero-advisor.jpg` at 16:9 for the hero, 4:5 for a portrait
   slot).
2. Point `src/data/images.js` at the new file and update its `alt` text. That
   file is the only place image paths are declared.
3. Set `placeholder: false` on that entry. This removes the small
   "Placeholder imagery" marker that currently renders over each image.
4. For the hero specifically, also re-run the contrast check described above
   against the new photo before shipping it.

Export at roughly 2x the largest rendered size — the hero renders at about
560px wide on a 1440px screen, so a 1120px-wide source is enough. Prefer
`.webp` or a well-compressed `.jpg` over PNG for photographs.

## Art direction for the real photography

Warm natural light, neutral tones, editorial composition, authentic Indian
representation. Subjects: business owners, families, professionals, advisor–
client conversations, elegant offices, intergenerational moments, restrained
Indian architecture.

Avoid: handshake stock shots, people pointing at charts, invented financial
graphs, currency, generic corporate group photos, smiling-at-camera stock.
