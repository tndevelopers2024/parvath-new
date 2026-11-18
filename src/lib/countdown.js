/**
 * Pure date-diff helpers for the pre-launch countdown timer.
 */

const MS_PER_SECOND = 1000
const MS_PER_MINUTE = MS_PER_SECOND * 60
const MS_PER_HOUR = MS_PER_MINUTE * 60
const MS_PER_DAY = MS_PER_HOUR * 24

/**
 * Computes remaining days, hours, minutes, and seconds until `targetDate`.
 * Clamps at zero once the target timestamp has passed.
 */
export function getTimeRemaining(targetDate, nowMs = Date.now()) {
  const targetMs = typeof targetDate === 'number' ? targetDate : Date.parse(targetDate)
  if (!Number.isFinite(targetMs)) {
    return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isLaunched: true }
  }

  const totalMs = Math.max(0, targetMs - nowMs)
  if (totalMs === 0) {
    return { totalMs: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isLaunched: true }
  }

  const days = Math.floor(totalMs / MS_PER_DAY)
  const hours = Math.floor((totalMs % MS_PER_DAY) / MS_PER_HOUR)
  const minutes = Math.floor((totalMs % MS_PER_HOUR) / MS_PER_MINUTE)
  const seconds = Math.floor((totalMs % MS_PER_MINUTE) / MS_PER_SECOND)

  return { totalMs, days, hours, minutes, seconds, isLaunched: false }
}

/** Pads single-digit countdown units with a leading zero. */
export function padTwo(value) {
  return String(Math.max(0, Math.floor(value))).padStart(2, '0')
}
