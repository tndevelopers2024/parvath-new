import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Seo from './Seo'
import PageHeader from './PageHeader'
import CTA from './CTA'
import Process from './Process'
import EditorialImage from './EditorialImage'
import SectionHeading from './SectionHeading'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import { Diamond } from './Ornaments'
import { services } from '../data/site'
import { images } from '../data/images'

/**
 * Shared template behind the six service pages. Each page file passes its slug;
 * all copy comes from `services` in src/data/site.js.
 */
export default function ServiceDetail({ slug }) {
  const service = services.find((s) => s.slug === slug)
  const others = services.filter((s) => s.slug !== slug)

  return (
    <>
      <Seo
        title={service.title}
        path={service.path}
        description={service.summary}
        type="article"
      />

      <PageHeader eyebrow={`Service ${service.number}`} title={service.title} lede={service.intro}>
        <Reveal y={14} delay={0.24} className="mt-8">
          <p className="inline-flex items-center gap-2.5 rounded-sm border border-line bg-ivory px-3.5 py-2.5 text-[0.75rem] tracking-[0.06em] text-muted">
            <Diamond size={6} />
            {service.forWhom}
          </p>
        </Reveal>
      </PageHeader>

      <section className="section bg-ivory">
        <div className="shell">
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="The Approach"
                title="What This Work Involves"
              />

              <Reveal y={16} delay={0.16} className="mt-8">
                {service.detail.map((paragraph) => (
                  <p key={paragraph} className="lede mt-5 first:mt-0">
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              <RevealGroup as="dl" className="mt-12 border-t border-line" stagger={0.08}>
                {service.points.map((point) => (
                  <RevealItem
                    key={point.title}
                    className="group flex flex-col gap-1.5 border-b border-line py-6 transition-colors duration-500 sm:flex-row sm:items-baseline sm:gap-10 hover:border-gold/50"
                  >
                    <dt className="flex items-baseline gap-3 sm:w-56 sm:shrink-0">
                      <Diamond
                        size={6}
                        className="shrink-0 transition-colors duration-500 group-hover:bg-gold"
                      />
                      <span className="font-display text-xl text-forest">{point.title}</span>
                    </dt>
                    <dd className="pl-[1.125rem] text-[0.9375rem] leading-relaxed text-muted sm:pl-0">
                      {point.body}
                    </dd>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <EditorialImage image={images.legacy} frameSide="right" className="lg:pr-6" />

              <Reveal y={16} className="mt-12">
                <h2 className="text-[0.6875rem] font-medium tracking-[0.18em] text-forest uppercase">
                  Related services
                </h2>
                <ul className="mt-5 border-t border-line">
                  {others.map((other) => (
                    <li key={other.slug}>
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
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Process eyebrow="How It Works" background="bg-ivory" className="border-y border-line" />

      <CTA
        eyebrow="Next Step"
        title={`Let’s talk about ${service.title.toLowerCase()}.`}
        body="A first conversation is simply that — an hour to understand where things stand and whether structured planning would help."
      />
    </>
  )
}
