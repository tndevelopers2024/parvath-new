import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { useLenis } from 'lenis/react'
import { heroBanner } from '../data/images'
import { useLocation } from 'react-router-dom'
import { isInitialLoad, markPreloaderDone } from '../lib/preloader'
import { JaaliField } from './Ornaments'

const WORD = 'PARVATH'
/** Slow in, slow out — the curtain should feel weighted, not snappy. */
const CURTAIN = [0.76, 0, 0.24, 1]
const INTRO = [0.22, 0.61, 0.36, 1]
/** Never hold visitors longer than this, however slow the network. */
const MAX_WAIT_MS = 6000

/** Resolves when fonts and the hero image are ready, or after MAX_WAIT_MS. */
function assetsReady() {
  const fonts = document.fonts?.ready ?? Promise.resolve()
  const hero = new Promise((resolve) => {
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = heroBanner.src
    if (img.complete) resolve()
  })
  const page =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }))
  const cap = new Promise((resolve) => setTimeout(resolve, MAX_WAIT_MS))
  return Promise.race([Promise.all([fonts, hero, page]), cap])
}

/** How long the curtain deliberately holds on a route change, before it lifts. */
const ROUTE_HOLD_S = 2

/**
 * Brand intro: a drawn monogram seal, the wordmark rising letter by letter over
 * a gold progress hairline, then a two-layer curtain lift.
 *
 * The first load waits for fonts and the hero image; every later route change
 * (the component is keyed by pathname) holds for a fixed ROUTE_HOLD_S with the
 * intro choreography compressed to fit.
 */
