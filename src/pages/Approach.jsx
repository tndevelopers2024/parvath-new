import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import Process from '../components/Process'
import BusinessOwners from '../components/BusinessOwners'
import WhyParvath from '../components/WhyParvath'
import Testimonial from '../components/Testimonial'
import CTA from '../components/CTA'
import SectionHeading from '../components/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { Diamond } from '../components/Ornaments'

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

export default function Approach() {
  return (
    <>
      <Seo
        title="Approach"
        path="/approach"
        description="A four-step financial planning process — understand, plan, implement, review — and what to expect at each stage of working with Parvath Financial Services."
      />

      <PageHeader
        eyebrow="Our Approach"
        title="Structured, unhurried, and revisited as life changes."
        lede="Good planning is less about a single brilliant decision than about a sound structure, followed consistently and reviewed honestly. Here is how that works in practice."
      />

      <Process eyebrow="The Process" />

      <section className="section border-y border-line bg-ivory">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="What to Expect"
                title="From First Call to Ongoing Review"
              />
              <Reveal y={16} delay={0.16} className="mt-8">
                <p className="lede">
                  There is no obligation attached to a first conversation, and no recommendation is
                  made in it. If structured planning would not add anything to your situation, that
                  is a reasonable outcome and we will say so.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <RevealGroup as="dl" className="border-t border-line" stagger={0.08}>
                {expectations.map((item) => (
                  <RevealItem
                    key={item.stage}
                    className="group flex flex-col gap-2 border-b border-line py-7 transition-colors duration-500 sm:flex-row sm:gap-10 hover:border-gold/50"
                  >
                    <dt className="flex items-baseline gap-3 sm:w-52 sm:shrink-0">
                      <Diamond
                        size={6}
                        className="shrink-0 transition-colors duration-500 group-hover:bg-gold"
                      />
                      <span className="font-display text-xl leading-tight text-forest">
                        {item.stage}
                      </span>
                    </dt>
                    <dd className="pl-[1.125rem] text-[0.9375rem] leading-relaxed text-muted sm:pl-0">
                      {item.body}
                    </dd>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      <BusinessOwners />
      <WhyParvath />
      <Testimonial />
      <CTA />
    </>
  )
}
