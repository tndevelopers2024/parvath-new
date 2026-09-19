import { ShieldCheck, Briefcase, Users } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE, viewportOnce } from '../lib/motion'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import CountUp from './CountUp'
import { founderStats, site } from '../data/site'
import { images } from '../data/images'
import { JaaliField } from './Ornaments'
import SectionHeading from './SectionHeading'

const commitments = [
  {
    Icon: ShieldCheck,
    title: 'Client-First Standard',
    body: 'Goal-based guidance that starts from your priorities, not from a product.',
  },
  {
    Icon: Briefcase,
    title: 'Corporate Insight',
    body: 'Practical understanding of business cashflows, risk shielding, and promoter continuity.',
  },
  {
    Icon: Users,
    title: 'Boutique Attention',
    body: 'A deliberately small clientele ensuring direct access to senior advisory at every review.',
  },
]

/**
 * Portrait plate. The gold frame settles in from an offset, then the photograph
 * wipes up from the bottom while easing out of a slight zoom.
 */
function Portrait() {
  const reduced = useReducedMotion()
  const play = reduced ? {} : { initial: 'hidden', whileInView: 'visible', viewport: viewportOnce }

  return (
    <motion.div className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none" {...play}>
      {/* Outer decorative gold frame */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2.5 -z-10 hidden rounded-3xl border border-gold/40 sm:block"
        variants={{
          hidden: { opacity: 0, x: -18, y: 18 },
          visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.1, ease: EASE, delay: 0.1 } },
        }}
      />

      {/* Card Container */}
      <div className="relative rounded-2xl border border-line/70 bg-gradient-to-b from-[#FAF8F5] to-white p-3.5 sm:p-4 shadow-[0_20px_50px_-24px_rgba(23,63,53,0.18)]">
        {/* Main image presentation */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-forest/5 ring-1 ring-line/60">
          <motion.div
            className="h-full w-full"
            variants={{
              hidden: { clipPath: 'inset(100% 0 0 0)' },
              visible: { clipPath: 'inset(0% 0 0 0)', transition: { duration: 1.2, ease: EASE, delay: 0.2 } },
            }}
          >
            <motion.img
              src={images.founder.src}
              alt="Varalakshmi Sridhar & K Sridhar, Founders of Parvath Life and Legacy Advisors"
              className="h-full w-full object-cover"
              loading="lazy"
              variants={{
                hidden: { scale: 1.18 },
                visible: { scale: 1, transition: { duration: 1.8, ease: EASE, delay: 0.2 } },
              }}
              whileHover={reduced ? undefined : { scale: 1.03, transition: { duration: 0.7, ease: EASE } }}
            />
          </motion.div>
        </div>
        <div className="mt-3.5 px-1 text-center sm:text-left">
          <p className="font-display text-base font-semibold text-forest">K Sridhar &amp; Varalakshmi Sridhar</p>
          <p className="text-[0.6875rem] font-medium tracking-wide text-gold-ink uppercase">Founders &ndash; Parvath Life and Legacy Advisors</p>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Enhanced Founder Profile Component:
 * Features executive presentation frame, monogram seal, verified credentials,
 * 3 core advisory commitments, elevated stat cards, and direct consultation CTAs.
 */
export default function AboutFounder({ className = '' }) {
  return (
    <section className={`relative overflow-hidden bg-ivory section ${className}`}>
      {/* Decorative subtle heritage jaali background accent in the corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-20 h-72 w-72 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)] lg:h-96 lg:w-96"
      >
        <JaaliField opacity={0.1} scale={40} />
      </div>

      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---- Left: Executive Portrait & Credentials Card ---- */}
          <div className="lg:col-span-5">
            <Portrait />
          </div>

          {/* ---- Right: Editorial Profile & Highlights ---- */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The Founders & Practice"
              title="Meet Our Founders"
            />

            {/* Editorial Profile Copy */}
            <Reveal y={16} delay={0.18}>
              <div className="mt-6 space-y-4">
                <div className="border-b border-line/60 pb-3 mb-2">
                  <p className="font-display text-2xl font-semibold text-forest">
                    K Sridhar &amp; Varalakshmi Sridhar
                  </p>
                  <p className="mt-1 text-xs font-medium tracking-[0.14em] text-gold-ink uppercase">
                    {site.founderRole}
                  </p>
                </div>
                <p className="lede">
                  We partner with business owners, professionals, and families to help them
                  create, grow, protect, and transfer wealth through structured financial
                  planning — across wealth creation, retirement planning, life insurance,
                  health insurance, bonds &amp; deposits, legacy planning, employee benefit
                  solutions, and group gratuity schemes.
                </p>
                <p className="lede">
                  With over 20 years of corporate advisory experience and 7+ years in financial advisory,
                  we have had the privilege of working alongside 200+ families and businesses
                  toward financial security and peace of mind. We are particularly drawn to working
                  with business owners, where personal wealth, business continuity, retirement
                  planning and family legacy are rarely separate conversations — and deserve to be
                  planned as one.
                </p>
              </div>
            </Reveal>

            {/* Three Core Advisory Commitments */}
            <RevealGroup className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6" stagger={0.12} delay={0.2}>
              {commitments.map(({ Icon, title, body }) => (
                <RevealItem key={title} className="group relative pt-3.5">
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line" />
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 h-px w-0 bg-gold transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
                  />
                  <div className="flex items-center gap-2 text-forest">
                    <Icon className="h-4 w-4 shrink-0 text-gold-ink transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                    <p className="text-xs font-semibold text-forest">{title}</p>
                  </div>
                  <p className="mt-1.5 text-[0.6875rem] text-muted leading-relaxed">{body}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Stats — a ledger, not cards: same "hairline, not a box" treatment as
                the site's other stat rows (see Stats.jsx). */}
            <RevealGroup as="div" className="mt-8 grid grid-cols-3" stagger={0.08}>
              {founderStats.map((stat, i) => (
                <RevealItem
                  key={stat.label}
                  className={i > 0 ? 'border-l border-line pl-4 sm:pl-6' : ''}
                >
                  <CountUp
                    value={stat.value}
                    className="block font-display text-2xl font-normal text-forest sm:text-3xl leading-none"
                  />
                  <p className="mt-2 text-[0.625rem] sm:text-[0.6875rem] font-medium tracking-[0.1em] text-muted uppercase leading-snug">
                    {stat.label}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>

          </div>
        </div>
      </div>
    </section>
  )
}
