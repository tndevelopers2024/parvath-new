import { Link } from 'react-router-dom'
import { ArrowUpRight, Briefcase, Building2, Compass, HeartHandshake, Landmark, Users } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import CTA from '../components/CTA'
import CountUp from '../components/CountUp'
import Reveal, { RevealGroup, RevealItem, SplitWords } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SwipeArea from '../components/SwipeArea'
import { JaaliField, QuoteMark } from '../components/Ornaments'
import { images } from '../data/images'
import { services, site } from '../data/site'
import { EASE, trackPointer, viewportOnce } from '../lib/motion'

const findService = (slug) => services.find((s) => s.slug === slug)

/** Milestones, told only from facts stated elsewhere on the site. */
const journey = [
  {
    marker: '20+ years',
    title: 'Inside organisations',
    body: 'Two decades in corporate roles — a working understanding of how careers, businesses and cash flow actually behave.',
    Icon: Building2,
  },
  {
    marker: 'The shift',
    title: 'Into financial advisory',
    body: 'Advisory work begins with a simple rule: start from the client’s circumstances, not from a product.',
    Icon: Compass,
  },
  {
    marker: '7+ years',
    title: 'A boutique practice',
    body: 'Parvath is kept deliberately small, so every relationship has direct access to senior advice at each review.',
    Icon: HeartHandshake,
  },
  {
    marker: 'Today',
    title: '200+ families & businesses',
    body: 'Served across six planning areas — a number that grows slowly, and on purpose.',
    Icon: Landmark,
  },
]

const audiences = [
  {
    title: 'Business Owners',
    Icon: Briefcase,
    body: 'When the business is most of the wealth, personal plans, continuity, staff benefits and succession have to be worked out together.',
    services: ['employee-benefits', 'group-gratuity', 'legacy-planning'],
  },
  {
    title: 'Professionals',
    Icon: Compass,
    body: 'Building capital from a career — with retirement to fund and an income worth protecting along the way.',
    services: ['wealth-creation', 'retirement-planning', 'life-insurance'],
  },
  {
    title: 'Families',
    Icon: Users,
    body: 'Protecting the people who depend on you, and passing on what you have built in an orderly way.',
    services: ['life-insurance', 'legacy-planning', 'wealth-creation'],
  },
]

/** Moved from the former Approach page: what working together looks like, stage by stage. */
const expectations = [
  {
    stage: 'Before we meet',
    body: 'Nothing to prepare. It helps if you can bring a rough sense of income, commitments and anything you already hold, but the first conversation works without documents.',
  },
  {
    stage: 'The first conversation',
    body: 'About an hour. Mostly questions from our side — what you are working towards, who depends on you, what keeps you up at night. No recommendations are made in this meeting.',
  },
  {
    stage: 'The plan',
    body: 'A written view of where things stand, what the goals require, and where the gaps are. Presented in person so the reasoning can be discussed, not just the conclusions.',
  },
  {
    stage: 'Implementation',
    body: 'Only the steps the plan actually calls for, sequenced so they are manageable. Nothing is put in place that has not been explained first.',
  },
  {
    stage: 'The review',
    body: 'Periodic, and triggered by life rather than by the calendar alone — a new child, a business change, a shift in priorities all warrant revisiting the plan.',
  },
]

const beliefs = [
  {
    title: 'A plan before a product',
    body: 'The question of what to buy comes last. It cannot be answered sensibly until the goals, the timelines and the obligations are on the table.',
  },
  {
    title: 'Plain language, always',
    body: 'If a recommendation cannot be explained in terms you would use yourself, it has not been explained properly.',
  },
  {
    title: 'The whole picture',
    body: 'Personal wealth, the business, protection and succession are one conversation. Treating them separately is where most plans come apart.',
  },
  {
    title: 'Reviewed, not filed away',
    body: 'A plan written once and never revisited stops matching the life it was written for. The review is the work.',
  },
]

/* ------------------------------------------------------------------ */

