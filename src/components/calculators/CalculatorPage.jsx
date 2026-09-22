import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Gem,
  Car,
  Plane,
  LineChart,
  Landmark,
  Hourglass,
  CalendarClock,
  TrendingUp,
  Cake,
  Wallet,
  Home,
  ArrowDownToLine,
  Sunrise,
  ShieldCheck,
  Calculator,
  RotateCcw,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import Seo from '../Seo'
import PageHeader from '../PageHeader'
import CTA from '../CTA'
import SwipeArea from '../SwipeArea'
import Reveal, { RevealGroup, RevealItem } from '../Reveal'
import { Diamond, JaaliField } from '../Ornaments'
import Breakdown from './Breakdown'
import ResultStat, { AnimatedValue } from './ResultStat'
import CalculatorField from './CalculatorField'
import { getCalculator, calculators, calculatorDisclaimer } from '../../data/calculators'
import { trackPointer } from '../../lib/motion'

const calculatorIconMap = {
  GraduationCap,
  Gem,
  Car,
  Plane,
  LineChart,
  Landmark,
  Hourglass,
  CalendarClock,
  TrendingUp,
  Cake,
  Wallet,
  Home,
  ArrowDownToLine,
  Sunrise,
  ShieldCheck,
  Calculator,
}

/**
 * Shared template behind every calculator page — one component reads a
 * config from src/data/calculators.js by slug and renders its fields, live
 * results and cross-links. Mirrors how ServiceDetail.jsx drives the six
 * service pages from one template; adding a sixteenth calculator means
 * adding a config entry, not a new page component.
 *
 * Results recompute on every keystroke/drag (useMemo over plain numbers is
 * effectively free) — no submit button, so the figure a person is looking at
 * is always the one their current inputs actually produce.
 */
