import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calculator,
  CalendarClock,
  Cake,
  Car,
  Check,
  Gem,
  GraduationCap,
  Home,
  Hourglass,
  Landmark,
  LineChart,
  Plane,
  ShieldCheck,
  Sunrise,
  TrendingUp,
  Users,
  Wallet,
  ArrowDownToLine,
  HeartPulse,
  Coins,
} from 'lucide-react'
import Seo from './Seo'
import PageHeader from './PageHeader'
import CTA from './CTA'
import FAQ from './FAQ'
import Button from './Button'
import ServiceCard from './ServiceCard'
import SectionHeading from './SectionHeading'
import Reveal, { RevealGroup, RevealItem, SplitWords } from './Reveal'
import { Diamond, JaaliField } from './Ornaments'
import { services } from '../data/site'
import { calculators } from '../data/calculators'
import SwipeArea from './SwipeArea'
import { trackPointer } from '../lib/motion'

const serviceIcons = {
  TrendingUp,
  Sunrise,
  ShieldCheck,
  Landmark,
  Users,
  Building2,
  HeartPulse,
  Coins,
}
const calculatorIcons = {
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
}

/** Dark summary card beside the overview: who it's for, focus areas, and the next step. */
function AtAGlance({ service }) {
  const Icon = serviceIcons[service.icon] ?? Landmark

  return (
    <aside
      data-cursor-theme="dark"
      className="relative isolate overflow-hidden rounded-2xl bg-forest p-6 text-ivory shadow-lift sm:p-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_100%_0%,black,transparent_70%)]">
          <div className="animate-drift absolute top-0 left-0 -right-[44px] -bottom-[44px] [--drift:44px]">
            <JaaliField opacity={0.12} scale={44} tone="#E4D2A6" />
          </div>
        </div>
        <span className="animate-wander absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-gold/15 blur-3xl motion-reduce:hidden" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-gold-soft/40 bg-ivory/5 text-gold-soft">
          <span aria-hidden="true" className="animate-ripple absolute inset-0 rounded-full border border-gold-soft/50 motion-reduce:hidden" />
          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <span className="font-display text-[3rem] leading-none text-transparent [-webkit-text-stroke:1px_rgb(228_210_166/0.35)]">
          {service.number}
        </span>
      </div>

      <p className="mt-6 text-[0.6875rem] font-medium tracking-[0.18em] text-gold-soft uppercase">At a glance</p>

      <dl className="mt-4 space-y-5">
        <div>
          <dt className="text-[0.75rem] text-ivory/55">Who it’s for</dt>
          <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ivory">{service.forWhom}</dd>
        </div>
        <div>
          <dt className="text-[0.75rem] text-ivory/55">What we focus on</dt>
          <dd className="mt-2 flex flex-wrap gap-2">
            {service.points.map((point) => (
              <span
                key={point.title}
                className="rounded-full border border-ivory/15 bg-ivory/5 px-3 py-1 text-[0.75rem] text-ivory/85"
              >
                {point.title}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="text-[0.75rem] text-ivory/55">First step</dt>
          <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ivory">
            A conversation with no obligation. No recommendation is made in it.
          </dd>
        </div>
      </dl>

      <Button to="/contact" variant="light" shimmer className="mt-7 w-full">
        Book a Consultation
      </Button>
    </aside>
  )
}

/** "Is this for you?" — situations that usually mean the service is worth a conversation. */
function Signs({ service }) {
  return (
    <section className="section border-y border-line bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="Is This for You?"
          title="Signs It May Be Time to Talk"
          lede="Most people recognise at least one of these. Any one of them is a reasonable place to start."
        />

        <SwipeArea className="mx-auto mt-8 sm:mt-10 lg:mt-12 max-w-5xl">
        <RevealGroup className="swipe-mobile grid gap-4 sm:grid-cols-2" stagger={0.09}>
          {service.signs.map((sign, i) => (
            <RevealItem
              key={sign}
              y={20}
              onPointerMove={trackPointer}
              className="spotlight group relative flex gap-4 rounded-2xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-card sm:p-6"
            >
              <span
                className="animate-float flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-gold-soft"
                style={{ animationDelay: `${i * -1.5}s` }}
              >
                <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </span>
              <p className="pt-1.5 text-[0.9375rem] leading-relaxed text-charcoal">{sign}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        </SwipeArea>
      </div>
    </section>
  )
}

/** Three concrete outcomes of the work. */
function Deliverables({ service }) {
  return (
    <section className="section bg-ivory">
      <div className="shell">
        <SectionHeading
          eyebrow="The Outcome"
          title="What You Come Away With"
          lede="Planning should leave you with something you can see and use — not just a meeting."
        />

        <SwipeArea className="mt-8 sm:mt-10 lg:mt-12">
        <RevealGroup as="ol" className="swipe-mobile grid gap-5 md:grid-cols-3 lg:gap-6" stagger={0.12}>
          {service.deliverables.map((item, i) => (
            <RevealItem
              as="li"
              key={item.title}
              y={28}
              onPointerMove={trackPointer}
              className="spotlight group relative overflow-hidden rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow,translate] duration-500 hover:border-gold/60 hover:shadow-card motion-safe:hover:-translate-y-1 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-0.5 w-10 bg-gold transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-2 right-4 font-display text-[5rem] leading-none font-semibold text-transparent [-webkit-text-stroke:1px_rgb(169_136_66/0.3)] select-none"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span aria-hidden="true" className="block h-px w-8 bg-gold transition-[width] duration-500 group-hover:w-14" />
              <h3 className="mt-5 font-display text-[1.375rem] leading-tight text-forest">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        </SwipeArea>
      </div>
    </section>
  )
}

// Full class names so Tailwind can see them; narrower sets stay centred.
const columns = {
  1: 'max-w-sm lg:grid-cols-1',
  2: 'max-w-3xl lg:grid-cols-2',
  3: 'max-w-5xl lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

/** Links to the site's own calculators that fit this service. Omitted when none apply. */
function RelatedCalculators({ service }) {
  const items = (service.calculators ?? [])
    .map((slug) => calculators.find((c) => c.slug === slug))
    .filter(Boolean)
  if (items.length === 0) return null

  return (
    <section className="section border-y border-line bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="Try the Numbers"
          title="Calculators for This Conversation"
          lede="A quick estimate before we talk can make the first conversation more useful."
        />

        <SwipeArea className="mt-8 sm:mt-10 lg:mt-12">
        <RevealGroup
          className={`swipe-mobile mx-auto grid gap-4 sm:grid-cols-2 ${columns[Math.min(items.length, 4)]}`}
          stagger={0.08}
        >
          {items.map((calc) => {
            const Icon = calculatorIcons[calc.icon] ?? Calculator
            return (
              <RevealItem key={calc.slug} y={20} className="h-full">
                <Link
                  to={calc.path}
                  onPointerMove={trackPointer}
                  className="spotlight group relative flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition-[border-color,box-shadow,translate] duration-500 hover:border-gold/60 hover:shadow-card motion-safe:hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft">
                      <Icon aria-hidden="true" className="h-[1.125rem] w-[1.125rem]" strokeWidth={1.5} />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-forest/40 transition-[transform,color] duration-500 group-hover:text-gold-ink motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="mt-4 font-display text-[1.125rem] leading-snug text-forest">{calc.title}</h3>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{calc.summary}</p>
                </Link>
              </RevealItem>
            )
          })}
        </RevealGroup>
        </SwipeArea>
      </div>
    </section>
  )
}

/**
 * Shared template behind the six service pages. Each page file passes its slug;
 * all copy comes from `services` in src/data/site.js.
 *
 * Overview (detail + focus areas, with an at-a-glance card) → signs it's time
 * to talk → what you come away with → related calculators → service FAQs →
 * other services → CTA.
 */
export default function ServiceDetail({ slug }) {
  const service = services.find((s) => s.slug === slug)
  // The next three services in order, wrapping round, so each page suggests a different set
  const index = services.findIndex((s) => s.slug === slug)
  const others = [...services.slice(index + 1), ...services.slice(0, index)].slice(0, 3)

  return (
    <>
      <Seo title={service.title} path={service.path} description={service.summary} type="article" />

      <PageHeader
        eyebrow={`Service ${service.number}`}
        title={service.title}
        lede={service.intro}
        crumb={service.title}
      >
        <Reveal y={14} delay={0.24} className="mt-8">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-ivory/20 bg-ivory/5 px-4 py-2 text-[0.75rem] tracking-[0.06em] text-ivory/80 backdrop-blur-sm">
            <Diamond size={6} />
            {service.forWhom}
          </p>
        </Reveal>
      </PageHeader>

      {/* ---- Overview ---- */}
      <section className="section bg-ivory">
        <div className="shell">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <Reveal y={12}>
                <p className="eyebrow">The Approach</p>
              </Reveal>
              <h2 className="display-2 mt-3 text-forest">
                <SplitWords text="What This Work Involves" delay={0.08} />
              </h2>

              <Reveal y={16} delay={0.16} className="mt-6 space-y-4">
                {service.detail.map((paragraph) => (
                  <p key={paragraph} className="lede">
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              <SwipeArea className="mt-8 sm:mt-10">
              <RevealGroup as="dl" className="swipe-mobile grid gap-4 sm:grid-cols-2" stagger={0.08}>
                {service.points.map((point, i) => (
                  <RevealItem
                    key={point.title}
                    onPointerMove={trackPointer}
                    className="spotlight group relative rounded-2xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-card"
                  >
                    <dt className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream font-display text-[0.8125rem] text-gold-ink transition-colors duration-500 group-hover:bg-forest group-hover:text-gold-soft">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display text-[1.1875rem] leading-tight text-forest">{point.title}</span>
                    </dt>
                    <dd className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{point.body}</dd>
                  </RevealItem>
                ))}
              </RevealGroup>
              </SwipeArea>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
              <Reveal y={20} delay={0.1}>
                <AtAGlance service={service} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Signs service={service} />
      <Deliverables service={service} />
      <RelatedCalculators service={service} />

      <FAQ
        background="bg-ivory"
        items={service.faqs}
        eyebrow="Questions"
        title={`${service.title}: Common Questions`}
        lede="Short answers to what people usually ask before a first conversation on this."
      />

      {/* ---- Other services ---- */}
      <section className="section border-t border-line bg-cream">
        <div className="shell">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
            <div className="text-center sm:text-left">
              <p className="eyebrow">Explore</p>
              <h2 className="display-2 mt-3 text-forest">Other Areas of Planning</h2>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-[0.06em] text-forest uppercase transition-colors duration-300 hover:text-gold-ink"
            >
              All services
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>

          <SwipeArea className="mt-8 sm:mt-10 lg:mt-12">
          <RevealGroup className="swipe-mobile grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" stagger={0.08}>
            {others.map((other) => (
              <RevealItem key={other.slug} className="h-full">
                <ServiceCard service={other} />
              </RevealItem>
            ))}
          </RevealGroup>
          </SwipeArea>
        </div>
      </section>

      <CTA
        eyebrow="Next Step"
        title={`Let’s talk about ${service.title.toLowerCase()}.`}
        body="A first conversation is simply that — an hour to understand where things stand and whether structured planning would help."
      />
    </>
  )
}
