import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'

function WhatsAppIcon({ className = 'h-6 w-6 fill-current' }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.39-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.24.25-.4.08-.17.04-.31-.02-.44s-.56-1.36-.77-1.86c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.25 3.76.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
    </svg>
  )
}

/**
 * Floating action controls:
 * 1. Scroll-to-top button: appears smoothly when scrolling past 300px and scrolls up using Lenis.
 * 2. WhatsApp floating icon in the site palette (forest with a gold ring). On
 *    the home page it stays out of the way while the hero banner is on screen,
 *    and eases in once the visitor scrolls past most of it.
 */
export default function FloatingActions() {
  const [scrollY, setScrollY] = useState(0)
  const { pathname } = useLocation()
  const lenis = useLenis()

  // Track scroll position via Lenis hook
  useLenis((instance) => {
    setScrollY(instance.scroll)
  })

  // Window scroll fallback for non-Lenis or native events
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY || document.documentElement.scrollTop)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const showScrollTop = scrollY > 300
  // Home hero fills the viewport; keep WhatsApp hidden until most of it has scrolled away
  const onHomeHero = pathname === '/' && scrollY < (typeof window === 'undefined' ? 0 : window.innerHeight * 0.6)

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: false, duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const isCalculatorPage = pathname.startsWith('/calculators/') && pathname !== '/calculators'

  return (
    <aside
      aria-label="Quick actions"
      className={`fixed ${
        isCalculatorPage
          ? 'bottom-[calc(5.25rem+env(safe-area-inset-bottom))] lg:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]'
          : 'bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]'
      } right-4 sm:right-6 z-40 flex flex-col items-center gap-3 pointer-events-none transition-[bottom] duration-300`}
    >
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="back-to-top"
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0.75, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-line/70 bg-white/95 text-forest shadow-[0_4px_16px_rgba(23,63,53,0.14)] backdrop-blur-md transition-all duration-300 hover:border-forest/40 hover:bg-forest hover:text-white hover:shadow-lift focus-visible:outline-2 focus-visible:outline-forest focus-visible:outline-offset-2 pointer-events-auto"
          >
            <ArrowUp
              className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-translate-y-0.5"
              strokeWidth={2.2}
            />
            <span
              role="tooltip"
              className="pointer-events-none absolute right-[calc(100%+0.625rem)] top-1/2 -translate-y-1/2 hidden whitespace-nowrap rounded-md bg-forest px-2.5 py-1 text-xs font-medium text-white shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block"
            >
              Back to top
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-forest" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!onHomeHero && (
          <motion.a
            key="whatsapp"
            href={site.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-forest text-gold-soft shadow-[0_10px_28px_-6px_rgba(23,63,53,0.55),0_0_0_4px_rgba(169,136,66,0.16)] transition-[background-color,color,box-shadow,border-color] duration-300 hover:border-gold hover:bg-forest-soft hover:text-ivory hover:shadow-[0_14px_32px_-6px_rgba(23,63,53,0.6),0_0_0_6px_rgba(169,136,66,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest pointer-events-auto sm:h-13 sm:w-13"
          >
            <span
              aria-hidden="true"
              className="animate-ping-soft pointer-events-none absolute inset-0 rounded-full border border-gold motion-reduce:hidden"
            />
            <WhatsAppIcon className="relative h-6 w-6 fill-current transition-transform duration-300 group-hover:scale-110 sm:h-[1.625rem] sm:w-[1.625rem]" />
            <span
              role="tooltip"
              className="pointer-events-none absolute right-[calc(100%+0.625rem)] top-1/2 -translate-y-1/2 hidden whitespace-nowrap rounded-md bg-forest px-2.5 py-1 text-xs font-medium text-white shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block"
            >
              Chat on WhatsApp
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-l-forest" />
            </span>
          </motion.a>
        )}
      </AnimatePresence>
    </aside>
  )
}