function Story() {
  return (
    <section className="section bg-ivory">
      <div className="shell">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Pull quote — the founder's own words from the practice profile */}
          <Reveal y={24} className="lg:col-span-5">
            <figure className="relative isolate overflow-hidden rounded-2xl bg-forest p-7 text-ivory shadow-lift sm:p-9">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_100%_0%,black,transparent_70%)]"
              >
                <div className="animate-drift absolute top-0 left-0 -right-[44px] -bottom-[44px] [--drift:44px]">
                  <JaaliField opacity={0.12} scale={44} tone="#E4D2A6" />
                </div>
              </div>
              <QuoteMark className="text-[6rem] text-gold-soft/40" />
              <blockquote className="-mt-6 font-display text-[1.375rem] leading-snug sm:text-[1.625rem]">
                I am particularly drawn to working with business owners, where personal wealth,
                business continuity, retirement planning and family legacy are rarely separate
                conversations — and deserve to be planned as one.
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 border-t border-ivory/15 pt-6">
                <img
                  src={images.founder.src}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover object-top ring-2 ring-gold-soft/40"
                  loading="lazy"
                />
                <span>
                  <span className="block font-medium">{site.founder}</span>
                  <span className="block text-[0.75rem] text-ivory/65">{site.founderRole}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal y={12}>
              <p className="eyebrow">Our Story</p>
            </Reveal>
            <h2 className="display-2 mt-3 text-forest">
              <SplitWords text="Planning the way it is described in theory, and rarely practised." delay={0.08} />
            </h2>

            <Reveal y={16} delay={0.2} className="mt-6 space-y-4">
              <p className="lede">
                Parvath Financial Services was founded to start with the client&rsquo;s
                circumstances, understand the whole picture, and only then discuss what should
                actually be done.
              </p>
              <p className="lede">
                That takes time per relationship, which is why the practice stays deliberately
                small. The perspective behind it comes from twenty years in corporate roles before
                the advisory practice began — the reason business owners tend to find the
                conversation useful: the pressures of running a company are familiar ones, not
                theoretical.
              </p>
            </Reveal>

            <RevealGroup className="mt-8 grid grid-cols-3 border-t border-line pt-6" stagger={0.1}>
              {[
                { value: '20+', label: 'Years corporate' },
                { value: '7+', label: 'Years advisory' },
                { value: '6', label: 'Planning areas' },
              ].map((fact, i) => (
                <RevealItem key={fact.label} className={i > 0 ? 'border-l border-line pl-4 sm:pl-6' : ''}>
                  <CountUp
                    value={fact.value}
                    className="block font-display text-3xl leading-none text-forest sm:text-4xl"
                    suffixClassName="text-gold"
                  />
                  <span className="mt-2 block text-[0.6875rem] font-medium tracking-[0.14em] text-muted uppercase">
                    {fact.label}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Journey() {
  const reduced = useReducedMotion()

  return (
    <section className="section border-y border-line bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="The Journey"
          title="From Corporate Floors to a Boutique Practice"
          lede="The experience clients benefit from was built long before the first planning conversation."
        />

        <div className="relative mt-10">
          {/* Rail: horizontal from `lg`, vertical below */}
          {reduced ? (
            <span aria-hidden="true" className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-gold/50 lg:block" />
          ) : (
            <motion.span
              aria-hidden="true"
              className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px origin-left bg-gold/50 lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.4, ease: EASE }}
            />
          )}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-7 right-[12.5%] left-[12.5%] hidden lg:block motion-reduce:hidden"
          >
            <span className="animate-travel absolute top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_5px_rgba(169,136,66,0.2)]" />
          </span>
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-7 hidden w-px bg-gold/40 sm:block lg:hidden" />

          <SwipeArea>
          <RevealGroup as="ol" className="swipe-mobile relative grid gap-6 lg:grid-cols-4 lg:gap-6" stagger={0.14}>
            {journey.map(({ marker, title, body, Icon }, i) => (
              <RevealItem as="li" key={title} y={20} className="group relative pl-20 max-sm:rounded-2xl max-sm:border max-sm:border-line max-sm:bg-ivory max-sm:p-5 max-sm:pl-5 lg:pl-0 lg:text-center">
                <span className="absolute top-0 left-0 flex h-14 w-14 items-center justify-center rounded-full max-sm:relative max-sm:mb-4 border border-gold/50 bg-ivory text-forest shadow-[0_0_0_6px_var(--color-cream)] transition-colors duration-500 group-hover:bg-forest group-hover:text-gold-soft lg:relative lg:mx-auto">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                  {i === journey.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="animate-ripple absolute inset-0 rounded-full border border-gold motion-reduce:hidden"
                    />
                  )}
                </span>
                <p className="text-[0.6875rem] font-medium tracking-[0.2em] text-gold-ink uppercase lg:mt-5">
                  {marker}
                </p>
                <h3 className="mt-2 font-display text-[1.375rem] leading-tight text-forest">{title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted lg:mx-auto lg:max-w-[16rem]">
                  {body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          </SwipeArea>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Expectations() {
  return (
    <section className="section bg-ivory">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal y={12}>
                <p className="eyebrow">What to Expect</p>
              </Reveal>
              <h2 className="display-2 mt-3 text-forest">
                <SplitWords text="From First Call to Ongoing Review" delay={0.08} />
              </h2>
              <Reveal y={16} delay={0.2}>
                <p className="lede mt-5">
                  There is no obligation attached to a first conversation, and no recommendation is
                  made in it. If structured planning would not add anything to your situation, that
                  is a reasonable outcome and we will say so.
                </p>
              </Reveal>
            </div>
          </div>

          <SwipeArea className="min-w-0 lg:col-span-7">
          <RevealGroup as="ol" className="swipe-mobile relative" stagger={0.1}>
            <span aria-hidden="true" className="absolute top-3 bottom-3 left-5 w-px bg-gradient-to-b from-gold/60 via-line to-transparent max-sm:hidden" />
            {expectations.map((item, i) => (
              <RevealItem as="li" key={item.stage} x={24} y={0} className="group relative flex gap-5 pb-7 last:pb-0 max-sm:flex-col max-sm:gap-3 max-sm:pb-0">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-ivory font-display text-[0.875rem] text-gold-ink transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 rounded-2xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-500 group-hover:border-gold/60 group-hover:shadow-card sm:p-6">
                  <h3 className="font-display text-[1.3125rem] leading-tight text-forest">{item.stage}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          </SwipeArea>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Audiences() {
  return (
    <section className="section border-y border-line bg-cream">
      <div className="shell">
        <SectionHeading
          eyebrow="Who We Work With"
          title="Three Kinds of Client, One Way of Planning"
          lede="Most clients arrive with a single question. Where they are in life decides which areas of planning it connects to."
        />

        <SwipeArea className="mt-8 lg:mt-10">
        <RevealGroup className="swipe-mobile grid gap-5 md:grid-cols-3 lg:gap-6" stagger={0.12}>
          {audiences.map(({ title, Icon, body, services: slugs }, i) => (
            <RevealItem
              key={title}
              y={28}
              onPointerMove={trackPointer}
              className="spotlight group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow,translate] duration-500 hover:border-gold/60 hover:shadow-card motion-safe:hover:-translate-y-1 sm:p-7"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-0.5 w-12 bg-gold transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
              />
              <span
                className="animate-float flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft"
                style={{ animationDelay: `${i * -2}s` }}
              >
                <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-[1.5rem] leading-tight text-forest">{title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{body}</p>

              <div className="mt-auto pt-6">
                <p className="text-[0.625rem] font-medium tracking-[0.18em] text-gold-ink uppercase">
                  Where we usually start
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {slugs.map((slug) => {
                    const svc = findService(slug)
                    return (
                      <li key={slug}>
                        <Link
                          to={svc.path}
                          className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-[0.6875rem] text-forest transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-ivory"
                        >
                          {svc.title}
                          <ArrowUpRight aria-hidden="true" className="h-3 w-3" strokeWidth={1.75} />
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        </SwipeArea>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Beliefs() {
  return (
    <section data-cursor-theme="dark" className="section relative isolate overflow-hidden bg-forest">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <span className="animate-wander absolute -top-24 -left-16 h-80 w-80 rounded-full bg-gold/15 blur-3xl motion-reduce:hidden" />
        <span className="animate-wander absolute -right-20 -bottom-24 h-96 w-96 rounded-full bg-forest-soft/70 blur-3xl [animation-delay:-9s] motion-reduce:hidden" />
      </div>

      <div className="shell">
        <SectionHeading
          eyebrow="How We Work"
          title="Four Things We Hold To"
          lede="Principles are easy to list. These are the ones that decide what happens in the room."
          tone="light"
        />

        <SwipeArea className="mt-8 lg:mt-10" tone="dark">
        <RevealGroup className="swipe-mobile grid gap-px overflow-hidden rounded-2xl bg-ivory/10 max-sm:rounded-none max-sm:bg-transparent sm:grid-cols-2" stagger={0.1}>
          {beliefs.map((belief, i) => (
            <RevealItem
              key={belief.title}
              onPointerMove={trackPointer}
              className="spotlight group relative bg-forest p-6 max-sm:rounded-2xl max-sm:border max-sm:border-ivory/15 sm:p-8"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 right-4 font-display text-[5.5rem] leading-none font-semibold text-transparent [-webkit-text-stroke:1px_rgb(228_210_166/0.25)] select-none group-hover:[-webkit-text-stroke:1px_rgb(228_210_166/0.6)]"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                aria-hidden="true"
                className="block h-px w-8 bg-gold-soft transition-[width] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-16"
              />
              <h3 className="mt-5 max-w-[80%] font-display text-[1.5rem] leading-tight text-ivory">{belief.title}</h3>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ivory/75">{belief.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        </SwipeArea>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description={`${site.name} is led by ${site.founder}, who partners with business owners, professionals and families to create, grow, protect and transfer wealth through structured financial planning.`}
      />

      <PageHeader
        eyebrow="About Parvath"
        title="Financial planning built on two decades of practical experience."
        lede={site.positioning}
        crumb="About"
      />

      <Story />
      <Journey />
      <Expectations />
      <Audiences />
      <Beliefs />

      <CTA
        eyebrow="Work With Us"
        title="See Whether We’re the Right Fit"
        body="A first conversation carries no obligation. If structured planning would not add anything to your situation, we will say so."
      />
    </>
  )
}
