/** Contain keyboard focus in an open overlay, then restore the trigger. */
export function containDialogFocus(container, initialFocus, onEscape) {
  const previous = document.activeElement
  initialFocus?.focus({ preventScroll: true })
  const onKey = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      onEscape()
      return
    }
    if (event.key !== 'Tab' || !container) return
    const focusable = [...container.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
    )].filter((element) => element.tabIndex >= 0 && element.getClientRects().length > 0)
    const first = focusable[0]
    const last = focusable.at(-1)
    if (!first) return
    if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) {
      event.preventDefault()
      first.focus()
    }
  }
  document.addEventListener('keydown', onKey)
  return () => {
    document.removeEventListener('keydown', onKey)
    if (previous instanceof HTMLElement && previous.isConnected) previous.focus({ preventScroll: true })
  }
}
