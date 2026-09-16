import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/motion'
import { usePreloaderDone } from '../lib/preloader'
import { heroBanner } from '../data/images'
import Button from './Button'

const stripItems = [
  { text: 'Wealth Creation & Strategy', to: '/services/wealth-creation' },
  { text: 'Retirement & Pension Architecture', to: '/services/retirement-planning' },
  { text: 'Comprehensive Life Insurance', to: '/services/life-insurance' },
  { text: 'Generational Legacy Planning', to: '/services/legacy-planning' },
  { text: 'Employee Benefits & Retention', to: '/services/employee-benefits' },
  { text: 'Group Gratuity Valuation & Schemes', to: '/services/group-gratuity' },
  { text: '20+ Years Corporate Experience', to: '/about' },
  { text: '200+ Families & Businesses Served', to: '/contact' },
  { text: 'Unbiased Goal-Based Advisory', to: '/approach' },
]

const slide = heroBanner

/**
 * Editorial hero banner — a single, still frame rather than a slider.
 */
export default function Hero() {
  const reduced = useReducedMotion()
  // Hold the entrance until the preloader curtain starts lifting
  const ready = usePreloaderDone()
  const enter = reduced ? {} : ready ? { opacity: 1, y: 0 } : undefined

  return (
    <section
      data-cursor-theme="dark"
      className="relative isolate flex h-screen min-h-[100vh] items-center overflow-hidden pb-12 lg:pb-0"
    >
      {/* ---- Background banner image ---- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={slide.src}
          alt={slide.alt}
          className={`h-full w-full object-cover ${slide.position || 'object-center'}`}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>

      {/* ---- Content Block ---- */}
      <div className="shell relative z-10 flex flex-col items-start pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36">
        <div className="max-w-2xl text-left [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
          <motion.p
            className="eyebrow text-gold-soft"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={enter}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          >
            {slide.eyebrow}
          </motion.p>

          <motion.h1
            className="display-1 mt-4 text-ivory"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={enter}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          >
            {slide.title}
          </motion.h1>

          <motion.div
            className="mt-6"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={enter}
            transition={{ duration: 0.9, delay: 0.8, ease: EASE }}
          >
            <p className="lede max-w-xl text-left text-ivory font-medium [text-shadow:0_1px_8px_rgba(0,0,0,0.85)]">
              {slide.description}
            </p>

            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button to={slide.primaryCta.to} variant={slide.primaryCta.variant}>
                {slide.primaryCta.label}
              </Button>
              <Button to={slide.secondaryCta.to} variant={slide.secondaryCta.variant} withArrow={false}>
                {slide.secondaryCta.label}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---- Running Loop Marquee Strip at Bottom of Banner ---- */}
      <aside
        aria-label="Practice Highlights"
        className="absolute inset-x-0 bottom-0 z-20 border-t border-gold-soft/20 bg-[#0c241e]/90 py-3 backdrop-blur-md"
      >
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
          <div className="animate-marquee flex items-center gap-8 text-[0.6875rem] font-medium tracking-[0.18em] uppercase text-ivory/85 sm:text-[0.75rem]">
            {[...stripItems, ...stripItems].map((item, idx) => (
              <span key={`${item.text}-${idx}`} className="flex shrink-0 items-center gap-8">
                <Link
                  to={item.to}
                  className="transition-colors duration-200 hover:text-gold-soft whitespace-nowrap cursor-pointer"
                >
                  {item.text}
                </Link>
                <span aria-hidden="true" className="text-gold-soft/60 text-[0.625rem] select-none">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </aside>
    </section>
  )
}
