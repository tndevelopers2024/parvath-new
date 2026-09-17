import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EASE } from '../lib/motion'
import { usePreloaderDone } from '../lib/preloader'
import { heroBanner } from '../data/images'
import Button from './Button'
import { SplitWords } from './Reveal'

const slide = heroBanner

/**
 * Editorial hero banner — a single frame rather than a slider. On arrival the
 * photograph settles from a slow push-in and the headline rises word by word;
 * on scroll the photograph drifts slower than the page and the copy eases out.
 */
export default function Hero() {
  const reduced = useReducedMotion()
  // Hold the entrance until the preloader curtain starts lifting
  const ready = usePreloaderDone()
  const enter = reduced ? {} : ready ? { opacity: 1, y: 0 } : undefined

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={sectionRef}
      data-cursor-theme="dark"
      className="relative isolate flex h-dvh min-h-dvh items-start overflow-hidden lg:items-center"
    >
      {/* ---- Background banner image ---- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="h-full w-full" style={reduced ? undefined : { y: imageY }}>
          <div className="animate-breathe h-full w-full">
          <picture className="block h-full w-full">
          {slide.mobileSrc && <source media={slide.mobileMedia} srcSet={slide.mobileSrc} type="image/avif" />}
          <motion.img
            src={slide.src}
            alt={slide.alt}
            className={`h-full w-full object-cover ${slide.position || 'object-center'}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            initial={reduced ? false : { scale: 1.14 }}
            animate={reduced ? undefined : ready ? { scale: 1.04 } : undefined}
            transition={{ duration: 2.8, ease: EASE }}
          />
          </picture>
          </div>
        </motion.div>
        {/* Small screens: the headline sits over the photo, so shade the top half */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 via-45% to-transparent to-60% lg:hidden"
        />
      </div>

      {/* ---- Content Block ---- */}
      <motion.div
        className="shell relative z-10 flex flex-col items-start max-[370px]:px-5 pt-[5.5rem] pb-14 min-[400px]:pt-24 sm:pt-32 sm:pb-16 lg:pt-36"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-2xl text-left [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]">
          <motion.p
            className="eyebrow text-gold-soft"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={enter}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          >
            {slide.eyebrow}
          </motion.p>

          <h1 className="display-1 mt-3 text-ivory max-[400px]:text-[2rem] max-[370px]:text-[1.875rem] sm:mt-4">
            <SplitWords text={slide.title} trigger={ready} delay={0.65} stagger={0.07} />
          </h1>

          <motion.div
            className="mt-4 sm:mt-6"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={enter}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          >
            <p className="lede max-w-xl text-left text-ivory font-medium [text-shadow:0_1px_8px_rgba(0,0,0,0.85)] max-[400px]:text-[0.9375rem] max-[400px]:leading-relaxed">
              <span className="sm:hidden">{slide.mobileDescription ?? slide.description}</span>
              <span className="hidden sm:inline">{slide.description}</span>
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-1.5 min-[370px]:gap-2 min-[400px]:gap-2.5 sm:mt-8 sm:gap-4">
              <Button
                to={slide.primaryCta.to}
                variant={slide.primaryCta.variant}
                shimmer
                className="border border-transparent max-sm:px-4 max-sm:py-3 max-sm:text-[0.6875rem] max-sm:tracking-[0.04em] max-[400px]:px-3.5! max-[400px]:tracking-[0.02em]! max-[400px]:[&>svg]:hidden! max-[370px]:px-3! max-[370px]:text-[0.625rem]!"
              >
                {slide.primaryCta.label}
              </Button>
              <Button
                to={slide.secondaryCta.to}
                variant={slide.secondaryCta.variant}
                withArrow={false}
                className="max-sm:px-4 max-sm:py-3 max-sm:text-[0.6875rem] max-sm:tracking-[0.04em] max-[400px]:px-3.5! max-[400px]:tracking-[0.02em]! max-[370px]:px-3! max-[370px]:text-[0.625rem]!"
              >
                {slide.secondaryCta.label}
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
