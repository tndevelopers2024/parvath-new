import { Phone } from 'lucide-react'
import { site } from '../data/site'
import Reveal from './Reveal'
import Button from './Button'
import { JaaliField } from './Ornaments'
import SectionHeading from './SectionHeading'

/**
 * The single dark moment on an otherwise light site — deep forest, used once,
 * as the closing anchor.
 */
export default function CTA({
  eyebrow = 'Get in Touch',
  title = 'Let’s Start a Conversation',
  body = 'Whether you’re building wealth, preparing for retirement, protecting your family, or planning the future of your business, the first step is a conversation.',
}) {
  return (
    <section className="bg-ivory py-14 sm:py-18 lg:py-20">
      <div className="shell">
        <div className="relative isolate overflow-hidden rounded-3xl sm:rounded-[2.25rem] bg-forest px-6 py-16 text-center shadow-[0_20px_50px_-12px_rgba(23,63,53,0.3)] border border-forest-soft/40 md:py-20 lg:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_70%)]"
          >
            <JaaliField opacity={0.14} scale={52} tone="#B99A5B" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <SectionHeading eyebrow={eyebrow} title={title} lede={body} tone="light" />

            <Reveal y={16} delay={0.24}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button to="/contact" variant="light">
                  Book a Consultation
                </Button>
                <a
                  href={site.phoneHref}
                  className="group inline-flex items-center gap-2.5 py-2 text-ivory/85 transition-colors duration-300 hover:text-ivory"
                >
                  <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                  <span className="font-display text-xl tracking-wide">{site.phoneDisplay}</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
