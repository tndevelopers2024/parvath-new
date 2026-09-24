import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/motion'
import { JaaliField } from './Ornaments'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const sectionLabels = {
  about: 'About',
  services: 'Services',
  calculators: 'Calculators',
  approach: 'Approach',
  insights: 'Blogs',
  blogs: 'Blogs',
  contact: 'Contact',
}

/** "wealth-creation" → "Wealth Creation" — used only when no `crumb` is given. */
const titleCase = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

/** Home › Section › Page, derived from the URL. The last crumb is the current page. */
function Breadcrumbs({ crumb }) {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)
  const trail = [
    { label: 'Home', to: '/' },
    ...segments.map((seg, i) => ({
      label: i === segments.length - 1 && crumb ? crumb : sectionLabels[seg] ?? titleCase(seg),
      to: `/${segments.slice(0, i + 1).join('/')}`,
    })),
  ]

  return (
    <Reveal y={10} duration={0.6}>
      <nav aria-label="Breadcrumb" className="mb-5 flex justify-center">
        <ol className="flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-ivory/15 bg-ivory/5 px-4 py-1.5 text-[0.6875rem] tracking-[0.08em] text-ivory/60 backdrop-blur-sm">
          {trail.map((item, i) => {
            const last = i === trail.length - 1
            return (
              <li key={item.to} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight aria-hidden="true" className="h-3 w-3 text-gold-soft/60" strokeWidth={1.75} />}
                {last ? (
                  <span aria-current="page" className="text-gold-soft">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.to} className="transition-colors duration-300 hover:text-ivory">
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </Reveal>
  )
}

// Ridge echoing the logo: peaks across the width, and a rising growth line above.
const RIDGE =
  'M0 120 L0 96 L150 70 L250 86 L400 38 L520 72 L640 50 L760 84 L900 30 L1020 66 L1120 52 L1260 80 L1360 60 L1440 74 L1440 120 Z'
const RIDGE_LINE =
  'M0 96 L150 70 L250 86 L400 38 L520 72 L640 50 L760 84 L900 30 L1020 66 L1120 52 L1260 80 L1360 60 L1440 74'
const GROWTH = 'M0 78 L180 58 L300 70 L470 22 L600 46 L760 34 L880 12'

/** The mountain ridge along the header's foot. Draws in once, then the growth line keeps flowing. */
function Ridge() {
  const reduced = useReducedMotion()
  const draw = (delay) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0 },
          animate: { pathLength: 1 },
          transition: { duration: 1.8, ease: EASE, delay },
        }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-12 w-full sm:h-14 lg:h-16"
    >
      <path d={RIDGE} fill="rgb(12 36 30 / 0.55)" />
      <motion.path
        d={RIDGE_LINE}
        fill="none"
        stroke="#a98842"
        strokeOpacity="0.7"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
        {...draw(0.3)}
      />
      <motion.path
        d={GROWTH}
        fill="none"
        stroke="#e4d2a6"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeDasharray="6 8"
        vectorEffect="non-scaling-stroke"
        className="animate-dash-flow motion-reduce:animate-none"
        initial={reduced ? false : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.2 }}
      />
    </svg>
  )
}

/**
 * Masthead for every page other than Home: a compact forest band carrying the
 * breadcrumb trail, the page title and its lede. Behind it a lattice drifts,
 * two soft lights wander, and a gold mountain ridge (after the logo) draws
 * along the foot with a growth line flowing above it.
 *
 * `crumb` names the current page in the breadcrumb when the title is a
 * sentence or the slug doesn't read well (service and calculator pages).
 * Children render under the lede — keep them styled for a dark ground.
 */
export default function PageHeader({ eyebrow, title, lede, crumb, children }) {
  return (
    <section
      data-cursor-theme="dark"
      className="relative isolate overflow-hidden bg-forest pt-28 pb-14 sm:pt-32 sm:pb-18 lg:pt-36 lg:pb-20"
    >
      {/* Ambient layers */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(49_91_78/0.9),transparent_65%)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_75%)]">
          <div className="animate-drift absolute top-0 left-0 -right-[48px] -bottom-[48px] [--drift:48px]">
            <JaaliField opacity={0.1} scale={48} tone="#E4D2A6" />
          </div>
        </div>
        <span className="animate-wander absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-gold/20 blur-3xl motion-reduce:hidden" />
        <span className="animate-wander absolute top-10 right-[6%] h-80 w-80 rounded-full bg-forest-soft/80 blur-3xl [animation-delay:-9s] motion-reduce:hidden" />
      </div>

      <div className="shell relative">
        <Breadcrumbs crumb={crumb} />
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} level="h1" tone="light">
          {children}
        </SectionHeading>
      </div>

      <Ridge />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent"
      />
    </section>
  )
}
