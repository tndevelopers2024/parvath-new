import { ClipboardList, RefreshCcw, Rocket, Search } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { processSteps } from '../data/site'
import { EASE, viewportOnce } from '../lib/motion'
import SectionHeading from './SectionHeading'
import { RevealGroup, RevealItem } from './Reveal'

const iconMap = { Search, ClipboardList, Rocket, RefreshCcw }

/** Icon-in-circle marker that sits on the connecting spine. */
function Marker({ Icon, size = 'lg' }) {
  const dims = size === 'lg' ? 'h-11 w-11' : 'h-8 w-8'
  const icon = size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'
  return (
    <span
      className={`flex ${dims} shrink-0 items-center justify-center rounded-full border border-gold/60 bg-forest text-gold-soft shadow-[0_0_0_6px_rgba(169,136,66,0.12)]`}
    >
      <Icon aria-hidden="true" className={icon} strokeWidth={1.75} />
    </span>
  )
}

/**
 * Four-step journey down a connecting spine: steps alternate left/right of a
 * centred line from `lg`, each landing on a marker; below `lg` the same spine
 * moves to a left rail and every card stacks full-width.
 */
export default function Process({ eyebrow = 'Our Process', background = 'bg-ivory', className = '' }) {
  const reduced = useReducedMotion()

  const spine = (orientation) => {
    const centered = orientation === 'centered'
    const shared = 'absolute bg-line'
    const position = centered
      ? `${shared} top-2 bottom-2 left-1/2 hidden w-px origin-top -translate-x-1/2 lg:block`
      : `${shared} top-2 bottom-2 left-4 w-px origin-top lg:hidden`

    if (reduced) return <span aria-hidden="true" className={position} />

    return (
      <motion.span
        aria-hidden="true"
        className={position}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: EASE }}
      />
    )
  }

  return (
    <section className={`section ${background} ${className}`}>
      <div className="shell">
        <SectionHeading
          eyebrow={eyebrow}
          title="A Clear Path Forward"
          lede="Four steps, repeated for as long as we work together. The fourth is the one that keeps the first three honest."
        />

        <div className="relative mt-14 lg:mt-16">
          {spine('centered')}
          {spine('left')}

          <RevealGroup as="ol" className="flex flex-col gap-10 lg:gap-0" stagger={0.16} amount={0.12}>
            {processSteps.map((step, i) => {
              const Icon = iconMap[step.icon]
              const isRight = i % 2 === 1

              return (
                <RevealItem
                  as="li"
                  key={step.number}
                  className={`relative pl-12 lg:pl-0 ${i > 0 ? 'lg:-mt-12' : ''}`}
                  y={18}
                >
                  {/* Mobile marker, on the left rail */}
                  <span className="absolute top-1 left-0 lg:hidden">
                    <Marker Icon={Icon} size="sm" />
                  </span>

                  <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-16">
                    {/* Desktop marker, centred on the spine at this step's height */}
                    <span className="absolute top-1/2 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
                      <Marker Icon={Icon} />
                    </span>

                    {/* Cards hug the spine: left steps align right, right steps align left */}
                    <div
                      className={
                        isRight ? 'lg:col-start-2 lg:flex lg:justify-start' : 'lg:col-start-1 lg:flex lg:justify-end'
                      }
                    >
                      <div className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-card sm:p-7 lg:max-w-md">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -right-2 -bottom-6 font-display text-[5rem] leading-none font-semibold text-forest/[0.05] select-none sm:text-[6rem]"
                        >
                          {step.number}
                        </span>

                        <div className="relative flex items-start justify-between gap-4">
                          <h3 className="font-display text-[1.5rem] leading-tight text-forest sm:text-[1.625rem]">
                            {step.title}
                          </h3>
                          <span className="mt-1 shrink-0 text-[0.6875rem] font-medium tracking-[0.14em] text-muted uppercase">
                            {step.number}/04
                          </span>
                        </div>

                        <p className="relative mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                          {step.body}
                        </p>

                        {step.tags?.length > 0 && (
                          <div className="relative mt-5 flex flex-wrap gap-2 pr-16">
                            {step.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-line px-3 py-1 text-[0.625rem] font-medium tracking-[0.08em] text-muted uppercase"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealItem>
              )
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
