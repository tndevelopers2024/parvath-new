/**
 * Presentation helpers for calculator output. Kept separate from finance.js
 * so the math stays free of locale/formatting concerns.
 */

/** ₹12,34,567 — Indian digit grouping (lakhs/crores), no decimals. */
export function formatINR(amount) {
  const value = Number.isFinite(amount) ? Math.round(amount) : 0
  return `₹${value.toLocaleString('en-IN')}`
}

/** Compact form for tight spaces: ₹12.3L, ₹1.2Cr. */
export function formatINRCompact(amount) {
  const value = Number.isFinite(amount) ? amount : 0
  const abs = Math.abs(value)
  if (abs >= 1e7) return `₹${(value / 1e7).toFixed(abs >= 1e8 ? 1 : 2)}Cr`
  if (abs >= 1e5) return `₹${(value / 1e5).toFixed(abs >= 1e6 ? 1 : 2)}L`
  if (abs >= 1e3) return `₹${(value / 1e3).toFixed(1)}k`
  return formatINR(value)
}

export function formatYears(years) {
  const value = Number.isFinite(years) ? years : 0
  return value === 1 ? '1 year' : `${Number(value.toFixed(1)).toString().replace(/\.0$/, '')} years`
}

export function formatMonths(months) {
  const value = Math.round(Number.isFinite(months) ? months : 0)
  const y = Math.floor(value / 12)
  const m = value % 12
  if (y === 0) return `${m} month${m === 1 ? '' : 's'}`
  if (m === 0) return `${y} year${y === 1 ? '' : 's'}`
  return `${y}y ${m}m`
}

export function formatPercent(pct) {
  const value = Number.isFinite(pct) ? pct : 0
  return `${Number(value.toFixed(1)).toString()}%`
}
