import { Phone, Clock, MapPin } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { GoldRule, OrnamentDivider } from '../components/Ornaments'
import { services, site } from '../data/site'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description={`Speak with ${site.founder}, Founder of ${site.name}, about wealth creation, retirement, protection, legacy planning, employee benefits or group gratuity. Call ${site.phoneDisplay}.`}
      />

      <PageHeader
        eyebrow="Contact"
        title="Let’s talk about your financial future."
        lede="Tell us a little about what you would like to discuss and we will get back to you. A first conversation carries no obligation."
      />

      <section className="section bg-ivory">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* ---- Details ---- */}
            <div className="lg:col-span-5">
              <Reveal y={16}>
                <div className="rounded-xl border border-line bg-ivory p-7 sm:p-8">
                  <p className="font-display text-[1.75rem] leading-tight text-forest">
                    {site.founder}
                  </p>
                  <p className="mt-2 text-[0.8125rem] font-medium tracking-[0.12em] text-gold-ink uppercase">
                    {site.founderRole}
                  </p>

                  <GoldRule className="mt-6" width="2.5rem" />

                  <a
                    href={site.phoneHref}
                    className="group mt-6 flex items-center gap-3 text-forest transition-colors duration-300 hover:text-gold-ink"
                  >
                    <Phone aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                    <span className="font-display text-2xl tracking-wide">
                      {site.phoneDisplay}
                    </span>
                  </a>

                  <dl className="mt-7 space-y-4 border-t border-line pt-7">
                    <div className="flex items-start gap-3">
                      <dt className="mt-0.5">
                        <MapPin
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-forest/70"
                          strokeWidth={1.5}
                        />
                        <span className="sr-only">Location</span>
                      </dt>
                      <dd className="text-[0.9375rem] leading-relaxed text-muted">
                        {site.location}
                        <span className="mt-1 block text-[0.75rem] text-muted">
                          Consultations in person or by call.
                        </span>
                      </dd>
                    </div>

                    <div className="flex items-start gap-3">
                      <dt className="mt-0.5">
                        <Clock
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-forest/70"
                          strokeWidth={1.5}
                        />
                        <span className="sr-only">Response time</span>
                      </dt>
                      <dd className="text-[0.9375rem] leading-relaxed text-muted">
                        Enquiries are answered personally, usually within two working days.
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              <Reveal y={16} delay={0.12} className="mt-10">
                <h2 className="text-[0.6875rem] font-medium tracking-[0.18em] text-forest uppercase">
                  Common starting points
                </h2>
                <RevealGroup as="ul" className="mt-5 border-t border-line" stagger={0.06}>
                  {services.map((service) => (
                    <RevealItem
                      as="li"
                      key={service.slug}
                      className="flex items-baseline gap-3 border-b border-line py-3.5"
                    >
                      <span className="font-display text-sm text-gold-ink">{service.number}</span>
                      <span className="text-[0.9375rem] text-muted">{service.title}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </Reveal>
            </div>

            {/* ---- Form ---- */}
            <div className="lg:col-span-7">
              <Reveal y={20}>
                <h2 className="sr-only">Enquiry form</h2>
                <ContactForm />
              </Reveal>

              <Reveal y={16} delay={0.12}>
                <OrnamentDivider className="mt-14" />
                <p className="mt-8 text-center text-[0.8125rem] leading-relaxed text-muted">
                  Prefer to speak directly? Call{' '}
                  <a
                    href={site.phoneHref}
                    className="font-medium text-forest underline decoration-gold/50 underline-offset-4 transition-colors duration-300 hover:text-gold-ink"
                  >
                    {site.phoneDisplay}
                  </a>
                  .
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
