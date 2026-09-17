import { Compass, PenLine, Handshake, Briefcase } from 'lucide-react'
import { pillars, site, stats } from '../data/site'
import CountUp from './CountUp'
import SectionHeading from './SectionHeading'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import { GoldRule, JaaliField } from './Ornaments'
import SwipeArea from './SwipeArea'

const iconMap = { Compass, PenLine, Handshake, Briefcase }

// Corporate experience and families served: the two figures the pillars lean on.
const figures = [stats[0], stats[2]]

/** Statement panel: the argument in one line, the proof in two figures, and a signature. */
function StatementPanel() {
  return (
    <Reveal
      y={24}
      className="relative isolate overflow-hidden rounded-2xl border border-line bg-cream p-6 sm:p-8 lg:sticky lg:top-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_100%_0%,black,transparent_65%)]"
      >
        <div className="animate-drift absolute top-0 left-0 -right-[44px] -bottom-[44px] [--drift:44px]">
          <JaaliField opacity={0.09} scale={44} />
        </div>
      </div>

      <p className="eyebrow">The Parvath Difference</p>

      <p className="mt-5 font-display text-[1.625rem] leading-snug text-forest sm:text-[1.875rem]">
        Advice shaped by two decades inside organisations, not by a shelf of products.
      </p>

      <dl className="mt-6 grid grid-cols-2 border-t border-line pt-5">
        {figures.map((stat, i) => (
          <div key={stat.label} className={i > 0 ? 'border-l border-line pl-5 sm:pl-7' : 'pr-5'}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <CountUp value={stat.value} className="stat-figure block text-[2.5rem] sm:text-[3rem]" />
              <span className="mt-3 block text-[0.6875rem] leading-relaxed font-medium tracking-[0.14em] text-muted uppercase">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex items-center gap-4">
        <GoldRule width="2.5rem" delay={0.3} />
        <p className="text-sm text-forest">
          <span className="font-medium">{site.founder}</span>
          <span className="block text-[0.75rem] text-muted">Founder, Parvath Financial Services</span>
        </p>
      </div>
    </Reveal>
  )
}

/**
 * Why Parvath, as an argument rather than a card row: a statement panel on the
 * left (sticky from `lg`) and the four reasons as a ruled list on the right.
 * Hovering a reason draws a gold rule across it and fills its icon seal.
 */
export default function WhyParvath({ background = 'bg-ivory', className = 'border-y border-line' }) {
  return (
    <section className={`section ${background} ${className}`}>
      <div className="shell">
        <SectionHeading
          eyebrow="Why Parvath"
          title="Built on Experience, Driven by Relationships"
          lede="Four things that shape how every plan is put together, and why clients stay with it."
        />

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <StatementPanel />
          </div>

          <SwipeArea className="min-w-0 self-start lg:col-span-7">
          <RevealGroup as="ol" className="swipe-mobile border-t border-line max-sm:border-t-0" stagger={0.1} amount={0.15}>
            {pillars.map((pillar, i) => {
              const Icon = iconMap[pillar.icon]
              return (
                <RevealItem
                  as="li"
                  key={pillar.title}
                  x={28}
                  y={0}
                  className="group relative flex gap-5 border-b border-line py-5 max-sm:flex-col max-sm:gap-4 max-sm:rounded-2xl max-sm:border max-sm:bg-white max-sm:p-5 sm:gap-6 sm:py-6"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-x-100"
                  />

                  <span
                    className="animate-float flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft"
                    style={{ animationDelay: `${i * -1.5}s` }}
                  >
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-[8deg]"
                      strokeWidth={1.5}
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-[1.375rem] leading-tight text-forest transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:group-hover:translate-x-1 sm:text-[1.5rem]">
                        {pillar.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[0.6875rem] font-medium tracking-[0.18em] text-muted/70 transition-colors duration-500 group-hover:text-gold-ink"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-muted">{pillar.body}</p>

                    {pillar.tags?.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {pillar.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-line px-3 py-1 text-[0.625rem] font-medium tracking-[0.08em] text-muted uppercase transition-colors duration-500 group-hover:border-gold/50"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
          </SwipeArea>
        </div>
      </div>
    </section>
  )
}
