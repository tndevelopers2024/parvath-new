import { useId } from 'react'

/**
 * One calculator input — a range slider for bounded values (ages, years,
 * rates) or a plain number field for open-ended currency amounts. Both
 * variants share the same label treatment and keep the live value visible
 * at all times, so a result never changes without the input that drove it
 * being equally visible.
 */
export default function CalculatorField({ field, value, onChange }) {
  const id = useId()
  const { type, label, min, max, step, suffix, prefix } = field

  if (type === 'slider') {
    // Fill the track up to the current value with forest, matching the
    // brand's one accent color used for progress/emphasis.
    const pct = max === min ? 0 : ((value - min) / (max - min)) * 100

    return (
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={id} className="text-[0.8125rem] font-medium text-charcoal">
            {label}
          </label>
          <output
            htmlFor={id}
            className="min-w-[3.5rem] rounded-md bg-forest px-2.5 py-1 text-center text-[0.8125rem] font-medium tabular-nums text-white"
          >
            {value}
            {suffix}
          </output>
        </div>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-forest [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-forest [&::-webkit-slider-thumb]:bg-white"
          style={{
            background: `linear-gradient(to right, #173F35 ${pct}%, #DDD7C9 ${pct}%)`,
          }}
        />
      </div>
    )
  }

  // 'number' — a plain typed amount, clamped and validated on blur rather
  // than on every keystroke so a user can clear the field and retype.
  return (
    <div>
      <label htmlFor={id} className="text-[0.8125rem] font-medium text-charcoal">
        {label}
      </label>
      <div className="relative mt-2">
        {prefix && (
          <span className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[0.9375rem] text-muted">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const next = e.target.value === '' ? 0 : Number(e.target.value)
            if (Number.isFinite(next)) onChange(next)
          }}
          onFocus={(e) => e.target.select()}
          onBlur={(e) => {
            const clamped = Math.min(max, Math.max(min, Number(e.target.value) || 0))
            onChange(clamped)
          }}
          className={`w-full rounded-lg border border-line bg-white py-3 text-[0.9375rem] text-charcoal transition-colors duration-300 focus:border-forest focus:outline-none ${prefix ? 'pl-9' : 'pl-4'} pr-4`}
        />
      </div>
    </div>
  )
}
