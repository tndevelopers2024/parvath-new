import { Link, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Calculator, Compass, Layers, Mail, Phone } from 'lucide-react'
import Seo from '../components/Seo'
import Button from '../components/Button'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { JaaliField } from '../components/Ornaments'
import { site } from '../data/site'
import { EASE } from '../lib/motion'

const destinations = [
  {
    to: '/services',
    label: 'Services',
    body: 'Eight areas of planning, approached as one.',
    icon: Layers,
  },
  {
    to: '/calculators',
    label: 'Calculators',
    body: 'Run the numbers on SIPs, retirement and goals.',
    icon: Calculator,
  },
  {
    to: '/about',
    label: 'About Parvath',
    body: 'The practice, the journey, and what to expect.',
    icon: Compass,
  },
  {
    to: '/contact',
    label: 'Contact',
    body: 'Speak to the advisory desk directly.',
    icon: Mail,
  },
]

/**
 * The "0" of 404: the brand seal with a compass needle that has lost its
 * bearing and keeps searching for north.
 */
function LostCompass() {
  const reduced = useReducedMotion()

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      className="mx-[0.02em] inline-block h-[0.78em] w-[0.78em] self-center"
    >
      <circle cx="60" cy="60" r="56" fill="none" stroke="#A98842" strokeOpacity="0.7" strokeWidth="1.25" />
      <circle
        cx="60"
        cy="60"
        r="47"
        fill="none"
        stroke="#A98842"
        strokeOpacity="0.45"
        strokeWidth="0.75"
        strokeDasharray="1.5 4"
      />
      <path d="M60 22 L98 60 L60 98 L22 60 Z" fill="none" stroke="#173F35" strokeOpacity="0.18" strokeWidth="1" />
      {['N', 'E', 'S', 'W'].map((point, i) => {
        const [x, y] = [
          [60, 16],
          [104, 60],
          [60, 104],
          [16, 60],
        ][i]
        return (
          <text
            key={point}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#7C5C20"
            fontFamily="Roboto, sans-serif"
            fontSize="7"
            fontWeight="500"
            letterSpacing="0.5"
          >
            {point}
          </text>
        )
      })}

      <motion.g
        // The needle's bounding box is centred on the pivot, so 50% = (60, 60)
        style={{ originX: 0.5, originY: 0.5 }}
        initial={{ rotate: 38 }}
        animate={
          reduced
            ? { rotate: 38 }
            : { rotate: [38, -24, 52, -8, 71, 18, 38] }
        }
        transition={
          reduced ? { duration: 0 } : { duration: 9, ease: EASE, repeat: Infinity, repeatType: 'loop' }
        }
      >
        <path d="M60 26 L66 60 L54 60 Z" fill="#173F35" />
        <path d="M60 94 L66 60 L54 60 Z" fill="#A98842" fillOpacity="0.55" />
      </motion.g>
      <circle cx="60" cy="60" r="3.5" fill="#FFFFFF" stroke="#A98842" strokeWidth="1.25" />
    </svg>
  )
}

export default function NotFound() {
  const { pathname } = useLocation()

  return (
    <>
      <Seo title="Page not found" path="/404" noindex />

      <section className="paper relative isolate overflow-hidden bg-cream pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
        {/* Lattice glow behind the numerals */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[46rem] [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_62%)]"
        >
          <JaaliField opacity={0.12} scale={52} />
        </div>

        <div className="shell">
          {/* 404 numerals */}
          <Reveal y={24} duration={0.9}>
            <p
              aria-hidden="true"
              className="flex items-center justify-center font-display text-[clamp(7rem,24vw,15rem)] leading-none font-semibold tracking-[-0.04em] text-transparent select-none [-webkit-text-stroke:1.5px_var(--color-gold)]"
            >
              <span>4</span>
              <LostCompass />
              <span>4</span>
            </p>
          </Reveal>

          <SectionHeading
            className="mt-8 sm:mt-10"
            level="h1"
            eyebrow="Error 404"
            title="You’ve Wandered Off the Plan"
            lede="Even the best plans take a wrong turn now and then. The page you were looking for has moved or no longer exists."
          >
            {pathname !== '/404' && (
              <Reveal y={12} delay={0.18}>
                <p className="mt-5 inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-[0.75rem] text-muted">
                  <span className="shrink-0 tracking-[0.12em] text-gold-ink uppercase">Not found</span>
                  <span aria-hidden="true" className="h-3 w-px bg-line" />
                  <code className="truncate font-mono text-forest">{pathname}</code>
                </p>
              </Reveal>
            )}

            <Reveal y={16} delay={0.24}>
              <div className="mt-9 flex flex-wrap justify-center gap-3 sm:gap-4">
                <Button to="/">Back to Home</Button>
                <Button to="/contact" variant="secondary" withArrow={false}>
                  Book a Consultation
                </Button>
              </div>
            </Reveal>
          </SectionHeading>

          {/* Where to go instead */}
          <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
            <Reveal y={12} className="flex items-center gap-4">
              <span className="h-px flex-1 bg-line" />
              <p className="eyebrow">Or pick up from here</p>
              <span className="h-px flex-1 bg-line" />
            </Reveal>

            <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
              {destinations.map(({ to, label, body, icon: Icon }) => (
                <RevealItem key={to} className="h-full">
                  <Link
                    to={to}
                    className="group relative flex h-full flex-col rounded-2xl border border-line/80 bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-card"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest transition-colors duration-300 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft">
                        <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-muted/60 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-ink"
                        strokeWidth={1.75}
                      />
                    </div>
                    <h2 className="mt-5 font-display text-[1.125rem] font-semibold text-forest">{label}</h2>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">{body}</p>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal y={10} delay={0.1}>
              <p className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.875rem] text-muted">
                <span>Still can’t find it?</span>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-1.5 font-medium text-forest transition-colors hover:text-gold-ink"
                >
                  <Phone aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {site.phoneDisplay}
                </a>
                <a
                  href={site.emailHref}
                  className="inline-flex items-center gap-1.5 font-medium text-forest transition-colors hover:text-gold-ink"
                >
                  <Mail aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
                  {site.email}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
