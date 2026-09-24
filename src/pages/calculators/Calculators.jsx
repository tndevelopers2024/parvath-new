import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
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
  ArrowUpRight,
  Search,
  X,
} from 'lucide-react'
import Seo from '../../components/Seo'
import PageHeader from '../../components/PageHeader'
import CTA from '../../components/CTA'
import Reveal from '../../components/Reveal'
import { calculators, calculatorCategories } from '../../data/calculators'
import { EASE, trackPointer } from '../../lib/motion'

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

const categoryLabel = Object.fromEntries(calculatorCategories.map((c) => [c.key, c.label]))

function CalculatorCard({ calculator, index }) {
  const Icon = calculatorIconMap[calculator.icon] ?? Calculator
  return (
    <Link
      to={calculator.path}
      onPointerMove={trackPointer}
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 transition-[translate,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:border-gold/60 hover:shadow-card sm:p-7 motion-safe:hover:-translate-y-1"
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-0.5 w-10 bg-gold transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
      />
      <div className="flex items-start justify-between gap-4">
        <span
          className="animate-float flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft"
          style={{ animationDelay: `${(index % 5) * -1.2}s` }}
        >
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <span className="rounded-full border border-line px-2.5 py-1 text-[0.625rem] font-medium tracking-[0.12em] text-muted uppercase">
          {categoryLabel[calculator.category]}
        </span>
      </div>

      <h3 className="mt-5 font-display text-[1.375rem] leading-tight text-forest">{calculator.title}</h3>
      <p className="mt-2 grow text-[0.875rem] leading-relaxed text-muted">{calculator.summary}</p>

      <span className="mt-5 flex items-center gap-1.5 text-[0.6875rem] font-medium tracking-[0.16em] text-forest/75 uppercase transition-colors duration-500 group-hover:text-forest">
        Open calculator
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          strokeWidth={1.75}
        />
      </span>
    </Link>
  )
}

/**
 * Filterable grid: category tabs with a sliding indicator, a search box, and
 * cards that re-flow with layout animation as the set changes.
 */
function CalculatorBrowser() {
  const reduced = useReducedMotion()
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')

  const tabs = [{ key: 'all', label: 'All' }, ...calculatorCategories]
  const counts = Object.fromEntries(
    tabs.map((t) => [t.key, t.key === 'all' ? calculators.length : calculators.filter((c) => c.category === t.key).length]),
  )

  const q = query.trim().toLowerCase()
  const visible = calculators.filter(
    (c) =>
      (category === 'all' || c.category === category) &&
      (!q || c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q)),
  )

  return (
    <section className="section bg-ivory">
      <div className="shell">
        <Reveal y={16} className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="tablist" aria-label="Calculator categories" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab) => {
              const selected = category === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setCategory(tab.key)}
                  className={`relative isolate shrink-0 rounded-full px-4 py-2 text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-300 ${
                    selected ? 'text-ivory' : 'text-forest hover:bg-cream'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="calc-tab"
                      className="absolute inset-0 -z-10 rounded-full bg-forest"
                      transition={reduced ? { duration: 0 } : { type: 'tween', duration: 0.45, ease: EASE }}
                    />
                  )}
                  <span className="relative">
                    {tab.label}
                    <span className={`ml-1.5 text-[0.6875rem] tabular-nums ${selected ? 'text-gold-soft' : 'text-muted'}`}>
                      {counts[tab.key]}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Search calculators</span>
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.75} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search calculators"
              className="w-full rounded-full border border-line bg-white py-2.5 pr-10 pl-11 text-base sm:text-[0.875rem] text-charcoal transition-colors duration-300 placeholder:text-muted/70 focus:border-forest focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-cream hover:text-forest"
              >
                <X aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            )}
          </label>
        </Reveal>

        <p aria-live="polite" className="mt-5 text-[0.75rem] tracking-[0.06em] text-muted">
          Showing {visible.length} of {calculators.length} calculators
        </p>

        <motion.ul layout={!reduced} className="mt-5 grid gap-5 sm:grid-cols-2 lg:mt-6 lg:grid-cols-3 lg:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((calculator, i) => (
              <motion.li
                key={calculator.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
                className="h-full"
              >
                <CalculatorCard calculator={calculator} index={i} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {visible.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-line bg-cream/60 px-6 py-10 text-center">
            <p className="font-display text-xl text-forest">No calculator matches &ldquo;{query}&rdquo;</p>
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setCategory('all')
              }}
              className="mt-3 text-[0.8125rem] font-medium text-gold-ink underline-offset-4 hover:underline"
            >
              Show all calculators
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default function Calculators() {
  return (
    <>
      <Seo
        title="Calculators"
        path="/calculators"
        description="Fifteen financial-planning calculators — SIP, lumpsum, EMI, SWP, retirement, life insurance need and goal-based planning for education, weddings, vehicles and more."
      />

      <PageHeader
        eyebrow="Calculators"
        title="Put a number on it."
        lede="Fifteen calculators covering the questions that come up most in planning conversations — what a goal will really cost, what a SIP could become, what a loan actually commits you to. Each one is a starting estimate, not a substitute for a conversation."
      />

      <CalculatorBrowser />

      <CTA
        eyebrow="Beyond the Numbers"
        title="A calculator is a starting point."
        body="These give you a working estimate. Turning it into a plan that accounts for your whole picture — taxes, existing holdings, family circumstances — is what a conversation with us is for."
      />
    </>
  )
}
