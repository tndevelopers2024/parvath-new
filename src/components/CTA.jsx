import { Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { EASE, viewportOnce } from '../lib/motion'
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
  const reduced = useReducedMotion()
  const enter = reduced
    ? {}
    : {
        initial: { opacity: 0, scale: 0.94, y: 24 },
        whileInView: { opacity: 1, scale: 1, y: 0 },
        viewport: viewportOnce,
        transition: { duration: 1, ease: EASE },
      }

  return (
    <section className="bg-ivory py-10 sm:py-12 lg:py-14 xl:py-16">
      <div className="shell">
        <motion.div
          {...enter}
          className="relative isolate overflow-hidden rounded-3xl sm:rounded-[2.25rem] bg-forest px-6 py-10 text-center shadow-[0_20px_50px_-15px_rgba(23,63,53,0.3)] border border-forest-soft/40 sm:px-10 sm:py-12 lg:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 motion-reduce:hidden">
            <span className="animate-wander absolute -top-24 -left-16 h-72 w-72 rounded-full bg-gold/25 blur-3xl" />
            <span className="animate-wander absolute -right-20 -bottom-28 h-80 w-80 rounded-full bg-forest-soft/70 blur-3xl [animation-delay:-9s]" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_70%)]"
          >
            <div className="animate-drift absolute top-0 left-0 -right-[52px] -bottom-[52px] [--drift:52px]">
              <JaaliField opacity={0.14} scale={52} tone="#B99A5B" />
            </div>
          </div>

          <div className="relative mx-auto max-w-2xl">
            <SectionHeading eyebrow={eyebrow} title={title} lede={body} tone="light" />

            <Reveal y={16} delay={0.24}>
              <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button to="/contact" variant="light" shimmer>
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
        </motion.div>
      </div>
    </section>
  )
}
