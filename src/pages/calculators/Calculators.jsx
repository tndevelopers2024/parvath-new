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
  ArrowUpRight,
} from 'lucide-react'
import Seo from '../../components/Seo'
import PageHeader from '../../components/PageHeader'
import CTA from '../../components/CTA'
import { RevealGroup, RevealItem } from '../../components/Reveal'
import { calculators, calculatorCategories } from '../../data/calculators'

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

function CalculatorCard({ calculator }) {
  const Icon = calculatorIconMap[calculator.icon] ?? Calculator
  return (
    <Link
      to={calculator.path}
      className="group relative flex h-full flex-col rounded-xl border border-line bg-ivory p-7 transition-[transform,border-color,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:border-gold/60 hover:bg-white hover:shadow-card sm:p-8 motion-safe:hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-cream text-forest transition-colors duration-500 group-hover:bg-forest group-hover:text-white">
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-[1.125rem] w-[1.125rem] shrink-0 text-forest/35 transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:text-gold-ink motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
          strokeWidth={1.5}
        />
      </div>

      <h3 className="mt-6 font-display text-[1.375rem] leading-tight text-forest">{calculator.title}</h3>
      <p className="mt-3 grow text-[0.875rem] leading-relaxed text-muted">{calculator.summary}</p>

      <span className="mt-6 text-[0.6875rem] font-medium tracking-[0.16em] text-forest/70 uppercase transition-colors duration-500 group-hover:text-forest">
        Open calculator
      </span>
    </Link>
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

      <section className="section bg-ivory">
        <div className="shell">
          {calculatorCategories.map((category) => {
            const items = calculators.filter((c) => c.category === category.key)
            if (items.length === 0) return null
            return (
              <div key={category.key} className="mb-16 last:mb-0">
                <h2 className="font-display text-[1.75rem] text-forest">{category.label}</h2>
                <span aria-hidden="true" className="mt-3 block h-px w-10 bg-gold" />

                <RevealGroup
                  className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                  stagger={0.07}
                  amount={0.1}
                >
                  {items.map((calculator) => (
                    <RevealItem key={calculator.slug} className="h-full">
                      <CalculatorCard calculator={calculator} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            )
          })}
        </div>
      </section>

      <CTA
        eyebrow="Beyond the Numbers"
        title="A calculator is a starting point."
        body="These give you a working estimate. Turning it into a plan that accounts for your whole picture — taxes, existing holdings, family circumstances — is what a conversation with us is for."
      />
    </>
  )
}
