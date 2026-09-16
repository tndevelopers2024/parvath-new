import { useSyncExternalStore } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Shared preloader state. The intro plays on the first page load and again on
 * every route change. Anything that animates on arrival (hero, welcome popup)
 * waits until the curtain for the *current* path has started lifting, so the
 * check flips synchronously the moment the path changes.
 */
let donePath = typeof window === 'undefined' ? '*' : null
let initialLoadDone = false
const listeners = new Set()

export function markPreloaderDone(pathname) {
  initialLoadDone = true
  if (donePath === pathname) return
  donePath = pathname
  listeners.forEach((listener) => listener())
}

/** True until the very first intro has finished — that one waits for assets. */
export function isInitialLoad() {
  return !initialLoadDone
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** True once the preloader for the current page has started lifting. */
export function usePreloaderDone() {
  const { pathname } = useLocation()
  const current = useSyncExternalStore(subscribe, () => donePath, () => '*')
  return current === '*' || current === pathname
}
