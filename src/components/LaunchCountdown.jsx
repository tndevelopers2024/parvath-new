import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { launchConfig, site } from '../data/site'
import { getTimeRemaining, padTwo } from '../lib/countdown'
import { EASE } from '../lib/motion'
import { GoldRule, JaaliField } from './Ornaments'

const TIME_UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
]

/**
 * Full-page pre-launch lock screen with a live countdown to `launchConfig.targetDate`.
 * Styled in the Parvath forest-and-gold editorial palette.
 */
export default function LaunchCountdown() {
  const [remaining, setRemaining] = useState(() => getTimeRemaining(launchConfig.targetDate))
  const reduced = useReducedMotion()

  // Clear the static boot preloader from index.html once React mounts.
  useEffect(() => {
    document.getElementById('boot-preloader')?.remove()
  }, [])

  useEffect(() => {
    const update = () => setRemaining(getTimeRemaining(launchConfig.targetDate))
    update()
    const timerId = window.setInterval(update, 1000)
    return () => window.clearInterval(timerId)
  }, [])

  const fadeUp = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ease: EASE, delay },
        }

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-forest text-ivory selection:bg-gold/30 selection:text-ivory">
      {/* Subtle heritage lattice backdrop */}
      <JaaliField
        className="pointer-events-none fixed inset-0 h-full w-full"
        opacity={0.07}
        scale={56}
        tone="#E4D2A6"
      />

      {/* Ambient radial vignette for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(169,136,66,0.12)_0%,transparent_58%)]"
      />

      {/* Top brand bar */}
      <header className="relative z-10 w-full border-b border-ivory/10">
        <div className="shell flex items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-3">
            <img
              src="/brand/parvath-logo-light.png"
              alt={site.name}
              className="h-10 w-auto object-contain sm:h-11"
            />
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/40 bg-forest-soft/35 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.2em] text-gold-soft uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-soft" aria-hidden="true" />
            Launching Soon
          </span>
        </div>
      </header>

      {/* Centerpiece */}
      <main id="main" className="relative z-10 flex flex-1 items-center py-12 sm:py-16">
        <div className="shell mx-auto max-w-4xl text-center">
          <motion.div {...fadeUp(0)} className="flex flex-col items-center">
            <p className="text-xs font-medium tracking-[0.26em] text-gold-soft uppercase">
              {site.name}
            </p>
            <GoldRule className="mt-4" width="4rem" tone="bg-gold-soft/70" />
          </motion.div>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-7 font-display text-3xl leading-[1.15] font-semibold tracking-tight text-ivory sm:text-5xl lg:text-[3.5rem]"
          >
            {remaining.isLaunched
              ? 'We Are Launching Today'
              : 'Our New Digital Home Is Arriving Soon'}
          </motion.h1>

          <motion.p
            {...fadeUp(0.16)}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg"
          >
            {site.positioning}
          </motion.p>

          {/* Countdown grid */}
          <motion.div
            {...fadeUp(0.24)}
            role="timer"
            aria-label={`Countdown to launch on ${launchConfig.launchDateLabel}`}
            className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4 sm:gap-5"
          >
            {TIME_UNITS.map(({ key, label }) => (
              <div
                key={key}
                className="group relative overflow-hidden rounded-sm border border-gold/30 bg-ivory/[0.04] px-4 py-6 backdrop-blur-xs transition-colors duration-300 hover:border-gold-soft/60 sm:px-5 sm:py-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-soft/50 to-transparent"
                />
                <div
                  className="font-display text-4xl font-semibold tracking-tight text-ivory tabular-nums sm:text-5xl"
                  aria-live="off"
                >
                  {padTwo(remaining[key])}
                </div>
                <div className="mt-2.5 text-[11px] font-medium tracking-[0.24em] text-gold-soft uppercase">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div {...fadeUp(0.28)} className="mt-6 flex justify-center">
            <div className="inline-flex flex-col items-center gap-1 rounded-2xl border border-gold/40 bg-forest-soft/35 px-5 py-2.5 text-center text-xs font-medium tracking-[0.16em] text-gold-soft uppercase sm:flex-row sm:gap-2.5 sm:rounded-full sm:py-2">
              <span className="inline-flex items-center gap-2 whitespace-nowrap">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-soft" aria-hidden="true" />
                <span>Going Live</span>
              </span>
              <span className="hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <span className="whitespace-nowrap">{launchConfig.launchDateLabel}</span>
            </div>
          </motion.div>

          {/* Pre-launch advisory contact */}
          <motion.div
            {...fadeUp(0.32)}
            className="mx-auto mt-10 max-w-2xl border-t border-ivory/12 pt-8 sm:mt-12"
          >
            <p className="text-xs font-medium tracking-[0.2em] text-ivory/65 uppercase">
              Need Advisory Assistance Before Launch?
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-sm border border-ivory/20 bg-ivory/[0.04] px-4 py-2.5 text-sm text-ivory transition-colors hover:border-gold-soft/60 hover:text-gold-soft"
              >
                <Phone className="h-4 w-4 text-gold-soft" aria-hidden="true" />
                <span>{site.phoneDisplay}</span>
              </a>
              <a
                href={site.emailHref}
                className="inline-flex items-center gap-2 rounded-sm border border-ivory/20 bg-ivory/[0.04] px-4 py-2.5 text-sm text-ivory transition-colors hover:border-gold-soft/60 hover:text-gold-soft"
              >
                <Mail className="h-4 w-4 text-gold-soft" aria-hidden="true" />
                <span>{site.email}</span>
              </a>
              <a
                href={site.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-gold/50 bg-gold/15 px-4 py-2.5 text-sm font-medium text-gold-soft transition-colors hover:bg-gold/25 hover:text-ivory"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-ivory/10 py-5">
        <div className="shell flex flex-col items-center justify-between gap-2 text-center text-xs text-ivory/60 sm:flex-row sm:text-left">
          <p className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-gold-soft/80" aria-hidden="true" />
            <span>{site.location}</span>
          </p>
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
