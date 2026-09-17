import { Briefcase, LayoutGrid, TrendingUp, Users } from 'lucide-react'
import { stats } from '../data/site'
import { trackPointer } from '../lib/motion'
import CountUp from './CountUp'
import { JaaliField } from './Ornaments'
import { RevealGroup, RevealItem } from './Reveal'

// In data order: corporate experience, advisory, families served, planning areas.
const icons = [Briefcase, TrendingUp, Users, LayoutGrid]

/**
 * Trust strip, set as a compact forest band between the light ticker and the
 * founder section. Each cell pairs a seal with its figure side by side so the
 * row reads full rather than airy; the "+" is picked out in gold, and hovering
 * a cell draws a gold rule along its top and warms it with a pointer glow.
 *
 * The grid is 2-up on small screens and 4-up from `lg`, so the dividing rules
 * follow the column count.
 */
export default function Stats() {
  return (
    <section
      aria-label="Practice at a glance"
      data-cursor-theme="dark"
      className="relative isolate overflow-hidden bg-forest"
    >
      {/* Drifting lattice and a soft light from above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_75%)]"
      >
        <div className="animate-drift absolute top-0 left-0 -right-[56px] -bottom-[56px] [--drift:56px]">
          <JaaliField opacity={0.08} scale={56} tone="#E4D2A6" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />

      <div className="shell">
        <RevealGroup as="dl" className="grid grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {stats.map((stat, i) => {
            const Icon = icons[i]
            const rules = [
              i % 2 === 1 ? 'border-l border-ivory/10' : '',
              i > 1 ? 'border-t border-ivory/10 lg:border-t-0' : '',
              i > 0 ? 'lg:border-l lg:border-ivory/10' : '',
            ].join(' ')

            return (
              <RevealItem
                key={stat.label}
                y={24}
                onPointerMove={trackPointer}
                className={`spotlight group relative px-4 py-6 sm:px-6 md:py-7 lg:justify-center lg:py-8 xl:px-8 ${rules} lg:flex`}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold-soft transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-x-100"
                />
                <dt className="sr-only">{stat.label}</dt>
                <dd className="flex items-center gap-3 sm:gap-4">
                  <span
                    aria-hidden="true"
                    className="animate-float hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-soft/30 bg-ivory/5 text-gold-soft transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-forest sm:flex"
                    style={{ animationDelay: `${i * -1.5}s` }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>

                  <span className="min-w-0">
                    <CountUp
                      value={stat.value}
                      className="block font-display text-[2.25rem] leading-none font-normal tracking-[-0.02em] text-ivory tabular-nums sm:text-[2.75rem] xl:text-[3.25rem]"
                      suffixClassName="text-gold-soft"
                    />
                    <span className="mt-2 block text-[0.625rem] leading-snug font-medium tracking-[0.14em] text-ivory/75 uppercase transition-colors duration-500 group-hover:text-ivory sm:text-[0.6875rem]">
                      {stat.label}
                    </span>
                  </span>
                </dd>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
