import { useLayoutEffect, useRef } from 'react'
import { animate, useReducedMotion } from 'motion/react'
import { formatINR, formatYears, formatMonths, formatPercent } from '../../lib/format'

const formatters = {
  currency: formatINR,
  years: formatYears,
  months: formatMonths,
  percent: formatPercent,
}

/**
 * A formatted figure that glides from its previous value to the new one, so
 * dragging a slider reads as the result moving rather than flickering. The
 * text is owned by this effect and written straight to the node (React renders
 * no children here), so there is no re-render per frame and no reconciliation
 * fighting the animation.
 */
export function AnimatedValue({ value, format, className = '' }) {
  const fmt = formatters[format] ?? formatINR
  const ref = useRef(null)
  const previous = useRef(value)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    const from = Number.isFinite(previous.current) ? previous.current : 0
    const to = Number.isFinite(value) ? value : 0
    previous.current = to
    if (reduced || from === to) {
      node.textContent = fmt(to)
      return
    }
    const controls = animate(from, to, {
      duration: 0.5,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (n) => {
        node.textContent = fmt(n)
      },
    })
    return () => controls.stop()
  }, [value, fmt, reduced])

  return (
    <span ref={ref} className={className} />
  )
}

/**
 * One line of calculator output — a large emphasized headline figure, or a
 * smaller supporting one. `tone="dark"` sets it for the forest results card.
 */
export default function ResultStat({ label, value, format, emphasis, tone = 'light' }) {
  const dark = tone === 'dark'

  if (emphasis) {
    return (
      <div aria-live="polite">
        <p className={`text-[0.6875rem] font-medium tracking-[0.14em] uppercase ${dark ? 'text-ivory/65' : 'text-muted'}`}>
          {label}
        </p>
        <AnimatedValue
          value={value}
          format={format}
          className={`stat-figure mt-1.5 block break-words tabular-nums ${dark ? 'text-ivory' : ''}`}
        />
      </div>
    )
  }

  return (
    <div
      className={`flex items-baseline justify-between gap-4 border-t py-3 first:border-t-0 first:pt-0 ${
        dark ? 'border-ivory/10' : 'border-line'
      }`}
    >
      <dt className={`text-[0.8125rem] ${dark ? 'text-ivory/65' : 'text-muted'}`}>{label}</dt>
      <dd className={`text-right text-[0.9375rem] font-medium tabular-nums ${dark ? 'text-ivory' : 'text-forest'}`}>
        <AnimatedValue value={value} format={format} />
      </dd>
    </div>
  )
}
