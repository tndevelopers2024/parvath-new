import { motion, useReducedMotion } from 'motion/react'
import { businessPillars } from '../data/site'
import { EASE, viewportOnce } from '../lib/motion'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import Button from './Button'
import { Diamond } from './Ornaments'
import SectionHeading from './SectionHeading'

/** Hairline connectors running from the centre out to each quadrant. */
function Connectors() {
  const reduced = useReducedMotion()
  const lines = [
    'M50 50 L26 27',
    'M50 50 L74 27',
    'M50 50 L26 73',
    'M50 50 L74 73',
  ]

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {lines.map((d, i) =>
        reduced ? (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="#B99A5B"
            strokeOpacity="0.75"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ) : (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="#B99A5B"
            strokeOpacity="0.75"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.1 }}
          />
        ),
      )}
    </svg>
  )
}

/**
 * The strategic centrepiece: four areas of a business owner’s wealth arranged
 * around a single outcome.
 *
 * Desktop draws it as a quadrant diagram with connectors; below `lg` the same
 * four areas recompose as a plain vertical list, with the centre becoming the
 * heading above them. The diagram is decorative — the list reads correctly to
 * a screen reader either way.
 */
export default function BusinessOwners() {
  return (
    <section className="paper section relative overflow-hidden bg-ivory">
      <div className="shell relative">
        <SectionHeading
          eyebrow="For Business Owners"
          title="Your Business Is One Part of Your Wealth Story"
        >
          <Reveal y={16} delay={0.14} className="mx-auto mt-5 max-w-2xl">
            <p className="lede">
              For most owners, the business is the plan. It absorbs the capital, the attention and
              the risk — and it is often the only asset that has grown meaningfully in twenty
              years.
            </p>
            <p className="lede mt-4">
              That concentration is what built the wealth, and it is also the exposure. Planning
              around it means treating four questions as one conversation rather than four separate
              ones.
            </p>
          </Reveal>
        </SectionHeading>

        {/* ---- Quadrant diagram ---- */}
        <div className="relative mx-auto mt-10 max-w-4xl lg:mt-14">
          <Connectors />

          {/* Centre node. A plaque above the list on mobile; centred over the
              grid from `lg`, where its opaque fill also masks the connectors. */}
          <Reveal
            y={0}
            delay={0.35}
            className="mb-8 flex justify-center lg:absolute lg:top-1/2 lg:left-1/2 lg:z-10 lg:mb-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <span className="relative flex h-40 w-40 items-center justify-center rounded-full border border-gold/70 bg-ivory text-center lg:h-48 lg:w-48">
              <span
                aria-hidden="true"
                className="absolute inset-3 rounded-full border border-gold/45"
              />
              <span className="relative px-6 font-display text-[1.0625rem] leading-snug tracking-[0.1em] text-forest uppercase lg:text-[1.1875rem]">
                Your Financial Future
              </span>
            </span>
          </Reveal>

          <RevealGroup
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-x-56 lg:gap-y-40"
            stagger={0.1}
          >
            {businessPillars.map((pillar, i) => (
              <RevealItem
                key={pillar.title}
                className={`group relative rounded-xl border border-line bg-ivory p-6 transition-[border-color,box-shadow] duration-500 hover:border-gold/60 hover:shadow-card sm:p-7 ${
                  i % 2 === 0 ? 'lg:text-right' : ''
                }`}
              >
                <div
                  className={`flex items-center gap-3 ${
                    i % 2 === 0 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <Diamond size={7} className="shrink-0 transition-colors duration-500 group-hover:bg-gold" />
                  <h3 className="font-display text-[1.375rem] leading-tight text-forest">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{pillar.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

        </div>

        <Reveal y={16} className="mt-10 flex justify-center lg:mt-12">
          <Button to="/contact">Discuss Your Business</Button>
        </Reveal>
      </div>
    </section>
  )
}
