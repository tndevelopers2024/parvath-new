import { ShieldCheck, Briefcase, Users } from 'lucide-react'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import { founderStats, site } from '../data/site'
import { images } from '../data/images'
import { JaaliField } from './Ornaments'
import SectionHeading from './SectionHeading'

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
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ---- Left: Executive Portrait & Credentials Card ---- */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none">
              {/* Outer decorative gold frame */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-2.5 hidden rounded-3xl border border-gold/40 sm:block -z-10"
              />

              {/* Card Container */}
              <div className="relative rounded-2xl border border-line/70 bg-gradient-to-b from-[#FAF8F5] to-white p-3.5 sm:p-4 shadow-[0_20px_50px_-24px_rgba(23,63,53,0.18)]">
                {/* Main image presentation */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-forest/5 ring-1 ring-line/60">
                  <img
                    src={images.founder.src}
                    alt={`Portrait of ${site.founder}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ---- Right: Editorial Profile & Highlights ---- */}
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="The Founder & Practice"
              title={`Meet ${site.founder}`}
            />

            {/* Editorial Profile Copy */}
            <Reveal y={16} delay={0.18}>
              <div className="mt-6 space-y-4">
                <p className="lede">
                  I partner with business owners, professionals, and families to help them
                  create, grow, protect, and transfer wealth through structured financial
                  planning — across wealth creation, retirement planning, life insurance, legacy
                  planning, employee benefit solutions, and group gratuity schemes.
                </p>
                <p className="lede">
                  With over 20 years of corporate experience and 7+ years in financial advisory,
                  I have had the privilege of working alongside 200+ families and businesses
                  toward financial security and peace of mind. I am particularly drawn to working
                  with business owners, where personal wealth, business continuity, retirement
                  planning and family legacy are rarely separate conversations — and deserve to be
                  planned as one.
                </p>
              </div>
            </Reveal>

            {/* Three Core Advisory Commitments */}
            <Reveal y={16} delay={0.24}>
              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
                <div className="border-t border-line pt-3.5">
                  <div className="flex items-center gap-2 text-forest">
                    <ShieldCheck className="h-4 w-4 text-gold-ink shrink-0" />
                    <p className="text-xs font-semibold text-forest">Client-First Standard</p>
                  </div>
                  <p className="mt-1.5 text-[0.6875rem] text-muted leading-relaxed">
                    Goal-based guidance that starts from your priorities, not from a product.
                  </p>
                </div>

                <div className="border-t border-line pt-3.5">
                  <div className="flex items-center gap-2 text-forest">
                    <Briefcase className="h-4 w-4 text-gold-ink shrink-0" />
                    <p className="text-xs font-semibold text-forest">Corporate Insight</p>
                  </div>
                  <p className="mt-1.5 text-[0.6875rem] text-muted leading-relaxed">
                    Practical understanding of business cashflows, risk shielding, and promoter continuity.
                  </p>
                </div>

                <div className="border-t border-line pt-3.5">
                  <div className="flex items-center gap-2 text-forest">
                    <Users className="h-4 w-4 text-gold-ink shrink-0" />
                    <p className="text-xs font-semibold text-forest">Boutique Attention</p>
                  </div>
                  <p className="mt-1.5 text-[0.6875rem] text-muted leading-relaxed">
                    A deliberately small clientele ensuring direct access to senior advisory at every review.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Stats — a ledger, not cards: same "hairline, not a box" treatment as
                the site's other stat rows (see Stats.jsx). */}
            <RevealGroup as="div" className="mt-8 grid grid-cols-3" stagger={0.08}>
              {founderStats.map((stat, i) => (
                <RevealItem
                  key={stat.label}
                  className={i > 0 ? 'border-l border-line pl-4 sm:pl-6' : ''}
                >
                  <p className="font-display text-2xl font-normal text-forest sm:text-3xl leading-none">
                    {stat.value}
                  </p>
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
