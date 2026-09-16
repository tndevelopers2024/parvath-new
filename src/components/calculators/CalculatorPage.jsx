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
} from 'lucide-react'
import Seo from '../Seo'
import PageHeader from '../PageHeader'
import CTA from '../CTA'
import Reveal, { RevealGroup, RevealItem } from '../Reveal'
import { Diamond } from '../Ornaments'
import ResultStat from './ResultStat'
import CalculatorField from './CalculatorField'
import { getCalculator, calculators, calculatorDisclaimer } from '../../data/calculators'

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
  const otherCalculators = calculators.filter((c) => c.slug !== slug).slice(0, 5)
  const emphasisResults = calculator.results.filter((r) => r.emphasis)
  const detailResults = calculator.results.filter((r) => !r.emphasis)

  return (
    <>
      <Seo title={calculator.title} path={calculator.path} description={calculator.summary} />

      <PageHeader eyebrow="Calculators" title={calculator.title} lede={calculator.intro}>
        <Reveal y={14} delay={0.24} className="mt-8">
          <p className="inline-flex items-center gap-2.5 rounded-sm border border-line bg-ivory px-3.5 py-2.5 text-[0.75rem] tracking-[0.06em] text-muted">
            <Diamond size={6} />
            An illustrative estimate — not a quote or a guarantee
          </p>
        </Reveal>
      </PageHeader>

      <section className="section bg-ivory">
        <div className="shell">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            {/* ---- Inputs ---- */}
            <div className="lg:col-span-7">
              <Reveal y={16}>
                <div className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-[0.6875rem] font-medium tracking-[0.18em] text-forest uppercase">
                      Your numbers
                    </h2>
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

            {/* ---- Live results ---- */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <Reveal y={16} delay={0.1}>
                <div className="rounded-xl border border-gold/45 bg-cream p-6 sm:p-8">
                  <div className="flex items-center gap-2.5">
                    <Icon aria-hidden="true" className="h-5 w-5 text-forest" strokeWidth={1.5} />
                    <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-forest uppercase">
                      Estimated result
                    </p>
                  </div>

                  <div className="mt-6 space-y-6">
                    {emphasisResults.map((r) => (
                      <ResultStat key={r.key} label={r.label} value={results[r.key]} format={r.format} emphasis />
                    ))}
                  </div>

                  {detailResults.length > 0 && (
                    <dl className="mt-6 border-t border-line pt-1">
                      {detailResults.map((r) => (
                        <ResultStat key={r.key} label={r.label} value={results[r.key]} format={r.format} />
                      ))}
                    </dl>
                  )}
                </div>
              </Reveal>

              <Reveal y={14} delay={0.16} className="mt-6">
                <p className="text-[0.75rem] leading-relaxed text-muted">{calculatorDisclaimer}</p>
              </Reveal>

              <Reveal y={16} delay={0.22} className="mt-10">
                <h2 className="text-[0.6875rem] font-medium tracking-[0.18em] text-forest uppercase">
                  More calculators
                </h2>
                <RevealGroup as="ul" className="mt-5 border-t border-line" stagger={0.06}>
                  {otherCalculators.map((other) => (
                    <RevealItem as="li" key={other.slug}>
                      <Link
                        to={other.path}
                        className="group flex items-center justify-between gap-4 border-b border-line py-4 transition-colors duration-500 hover:border-gold/50"
                      >
                        <span className="font-display text-lg text-forest transition-colors duration-300 group-hover:text-gold-ink">
                          {other.title}
                        </span>
                        <ArrowRight
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-forest/35 transition-[transform,color] duration-300 group-hover:text-gold-ink motion-safe:group-hover:translate-x-1"
                          strokeWidth={1.5}
                        />
                      </Link>
                    </RevealItem>
                  ))}
                </RevealGroup>
                <Link
                  to="/calculators"
                  className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-[0.06em] text-forest uppercase transition-colors duration-300 hover:text-gold-ink"
                >
                  View all calculators
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </Reveal>
            </div>
          </div>
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
