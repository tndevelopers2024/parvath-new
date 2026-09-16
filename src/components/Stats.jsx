import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { stats } from '../data/site'
import { EASE } from '../lib/motion'
import { RevealGroup, RevealItem } from './Reveal'

/**
 * Counts a figure like "200+" up from zero the first time it enters view.
 * The full value is always in the accessible text, so nothing is announced
 * mid-count; with reduced motion the final figure renders directly.
 */
function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduced = useReducedMotion()
  const [, target, suffix] = value.match(/^(\d+)(.*)$/) ?? [null, null, value]
  const [shown, setShown] = useState(reduced || target === null ? value : `0${suffix}`)

  useEffect(() => {
    if (!inView || reduced || target === null) return
    const controls = animate(0, Number(target), {
      duration: 1.2,
      ease: EASE,
      onUpdate: (n) => setShown(`${Math.round(n)}${suffix}`),
    })
    return () => controls.stop()
  }, [inView, reduced, target, suffix])

  return (
    <span ref={ref} className="stat-figure block">
      <span aria-hidden="true">{shown}</span>
      <span className="sr-only">{value}</span>
    </span>
  )
}

/**
 * Trust strip. Large figures separated by hairlines — a ledger, not a row of
 * KPI cards.
 *
 * The grid is 2-up on small screens and 4-up from `lg`, so the dividing rules
 * have to follow the column count: a cell gets a left rule only when it is not
 * first in its row at that breakpoint.
 */
export default function Stats() {
  return (
    <section aria-label="Practice at a glance" className="border-b border-line bg-ivory">
      <div className="shell">
        <RevealGroup
          as="dl"
          className="grid grid-cols-2 py-8 md:py-10 lg:grid-cols-4 lg:py-12"
          stagger={0.1}
        >
          {stats.map((stat, i) => {
            const firstInSmallRow = i % 2 === 0
            const rules = [
              firstInSmallRow ? 'pr-5' : 'border-l border-line pl-5 sm:pl-8',
              i === 0 ? 'lg:border-l-0 lg:pl-0' : 'lg:border-l lg:border-line lg:pl-8 xl:pl-10',
              'lg:pr-8 xl:pr-10',
              i > 1 ? 'mt-10 lg:mt-0' : '',
            ].join(' ')

            return (
              <RevealItem key={stat.label} className={rules}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <CountUp value={stat.value} />
                  <span
                    aria-hidden="true"
                    className="mt-4 block h-px w-8 bg-gold"
                  />
                  <span className="mt-3 block max-w-[11rem] text-[0.6875rem] leading-relaxed font-medium tracking-[0.14em] text-muted uppercase">
                    {stat.label}
                  </span>
                </dd>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}
