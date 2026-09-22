import { Building2, Landmark, Sunrise, Wallet } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { businessPillars } from '../data/site'
import { EASE, trackPointer, viewportOnce } from '../lib/motion'
import Reveal, { RevealGroup, RevealItem } from './Reveal'
import Button from './Button'
import SectionHeading from './SectionHeading'
import SwipeArea from './SwipeArea'

// In data order: Personal Wealth, Business Continuity, Retirement, Family Legacy.
const icons = [Wallet, Building2, Sunrise, Landmark]

/**
 * The gold cross dividing the panel into quadrants. Both arms draw outward
 * from the centre, so the medallion reads as the point everything meets.
 */
function Cross() {
  const reduced = useReducedMotion()
  const arms = [
    'absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-gold/70 to-transparent',
    'absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/70 to-transparent',
  ]

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      {arms.map((cls, i) =>
        reduced ? (
          <span key={cls} className={cls} />
        ) : (
          <motion.span
            key={cls}
            className={cls}
            initial={i === 0 ? { scaleX: 0 } : { scaleY: 0 }}
            whileInView={i === 0 ? { scaleX: 1 } : { scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          />
        ),
      )}

      {/* Four pulses, one per question, running in toward the medallion */}
      {!reduced && (
        <>
          <span className="absolute top-1/2 left-0 h-0 w-1/2">
            <span className="animate-converge-x absolute top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(169,136,66,0.45)]" />
          </span>
          <span className="absolute top-1/2 right-0 h-0 w-1/2 rotate-180">
            <span className="animate-converge-x absolute top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(169,136,66,0.45)] [animation-delay:-0.9s]" />
          </span>
          <span className="absolute top-0 left-1/2 h-1/2 w-0 [--stop:6.5rem]">
            <span className="animate-converge-y absolute left-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(169,136,66,0.45)] [animation-delay:-1.8s]" />
          </span>
          <span className="absolute bottom-0 left-1/2 h-1/2 w-0 rotate-180 [--stop:6.5rem]">
            <span className="animate-converge-y absolute left-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(169,136,66,0.45)] [animation-delay:-2.7s]" />
          </span>
        </>
      )}
    </div>
  )
}

/**
 * "Your Financial Future" seal. Around it, the four questions circle on a slow
 * text ring; inside, a dashed orbit turns and the forest core breathes light.
 */
function Medallion() {
  const ring = businessPillars.map((p) => p.title).join('  ✦  ') + '  ✦  '

  return (
    <span className="relative isolate flex h-40 w-40 items-center justify-center rounded-full border border-gold/70 bg-ivory text-center shadow-[0_0_0_10px_var(--color-ivory)] lg:h-44 lg:w-44">
      {/* Rotating text ring, sitting just outside the seal */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 200"
        className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 h-[13rem] w-[13rem] -translate-x-1/2 -translate-y-1/2 [animation-duration:36s] lg:h-[14rem] lg:w-[14rem]"
      >
        <defs>
          <path id="medallion-ring" d="M100,100 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
        </defs>
        <text fill="#7c5c20" fontSize="8.4" fontWeight="500" letterSpacing="2.2" style={{ textTransform: 'uppercase' }}>
          <textPath href="#medallion-ring" textLength="548" lengthAdjust="spacing">
            {ring}
          </textPath>
        </text>
      </svg>

      <span
        aria-hidden="true"
        className="animate-ripple absolute inset-0 -z-10 rounded-full border border-gold/60 motion-reduce:hidden"
      />
      <span
        aria-hidden="true"
        className="animate-ripple absolute inset-0 -z-10 rounded-full border border-gold/60 [animation-delay:1.6s] motion-reduce:hidden"
      />
      <span
        aria-hidden="true"
        className="animate-spin-slow absolute inset-2.5 rounded-full border border-dashed border-gold/55 [animation-direction:reverse]"
      />
      <span aria-hidden="true" className="animate-glow absolute inset-5 rounded-full bg-forest" />
      <span className="relative px-8 font-display text-[0.9375rem] leading-snug tracking-[0.12em] text-ivory uppercase lg:text-base">
        Your Financial Future
      </span>
    </span>
  )
}

/**
 * The strategic centrepiece: four areas of a business owner's wealth arranged
 * around a single outcome.
 *
 * From `lg` it is one panel quartered by a gold cross with the medallion at
 * the intersection; each quadrant keeps its copy to the outer corner so the
 * centre stays clear. Below `lg` the medallion sits above a plain ruled list.
 */
export default function BusinessOwners() {
  return (
    <section id="business-owners" className="paper section relative overflow-hidden bg-ivory">
      <div className="shell relative">
        <SectionHeading
          eyebrow="For Business Owners"
          title="Your Business Is One Part of Your Wealth Story"
        >
          <Reveal y={16} delay={0.3} className="mx-auto mt-5 max-w-2xl">
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

        <div className="relative mx-auto mt-8 max-w-5xl lg:mt-10">
          {/* Medallion: above the list on mobile, on the intersection from `lg` */}
          <Reveal
            y={0}
            delay={0.5}
            className="mb-12 mt-4 flex justify-center lg:absolute lg:mt-0 lg:top-1/2 lg:left-1/2 lg:z-10 lg:mb-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <Medallion />
          </Reveal>

          <div className="relative overflow-hidden rounded-2xl bg-line p-px shadow-card max-sm:overflow-visible max-sm:bg-transparent max-sm:p-0 max-sm:shadow-none">
            <span
              aria-hidden="true"
              className="animate-spin-slow pointer-events-none absolute top-1/2 left-1/2 aspect-square max-sm:hidden w-[160%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_290deg,#a98842_345deg,transparent_360deg)] [animation-duration:10s] motion-reduce:hidden"
            />
            <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-white max-sm:overflow-visible max-sm:bg-transparent">
            <Cross />

            <SwipeArea>
            <RevealGroup
              as="ol"
              className="swipe-mobile grid divide-y divide-line max-sm:divide-y-0 lg:grid-cols-2 lg:divide-y-0"
              stagger={0.12}
              amount={0.15}
            >
              {businessPillars.map((pillar, i) => {
                const Icon = icons[i]
                const left = i % 2 === 0
                const top = i < 2
                const inset = [
                  left ? 'lg:pr-40' : 'lg:pl-40',
                  top ? 'lg:pb-28' : 'lg:pt-28',
                ].join(' ')

                return (
                  <RevealItem
                    as="li"
                    key={pillar.title}
                    x={left ? -24 : 24}
                    y={top ? -12 : 12}
                    onPointerMove={trackPointer}
                    className={`spotlight group relative flex gap-5 p-6 max-sm:flex-col max-sm:gap-4 max-sm:rounded-2xl max-sm:border max-sm:border-line max-sm:bg-white max-sm:p-5 sm:p-8 lg:p-10 ${inset} ${
                      left ? '' : 'lg:flex-row-reverse lg:text-right'
                    }`}
                  >
                    <span
                      className="animate-float flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft"
                      style={{ animationDelay: `${i * -1.5}s` }}
                    >
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-[8deg]"
                        strokeWidth={1.5}
                      />
                    </span>

                    <div className="min-w-0">
                      <p className="text-[0.6875rem] font-medium tracking-[0.2em] text-gold-ink uppercase">
                        Question {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-2 font-display text-[1.5rem] leading-tight text-forest">
                        {pillar.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className={`mt-3 block h-px w-8 bg-gold transition-[width] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-14 ${
                          left ? '' : 'lg:ml-auto'
                        }`}
                      />
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{pillar.body}</p>
                    </div>
                  </RevealItem>
                )
              })}
            </RevealGroup>
            </SwipeArea>
            </div>
          </div>
        </div>

        <Reveal y={16} className="mt-8 flex justify-center lg:mt-10">
          <Button to="/contact">Discuss Your Business</Button>
        </Reveal>
      </div>
    </section>
  )
}