export default function Preloader() {
  const { pathname } = useLocation()
  // Read once per mount: the first intro of the session waits on assets
  const [initial] = useState(isInitialLoad)
  const [phase, setPhase] = useState('loading')
  const reduced = useReducedMotion()
  /** Scales every intro delay so route changes fit inside ROUTE_HOLD_S. */
  const k = initial ? 1 : 0.5
  const lenis = useLenis()
  const progress = useMotionValue(0)
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, '0'))
  const scaleX = useTransform(progress, [0, 100], [0, 1])

  // Hand over from the static boot screen in index.html
  useEffect(() => {
    document.getElementById('boot-preloader')?.remove()
  }, [])

  // Hold the page still while the intro is up
  useEffect(() => {
    if (phase === 'gone') return
    lenis?.stop()
    const root = document.documentElement
    const { overflow } = root.style
    root.style.overflow = 'hidden'
    return () => {
      root.style.overflow = overflow
      lenis?.start()
    }
  }, [phase, lenis])

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      if (initial) {
        // Creep toward 88% while assets load; the intro takes at least this long
        const creep = animate(progress, 88, { duration: reduced ? 0.4 : 2, ease: INTRO })
        await Promise.all([creep.finished, assetsReady()])
        if (cancelled) return
        await animate(progress, 100, { duration: reduced ? 0.15 : 0.55, ease: INTRO }).finished
        if (cancelled) return
        await new Promise((r) => setTimeout(r, reduced ? 0 : 280))
      } else {
        // Route change: a deliberate, fixed hold — 0→100 then a short beat
        await animate(progress, 100, { duration: ROUTE_HOLD_S - 0.25, ease: INTRO }).finished
        if (cancelled) return
        await new Promise((r) => setTimeout(r, 250))
      }
      if (cancelled) return
      setPhase('exit')
      markPreloaderDone(pathname)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [progress, reduced, initial, pathname])

  if (phase === 'gone') return null

  const exiting = phase === 'exit'
  const finish = () => setPhase('gone')

  if (reduced) {
    return (
      <motion.div
        role="status"
        aria-label="Loading Parvath Financial Services"
        className="fixed inset-0 z-[100] flex items-center justify-center bg-forest"
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        onAnimationComplete={() => exiting && finish()}
      >
        <span className="font-display text-3xl font-bold tracking-[0.3em] text-ivory">{WORD}</span>
      </motion.div>
    )
  }

  return (
    <div role="status" aria-label="Loading Parvath Financial Services" className="fixed inset-0 z-[100]">
      {/* Gold under-layer: trails the main curtain for a fine edge of colour */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-gold"
        initial={{ y: 0 }}
        animate={{ y: exiting ? '-100%' : 0 }}
        transition={{ duration: 1.1, ease: CURTAIN, delay: exiting ? 0.42 : 0 }}
        onAnimationComplete={() => exiting && finish()}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-forest text-ivory"
        initial={{ y: 0 }}
        animate={{ y: exiting ? '-100%' : 0 }}
        transition={{ duration: 1.05, ease: CURTAIN, delay: exiting ? 0.3 : 0 }}
      >
        {/* Lattice backdrop and a soft light from above */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_65%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 * k, ease: INTRO }}
        >
          <JaaliField opacity={0.09} scale={56} tone="#E4D2A6" />
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(228,210,166,0.12),transparent_60%)]"
        />

        <motion.div
          className="relative flex flex-col items-center"
          animate={exiting ? { opacity: 0, y: -28 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: INTRO }}
        >
          {/* Monogram seal */}
          <svg aria-hidden="true" viewBox="0 0 96 96" className="h-20 w-20 sm:h-24 sm:w-24">
            <motion.circle
              cx="48"
              cy="48"
              r="46"
              fill="none"
              stroke="#E4D2A6"
              strokeOpacity="0.55"
              strokeWidth="0.75"
              transform="rotate(-90 48 48)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.4 * k, ease: INTRO }}
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#E4D2A6"
              strokeOpacity="0.25"
              strokeWidth="0.5"
              strokeDasharray="1 3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 * k, delay: 0.6 * k }}
            />
            <motion.path
              d="M48 20 L76 48 L48 76 L20 48 Z"
              fill="none"
              stroke="#A98842"
              strokeWidth="0.9"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1 * k, delay: 0.35 * k, ease: INTRO }}
            />
            <motion.text
              x="48"
              y="49"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#FFFFFF"
              fontFamily="Raleway, sans-serif"
              fontSize="26"
              fontWeight="500"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 * k, delay: 0.75 * k, ease: INTRO }}
            >
              P
            </motion.text>
          </svg>

          {/* Wordmark, letter by letter */}
          <p
            aria-hidden="true"
            className="mt-8 flex font-display text-[2rem] font-semibold tracking-[0.32em] text-ivory sm:text-[2.75rem]"
            style={{ marginRight: '-0.32em' }}
          >
            {WORD.split('').map((letter, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9 * k, delay: (0.55 + i * 0.07) * k, ease: INTRO }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </p>

          <motion.p
            aria-hidden="true"
            className="mt-3 text-[0.625rem] font-medium text-gold-soft uppercase sm:text-[0.6875rem]"
            initial={{ opacity: 0, letterSpacing: '0.7em' }}
            animate={{ opacity: 1, letterSpacing: '0.42em' }}
            transition={{ duration: 1.4 * k, delay: 1.05 * k, ease: INTRO }}
            style={{ marginRight: '-0.42em' }}
          >
            Financial Services
          </motion.p>

          {/* Progress hairline */}
          <motion.div
            className="mt-12 flex w-56 items-center gap-4 sm:w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 * k, delay: initial ? 1.2 : 0.1 }}
          >
            <span className="relative h-px flex-1 overflow-hidden bg-ivory/15">
              <motion.span
                className="absolute inset-0 origin-left bg-linear-to-r from-gold to-gold-soft"
                style={{ scaleX }}
              />
            </span>
            <motion.span className="w-8 text-right font-sans text-[0.6875rem] tracking-[0.12em] text-ivory/60 tabular-nums">
              {counter}
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Footer line */}
        <motion.p
          aria-hidden="true"
          className="absolute bottom-8 text-[0.625rem] tracking-[0.36em] text-ivory/40 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.8 * k, delay: exiting ? 0 : 1.4 * k }}
        >
          Plan &middot; Protect &middot; Grow
        </motion.p>
      </motion.div>
    </div>
  )
}
