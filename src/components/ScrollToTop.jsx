import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'

// The router owns scroll position; stop the browser restoring the old offset.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

/**
 * Router navigation should land at the top of the new page, but an in-page
 * `#hash` link should still jump to its target.
 *
 * The preloader stops Lenis on every route change, and a stopped Lenis ignores
 * `scrollTo` unless it is forced — without `force` the old offset survived,
 * and a shorter incoming page clamped it down to the footer. The native reset
 * runs alongside so the position is right even before Lenis is ready.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useLayoutEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { offset: -96, immediate: false, force: true })
        } else {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    lenis?.scrollTo(0, { immediate: true, force: true })
  }, [pathname, hash, lenis])

  return null
}
