import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { heroBanner } from '../data/images'
import { useLocation } from 'react-router-dom'
import { isInitialLoad, markPreloaderDone } from '../lib/preloader'
import { JaaliField } from './Ornaments'

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
    // Wait for the same file the hero's <picture> will pick on this screen
    const mobile = heroBanner.mobileSrc && window.matchMedia(heroBanner.mobileMedia).matches
    img.src = mobile ? heroBanner.mobileSrc : heroBanner.src
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
 * Brand intro: the logo wipes up and settles, "Financial Services" eases in
 * beneath it, then a two-layer curtain lift. Progress is tracked internally to
 * time the lift but is not shown.
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
        <img src="/brand/parvath-logo-light.png" alt="" width="640" height="479" className="h-32 w-auto" />
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
          {/* Logo: wipes up from its base while settling out of a slight zoom */}
          <motion.div
            aria-hidden="true"
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            transition={{ duration: 1.1 * k, delay: 0.2 * k, ease: INTRO }}
          >
            <motion.img
              src="/brand/parvath-logo-light.png"
              alt=""
              width="640"
              height="479"
              className="h-32 w-auto sm:h-40"
              initial={{ scale: 1.12, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4 * k, delay: 0.2 * k, ease: INTRO }}
            />
          </motion.div>

          <motion.p
            aria-hidden="true"
            className="mt-6 text-[0.625rem] font-medium text-gold-soft uppercase sm:text-[0.6875rem]"
            initial={{ opacity: 0, letterSpacing: '0.7em' }}
            animate={{ opacity: 1, letterSpacing: '0.42em' }}
            transition={{ duration: 1.4 * k, delay: 1.05 * k, ease: INTRO }}
            style={{ marginRight: '-0.42em' }}
          >
            Financial Services
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  )
}
