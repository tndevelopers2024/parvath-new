import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { formatINR } from '../../lib/format'
import { AnimatedValue } from './ResultStat'

// Validated on the forest card (#173f35): lightness band, chroma, CVD ΔE 8.3,
// normal-vision ΔE 15.8, contrast ≥ 3:1. Order is fixed: part 1, part 2.
const SERIES = ['#3aa678', '#bb8c2f']

/**
 * Two-part composition of a result, drawn as one stacked bar on the forest
 * results card: a 2px surface gap between segments, 4px rounded outer ends,
 * a legend that carries label, value and share (text never wears the series
 * colour), a hover/focus tooltip per segment, and a visually hidden table.
 */
export default function Breakdown({ title, parts }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(null)

  const clean = parts.map((p) => ({ ...p, value: Math.max(0, Number.isFinite(p.value) ? p.value : 0) }))
  const total = clean.reduce((sum, p) => sum + p.value, 0)
  if (total <= 0) return null
  const share = (v) => (v / total) * 100

  return (
    <figure className="mt-6 border-t border-ivory/10 pt-5">
      <figcaption className="text-[0.6875rem] font-medium tracking-[0.14em] text-ivory/65 uppercase">
        {title}
      </figcaption>

      {/* Bar */}
      <div className="relative mt-4">
        <div aria-hidden="true" className="flex h-5 w-full gap-[2px] overflow-hidden rounded-[4px]">
          {clean.map((part, i) => {
            const pct = share(part.value)
            if (pct <= 0) return null
            const first = i === 0
            const last = i === clean.length - 1 || clean.slice(i + 1).every((p) => p.value <= 0)
            return (
              <motion.span
                key={part.label}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={`relative block h-full min-w-[3px] transition-opacity duration-300 ${
                  first ? 'rounded-l-[4px]' : ''
                } ${last ? 'rounded-r-[4px]' : ''} ${active !== null && active !== i ? 'opacity-50' : ''}`}
                style={{ backgroundColor: SERIES[i] }}
                initial={reduced ? false : { flexBasis: '0%' }}
                animate={{ flexBasis: `${pct}%` }}
                transition={{ duration: reduced ? 0 : 0.6, ease: [0.22, 0.61, 0.36, 1] }}
              />
            )
          })}
        </div>

        {active !== null && (
          <div
            role="status"
            className="pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full max-w-[calc(100vw-3rem)] rounded-md bg-ivory px-3 py-2 text-[0.75rem] whitespace-nowrap text-charcoal shadow-lift"
          >
            <span className="font-medium text-forest">{clean[active].label}</span>
            <span className="mx-1.5 text-muted">·</span>
            <span className="tabular-nums">{formatINR(clean[active].value)}</span>
            <span className="ml-1.5 text-muted tabular-nums">({share(clean[active].value).toFixed(0)}%)</span>
          </div>
        )}
      </div>

      {/* Legend: identity by swatch, values in text tokens */}
      <ul className="mt-4 grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 sm:gap-3">
        {clean.map((part, i) => (
          <li
            key={part.label}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="flex items-start gap-2.5"
          >
            <span aria-hidden="true" className="mt-1 h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ backgroundColor: SERIES[i] }} />
            <span className="min-w-0">
              <span className="block text-[0.75rem] text-ivory/65">
                {part.label} <span className="tabular-nums">· {share(part.value).toFixed(0)}%</span>
              </span>
              <AnimatedValue value={part.value} format="currency" className="block text-[0.9375rem] font-medium text-ivory tabular-nums" />
            </span>
          </li>
        ))}
      </ul>

      {/* Table view for assistive tech */}
      <table className="sr-only">
        <caption>{title}</caption>
        <thead>
          <tr>
            <th scope="col">Part</th>
            <th scope="col">Amount</th>
            <th scope="col">Share</th>
          </tr>
        </thead>
        <tbody>
          {clean.map((part) => (
            <tr key={part.label}>
              <th scope="row">{part.label}</th>
              <td>{formatINR(part.value)}</td>
              <td>{share(part.value).toFixed(0)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
