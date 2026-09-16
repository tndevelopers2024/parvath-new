import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'

/**
 * Router navigation should land at the top of the new page, but an in-page
 * `#hash` link should still jump to its target.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        if (lenis) {
          lenis.scrollTo(el, { offset: -96, immediate: false })
        } else {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
        }
        return
      }
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [pathname, hash, lenis])

  return null
}
