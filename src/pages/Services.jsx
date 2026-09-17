import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import ServiceCard from '../components/ServiceCard'
import Process from '../components/Process'
import CTA from '../components/CTA'
import { RevealGroup, RevealItem } from '../components/Reveal'
import SwipeArea from '../components/SwipeArea'
import { services } from '../data/site'

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        path="/services"
        description="Wealth creation, retirement planning, life insurance, legacy planning, employee benefit solutions and group gratuity schemes — six areas of financial planning, approached as one plan."
      />

      <PageHeader
        eyebrow="Services"
        title="Six areas of work. One plan."
        lede="Most people arrive with one question — a retirement date, a policy that needs reviewing, a business that has outgrown its original structure. The work usually turns out to touch more than one of these."
      />

      <section className="section bg-ivory">
        <div className="shell">
          <h2 className="sr-only">All services</h2>
          <SwipeArea>
          <RevealGroup
            className="swipe-mobile grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
            stagger={0.08}
            amount={0.1}
          >
            {services.map((service) => (
              <RevealItem key={service.slug} className="h-full">
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
          </SwipeArea>
        </div>
      </section>

      <Process eyebrow="How It Works" background="bg-ivory" className="border-y border-line" />
      <CTA />
    </>
  )
}
