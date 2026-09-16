import {
  TrendingUp,
  ShieldCheck,
  Users,
  Sunrise,
  Building2,
  Landmark,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import SectionHeading from './SectionHeading'
import Button from './Button'

const threads = [
  {
    number: '01',
    label: 'Personal Wealth',
    body: 'What you are building, and what it is for.',
    icon: TrendingUp,
    path: '/services/wealth-creation',
  },
  {
    number: '02',
    label: 'Family Security',
    body: 'The people who depend on the income you earn.',
    icon: ShieldCheck,
    path: '/services/life-insurance',
  },
  {
    number: '03',
    label: 'Your People',
    body: 'Benefits your team values and the business can sustain.',
    icon: Users,
    path: '/services/employee-benefits',
  },
  {
    number: '04',
    label: 'Retirement',
    body: 'The point at which work becomes a choice.',
    icon: Sunrise,
    path: '/services/retirement-planning',
  },
  {
    number: '05',
    label: 'Employer Obligations',
    body: 'Gratuity funded deliberately, long before it falls due.',
    icon: Building2,
    path: '/services/group-gratuity',
  },
  {
    number: '06',
    label: 'Legacy',
    body: 'How it all passes on, and to whom.',
    icon: Landmark,
    path: '/services/legacy-planning',
  },
]

/**
 * Redesigned introductory / About Us section:
 * Left: Narrative, philosophy card, and CTA buttons.
 * Right: Modern interactive 2-column cards showcase of the Six Threads.
 */
export default function Intro() {
  return (
    <section className="section bg-cream">
      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Narrative & Philosophy */}
          <div className="lg:col-span-5 xl:col-span-5">
            <SectionHeading
              eyebrow="A Different Approach to Wealth"
              title="Planning Around the Life Behind the Numbers"
            />

            <Reveal y={16} delay={0.14} className="mt-6">
              <div className="rounded-2xl border border-line/70 bg-white p-6 shadow-xs sm:p-7">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-white shadow-xs">
                    <Sparkles className="h-4 w-4 text-gold-soft" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.0625rem] font-semibold text-forest">
                      Structured vs. Fragmented
                    </h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                      Most financial decisions are made one at a time — an investment here, a policy
                      there, rarely revisited. Each may be reasonable on its own, yet add up to no
                      coherent plan at all.
                    </p>
                    <p className="mt-3 border-t border-line/60 pt-3 text-[0.875rem] font-medium leading-relaxed text-forest">
                      Structured planning starts with the life you are actually building and aligns
                      every decision in service of it.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal y={16} delay={0.2} className="mt-7 flex flex-wrap items-center gap-3.5">
              <Button to="/approach" variant="primary">
                Our Approach
              </Button>
              <Button to="/services" variant="secondary" withArrow={false}>
                Explore Services
              </Button>
            </Reveal>
          </div>

          {/* Right Column: Six Threads, One Plan */}
          <div className="lg:col-span-7 xl:col-span-7">
            <Reveal y={14}>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-gold" />
                  <p className="text-[0.6875rem] font-medium tracking-[0.2em] text-muted uppercase">
                    Six threads, one plan
                  </p>
                </div>
                <span className="text-[0.6875rem] font-medium tracking-wide text-gold-ink">
                  Integrated Framework
                </span>
              </div>
            </Reveal>

            <RevealGroup
              className="mt-5 grid gap-3.5 sm:grid-cols-2"
              stagger={0.06}
            >
              {threads.map((thread) => {
                const Icon = thread.icon
                return (
                  <RevealItem key={thread.label}>
                    <Link
                      to={thread.path}
                      className="group relative flex h-full flex-col justify-between rounded-xl border border-line/70 bg-white p-5 transition-all duration-300 hover:border-gold/70 hover:shadow-card hover:-translate-y-0.5"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest/5 text-forest transition-colors duration-300 group-hover:bg-forest group-hover:text-white">
                            <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                          </span>
                          <span className="font-display text-[0.75rem] font-medium tracking-wider text-muted/50 transition-colors duration-300 group-hover:text-gold-ink">
                            {thread.number}
                          </span>
                        </div>

                        <h3 className="mt-3.5 font-display text-[1.0625rem] font-semibold text-forest transition-colors duration-300 group-hover:text-gold-ink">
                          {thread.label}
                        </h3>

                        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">
                          {thread.body}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-1 text-[0.6875rem] font-medium tracking-wider text-forest/70 uppercase transition-all duration-300 group-hover:text-gold-ink group-hover:translate-x-0.5">
                        <span>Learn more</span>
                        <ArrowRight aria-hidden="true" className="h-3 w-3" strokeWidth={1.5} />
                      </div>
                    </Link>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
