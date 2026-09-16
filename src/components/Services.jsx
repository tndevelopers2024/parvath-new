import { services } from '../data/site'
import SectionHeading from './SectionHeading'
import ServiceCard from './ServiceCard'
import Button from './Button'
import Reveal, { RevealGroup, RevealItem } from './Reveal'

export default function Services({ withCta = true, background = 'bg-ivory' }) {
  return (
    <section id="services" className={`section ${background}`}>
      <div className="shell">
        <SectionHeading
          eyebrow="What We Do"
          title="Financial Planning, Built Around Your Life"
          lede="Six areas of work, approached as one plan. Most clients begin with a single question and find the rest connected to it."
        />

        <RevealGroup
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6"
          stagger={0.08}
          amount={0.12}
        >
          {services.map((service) => (
            <RevealItem key={service.slug} className="h-full">
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>

        {withCta && (
          <Reveal y={16} className="mt-8 flex justify-center">
            <Button to="/services" variant="secondary" withArrow={false}>
              View All Services
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  )
}
