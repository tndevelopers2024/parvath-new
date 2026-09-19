import { services } from '../data/site'
import SectionHeading from './SectionHeading'
import ServiceCard from './ServiceCard'
import Button from './Button'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import SwipeArea from './SwipeArea'

export default function Services({ withCta = true, background = 'bg-ivory' }) {
  return (
    <section id="services" className={`section ${background}`}>
      <div className="shell">
        <SectionHeading
          eyebrow="What We Do"
          title="Financial Planning, Built Around Your Life"
          lede="Eight areas of work, approached as one plan. Most clients begin with a single question and find the rest connected to it."
        />

        <SwipeArea className="mt-8 lg:mt-10">
        <RevealGroup
          className="swipe-mobile grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          stagger={0.08}
          amount={0.12}
        >
          {services.map((service) => (
            <RevealItem key={service.slug} className="h-full" y={32} scale={0.97}>
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>
        </SwipeArea>

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
