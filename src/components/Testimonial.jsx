import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '../data/site'
import { EASE } from '../lib/motion'
import SectionHeading from './SectionHeading'
import { QuoteMark } from './Ornaments'

/**
 * Testimonial block.
 *
 * The quotes in `src/data/site.js` are still placeholder copy pending real
 * client testimonials — replace `testimonials` in that file before launch.
 */
export default function Testimonial({ background = 'bg-ivory' }) {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()
  const current = testimonials[index]
  const many = testimonials.length > 1

  const go = (step) =>
    setIndex((i) => (i + step + testimonials.length) % testimonials.length)

  return (
    <section className={`section ${background}`}>
      <div className="shell">
        <SectionHeading eyebrow="In Their Words" title="Relationships That Matter" />

        <div className="relative mx-auto mt-8 max-w-3xl text-center sm:mt-10">
          <QuoteMark className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 text-[9rem] text-gold/30 sm:-top-4 sm:text-[11rem]" />

          <div className="relative min-h-[16rem] sm:min-h-[14rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={reduced ? false : { opacity: 0, y: 12 }}
                animate={reduced ? {} : { opacity: 1, y: 0 }}
                exit={reduced ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <blockquote>
                  <p className="font-display text-2xl leading-[1.45] text-forest sm:text-[2rem]">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-8">
                  <span className="block text-[0.8125rem] font-medium tracking-[0.14em] text-forest uppercase">
                    {current.attribution}
                  </span>
                  <span className="mt-2 block text-[0.8125rem] text-muted">{current.context}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {many && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-forest transition-colors duration-300 hover:border-gold hover:text-gold-ink"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </button>

              <p aria-live="polite" className="text-[0.75rem] tracking-[0.14em] text-muted">
                {String(index + 1).padStart(2, '0')}
                <span className="mx-1.5 text-line">/</span>
                {String(testimonials.length).padStart(2, '0')}
              </p>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-forest transition-colors duration-300 hover:border-gold hover:text-gold-ink"
              >
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
