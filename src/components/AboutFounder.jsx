import { ShieldCheck, Briefcase, Users, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router-dom'
import { EASE } from '../lib/motion'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import CountUp from './CountUp'
import Button from './Button'
import { founderStats, site } from '../data/site'
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
 * Individual Founder Portrait:
 * Renders verified photograph if present, or an executive gold monogram medallion
 * on deep forest heritage backdrop for K Sridhar.
 */
function FounderPortrait({ founder }) {
  const reduced = useReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-[190px] sm:mx-0 sm:w-40 sm:max-w-none shrink-0">
      {/* Outer decorative gold frame */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 -z-10 rounded-2xl border border-gold/40"
      />

      {/* Card container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line/70 bg-gradient-to-b from-[#FAF8F5] to-white p-1.5 shadow-[0_16px_36px_-16px_rgba(23,63,53,0.18)]">
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-forest/5 ring-1 ring-line/60">
          {founder.image ? (
            <motion.img
              src={founder.image}
              alt={`${founder.name}, Founder of Parvath Life and Legacy Advisors`}
              className="h-full w-full object-cover object-top"
              loading="lazy"
              whileHover={reduced ? undefined : { scale: 1.05, transition: { duration: 0.6, ease: EASE } }}
            />
          ) : (
            /* Executive monogram plate */
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-forest p-4 text-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-15 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]"
              >
                <JaaliField opacity={0.3} scale={24} tone="#E4D2A6" />
              </div>
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-gold-soft/50 bg-forest-soft shadow-[0_0_24px_rgba(169,136,66,0.25)] ring-2 ring-gold-soft/30">
                <span className="font-display text-2xl font-semibold tracking-wider text-gold-soft">
                  {founder.initials}
                </span>
              </span>
              <span className="relative mt-3 block text-[0.625rem] font-medium tracking-[0.2em] text-gold-soft/90 uppercase">
                Executive Advisory
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Enhanced Dual Founders Component:
 * Showcases both founders (K Sridhar & Varalakshmi Sridhar) with equal prominence,
 * individual credentials, distinct specialties, 3 core advisory commitments,
 * practice statistics, and direct consultation CTAs.
 */
export default function AboutFounder({ className = '' }) {
  return (
    <section className={`relative overflow-hidden bg-ivory section ${className}`}>
      {/* Subtle decorative heritage jaali background accent in the corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-20 h-72 w-72 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)] lg:h-96 lg:w-96"
      >
        <JaaliField opacity={0.08} scale={40} />
      </div>

      <div className="shell relative">
        <SectionHeading
          eyebrow="The Founders & Leadership"
          title="Meet Our Founders"
          lede="Parvath Life and Legacy Advisors is founded and led by K Sridhar and Varalakshmi Sridhar — uniting over two decades of corporate advisory acumen with personalized, goal-driven financial planning."
        />

        {/* Dual Founder Profile Cards */}
        <RevealGroup className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 lg:mt-12 lg:grid-cols-2 lg:gap-10" stagger={0.15}>
          {site.founders.map((founder) => (
            <RevealItem
              key={founder.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line/80 bg-white p-5 sm:p-8 shadow-[0_16px_40px_-20px_rgba(23,63,53,0.12)] transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-card"
            >
              {/* Subtle top gold gradient hairline */}
              <span
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30"
              />

              <div>
                {/* Header: Portrait + Identity */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
                  <FounderPortrait founder={founder} />

                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-3 py-0.5 text-[0.6875rem] font-medium tracking-wide text-forest uppercase">
                      {founder.experience}
                    </span>
                    <h3 className="mt-2.5 font-display text-2xl sm:text-[1.625rem] font-semibold text-forest leading-tight">
                      {founder.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium tracking-[0.14em] text-gold-ink uppercase">
                      {founder.role}
                    </p>
                    <p className="mt-2 text-xs font-medium text-forest/80 leading-relaxed">
                      {founder.focus}
                    </p>
                  </div>
                </div>

                {/* Bio paragraph */}
                <p className="mt-5 text-[0.875rem] leading-relaxed text-muted border-t border-line/60 pt-4">
                  {founder.bio}
                </p>

                {/* Specialties Tags */}
                <div className="mt-4 pt-3 border-t border-line/40">
                  <p className="text-[0.625rem] font-medium tracking-[0.16em] text-gold-ink uppercase mb-2.5">
                    Practice Specialties
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {founder.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line/80 bg-cream/60 px-2.5 py-1 text-[0.6875rem] text-forest"
                      >
                        <span className="h-1 w-1 rounded-full bg-gold" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between">
                <Link
                  to={founder.ctaPath}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-forest transition-colors duration-300 hover:text-gold-ink"
                >
                  {founder.ctaLabel}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 text-gold" />
                </Link>
                <span className="text-[0.6875rem] font-medium tracking-wider text-muted uppercase">
                  Parvath Advisors
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Three Core Advisory Commitments */}
        <RevealGroup className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3 sm:gap-6" stagger={0.12} delay={0.2}>
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

        {/* Stats — practice figures ledger */}
        <RevealGroup as="div" className="mt-10 grid grid-cols-3 border-t border-line pt-8 sm:mt-12" stagger={0.08}>
          {founderStats.map((stat, i) => (
            <RevealItem
              key={stat.label}
              className={i > 0 ? 'border-l border-line pl-3 sm:pl-6' : ''}
            >
              <CountUp
                value={stat.value}
                className="block font-display text-xl sm:text-2xl lg:text-3xl font-normal text-forest leading-none whitespace-nowrap"
                suffixClassName="text-gold"
              />
              <p className="mt-2 text-[0.625rem] sm:text-[0.6875rem] font-medium tracking-[0.08em] sm:tracking-[0.1em] text-muted uppercase leading-snug">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Direct Consultation Callout */}
        <Reveal y={16} delay={0.25} className="mt-8 sm:mt-10 lg:mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-r from-cream via-white to-cream p-5 sm:p-7">
            <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-5">
              <div>
                <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-gold-ink uppercase">
                  Senior Founder Access
                </p>
                <h4 className="mt-1 font-display text-xl font-semibold text-forest">
                  Speak Directly with K Sridhar &amp; Varalakshmi Sridhar
                </h4>
                <p className="mt-1 text-xs text-muted max-w-xl">
                  Every relationship at Parvath is managed personally by our founders — ensuring your business succession and family wealth receive senior advisory discipline.
                </p>
              </div>
              <Button to="/contact" variant="primary" className="w-full sm:w-auto shrink-0 text-xs">
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
