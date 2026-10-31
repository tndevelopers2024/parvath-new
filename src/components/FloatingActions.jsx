import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUp } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { useLocation } from 'react-router-dom'
import { site } from '../data/site'

function WhatsAppIcon({ className = 'h-6 w-6' }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.905.534 3.684 1.458 5.203L2.052 22l4.945-1.396A9.957 9.957 0 0012.004 22c5.524 0 10.004-4.48 10.004-10.004 0-5.52-4.48-10-10.004-10z"
      />
      <path
        fill="#173f35"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
      />
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
