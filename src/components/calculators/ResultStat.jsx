import { formatINR, formatYears, formatMonths, formatPercent } from '../../lib/format'

const formatters = {
  currency: formatINR,
  years: formatYears,
  months: formatMonths,
  percent: formatPercent,
}

/** One line of calculator output — a large emphasized headline figure, or a smaller supporting one. */
export default function ResultStat({ label, value, format, emphasis }) {
  const formatted = (formatters[format] ?? formatINR)(value)

  if (emphasis) {
    return (
      <div>
        <p className="text-[0.6875rem] font-medium tracking-[0.14em] text-muted uppercase">{label}</p>
        <p className="stat-figure mt-1.5 break-words">{formatted}</p>
      </div>
    )
  }

  return (
    <div className="flex items-baseline justify-between gap-4 border-t border-line py-3 first:border-t-0 first:pt-0">
      <dt className="text-[0.8125rem] text-muted">{label}</dt>
      <dd className="text-right text-[0.9375rem] font-medium tabular-nums text-forest">{formatted}</dd>
    </div>
  )
}