export default function CalculatorPage({ slug }) {
  const calculator = getCalculator(slug)

  const defaults = useMemo(
    () => Object.fromEntries(calculator.fields.map((f) => [f.key, f.default])),
    [calculator],
  )
  const [values, setValues] = useState(defaults)

  // A field's default changes when navigating slug -> slug (same component
  // instance, React Router does not remount) — resync local state then.
  const [activeSlug, setActiveSlug] = useState(slug)
  if (activeSlug !== slug) {
    setActiveSlug(slug)
    setValues(defaults)
  }

  const results = useMemo(() => calculator.compute(values), [calculator, values])
  const setField = (key) => (next) => setValues((v) => ({ ...v, [key]: next }))
  const reset = () => setValues(defaults)

  const Icon = calculatorIconMap[calculator.icon] ?? Calculator
  // Same-category calculators first, then the rest, so the suggestions stay relevant
  const otherCalculators = [
    ...calculators.filter((c) => c.slug !== slug && c.category === calculator.category),
    ...calculators.filter((c) => c.slug !== slug && c.category !== calculator.category),
  ].slice(0, 5)
  const emphasisResults = calculator.results.filter((r) => r.emphasis)
  const detailResults = calculator.results.filter((r) => !r.emphasis)

  return (
    <>
      <Seo title={calculator.title} path={calculator.path} description={calculator.summary} />

      <PageHeader
        eyebrow="Calculators"
        title={calculator.title}
        lede={calculator.intro}
        crumb={calculator.title}
      >
        <Reveal y={14} delay={0.24} className="mt-8">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-ivory/20 bg-ivory/5 px-4 py-2 text-[0.75rem] tracking-[0.06em] text-ivory/80 backdrop-blur-sm">
            <Diamond size={6} />
            An illustrative estimate — not a quote or a guarantee
          </p>
        </Reveal>
      </PageHeader>

      <section className="section bg-ivory">
        <div className="shell">
          {/* ---- Sticky mobile result bar: shows the primary figure while adjusting inputs ---- */}
          {emphasisResults.length > 0 && (
            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-gold/30 bg-forest/[0.97] px-4 py-3 text-ivory shadow-[0_-8px_24px_-6px_rgba(23,63,53,0.35)] backdrop-blur-md lg:hidden">
              <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[0.625rem] font-medium tracking-[0.14em] text-gold-soft uppercase">
                    {emphasisResults[0].label}
                  </p>
                  <AnimatedValue
                    value={results[emphasisResults[0].key]}
                    format={emphasisResults[0].format}
                    className="block text-xl font-semibold tabular-nums text-ivory"
                  />
                </div>
                <a
                  href="#calculator-results"
                  className="shrink-0 rounded-full border border-ivory/20 bg-ivory/10 px-3.5 py-2 text-[0.6875rem] font-medium tracking-[0.04em] text-ivory transition-colors hover:bg-ivory/20"
                >
                  Full breakdown ↓
                </a>
              </div>
            </div>
          )}

          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            {/* ---- Inputs ---- */}
            <div className="lg:col-span-7">
              <Reveal y={16}>
                <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-gold via-gold-soft to-transparent"
                  />
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="animate-float flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest">
                        <Icon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />
                      </span>
                      <h2 className="text-[0.6875rem] font-medium tracking-[0.18em] text-forest uppercase">
                        Your numbers
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={reset}
                      className="group flex items-center gap-1.5 text-[0.75rem] font-medium text-muted transition-colors duration-300 hover:text-forest"
                    >
                      <RotateCcw
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-rotate-180"
                        strokeWidth={1.5}
                      />
                      Reset to defaults
                    </button>
                  </div>

                  <div className="mt-7 space-y-7">
                    {calculator.fields.map((field) => (
                      <CalculatorField
                        key={field.key}
                        field={field}
                        value={values[field.key]}
                        onChange={setField(field.key)}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ---- Live results (Sticky) ---- */}
            <div id="calculator-results" className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <Reveal y={16} delay={0.1}>
                <div
                  data-cursor-theme="dark"
                  onPointerMove={trackPointer}
                  className="spotlight relative isolate overflow-hidden rounded-2xl bg-forest p-6 text-ivory shadow-lift sm:p-8"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_100%_0%,black,transparent_70%)]"
                  >
                    <div className="animate-drift absolute top-0 left-0 -right-[40px] -bottom-[40px] [--drift:40px]">
                      <JaaliField opacity={0.1} scale={40} tone="#E4D2A6" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.18em] text-gold-soft uppercase">
                      <span aria-hidden="true" className="relative flex h-2 w-2">
                        <span className="animate-ping-soft absolute inset-0 rounded-full bg-gold-soft motion-reduce:hidden" />
                        <span className="relative h-2 w-2 rounded-full bg-gold-soft" />
                      </span>
                      Estimated result
                    </p>
                    <span className="text-[0.625rem] tracking-[0.14em] text-ivory/50 uppercase">Updates live</span>
                  </div>

                  <div className="mt-6 space-y-6">
                    {emphasisResults.map((r) => (
                      <ResultStat key={r.key} label={r.label} value={results[r.key]} format={r.format} emphasis tone="dark" />
                    ))}
                  </div>

                  {calculator.breakdown && (
                    <Breakdown title={calculator.breakdownTitle} parts={calculator.breakdown(results)} />
                  )}

                  {detailResults.length > 0 && (
                    <dl className="mt-6 border-t border-ivory/10 pt-4">
                      {detailResults.map((r) => (
                        <ResultStat key={r.key} label={r.label} value={results[r.key]} format={r.format} tone="dark" />
                      ))}
                    </dl>
                  )}

                  <Link
                    to="/contact"
                    className="group mt-6 flex items-center justify-between gap-3 rounded-xl border border-ivory/15 bg-ivory/5 px-4 py-3 text-[0.8125rem] text-ivory/85 transition-colors duration-300 hover:border-gold-soft/50 hover:bg-ivory/10 hover:text-ivory"
                  >
                    Talk this number through with an adviser
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-gold-soft transition-transform duration-300 motion-safe:group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </Link>
                </div>
              </Reveal>

              <Reveal y={14} delay={0.16} className="mt-4">
                <p className="text-[0.75rem] leading-relaxed text-muted">{calculatorDisclaimer}</p>
              </Reveal>
            </div>
          </div>

          {/* ---- More related calculators below the main tool ---- */}
          {otherCalculators.length > 0 && (
            <div className="mt-14 border-t border-line pt-10 lg:mt-16 lg:pt-12">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-[0.6875rem] font-semibold tracking-[0.2em] text-gold-ink uppercase">
                    Explore Further
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-semibold text-forest sm:text-3xl">
                    More Related Calculators
                  </h2>
                </div>
                <Link
                  to="/calculators"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-forest uppercase transition-colors duration-300 hover:text-gold-ink"
                >
                  <span>View all calculators</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>
              </div>

              <SwipeArea className="mt-6">
                <RevealGroup
                  className="swipe-mobile grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  stagger={0.06}
                >
                  {otherCalculators.map((other) => {
                    const OtherIcon = calculatorIconMap[other.icon] ?? Calculator
                    return (
                      <RevealItem key={other.slug} y={16} className="h-full">
                        <Link
                          to={other.path}
                          onPointerMove={trackPointer}
                          className="spotlight group relative flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-card"
                        >
                          <div className="flex items-start justify-between">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest transition-colors duration-300 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft">
                              <OtherIcon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />
                            </span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-4 w-4 text-forest/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-ink"
                              strokeWidth={1.5}
                            />
                          </div>
                          <h3 className="mt-4 font-display text-base font-semibold leading-snug text-forest transition-colors group-hover:text-gold-ink">
                            {other.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                            {other.summary}
                          </p>
                        </Link>
                      </RevealItem>
                    )
                  })}
                </RevealGroup>
              </SwipeArea>
            </div>
          )}
        </div>
      </section>

      <CTA
        eyebrow="Next Step"
        title="Want to turn this into a plan?"
        body="A calculator gives you a number. A conversation turns it into a plan that actually fits your life — the first one carries no obligation."
      />
    </>
  )
}
