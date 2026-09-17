import { Link } from 'react-router-dom'
import {
  ArrowUpRight,
  Building2,
  Landmark,
  ShieldCheck,
  Sunrise,
  TrendingUp,
  Users,
} from 'lucide-react'
import { trackPointer } from '../lib/motion'

const iconMap = { TrendingUp, Sunrise, ShieldCheck, Landmark, Users, Building2 }

/**
 * Editorial service cell. Restrained radius, hairline border, and a hover that
 * lifts the cell, warms the border toward gold, fills the icon seal and sends
 * the arrow outward.
 */
export default function ServiceCard({ service }) {
  const Icon = iconMap[service.icon]

  return (
    <Link
      to={service.path}
      onPointerMove={trackPointer}
      className="spotlight group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white p-7 transition-[translate,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:border-gold/60 hover:shadow-card sm:p-8 motion-safe:hover:-translate-y-1"
    >
      {/* Oversized ghost numeral, sitting behind the content */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -bottom-6 font-display text-[7rem] leading-none font-semibold text-forest/[0.04] transition-colors duration-500 select-none group-hover:text-gold/10"
      >
        {service.number}
      </span>

      <div className="relative flex items-start justify-between gap-4">
        {Icon && (
          <span
            className="animate-float flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft"
            style={{ animationDelay: `${(Number(service.number) - 1) * -1}s` }}
          >
            <Icon
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-[8deg]"
              strokeWidth={1.5}
            />
          </span>
        )}
        <ArrowUpRight
          aria-hidden="true"
          className="h-[1.125rem] w-[1.125rem] shrink-0 text-forest/55 transition-[transform,color] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:text-gold-ink motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
          strokeWidth={1.5}
        />
      </div>

      <span className="relative mt-7 text-[0.6875rem] font-medium tracking-[0.18em] text-gold-ink">
        {service.number}
      </span>

      <h3 className="relative mt-2 font-display text-[1.625rem] leading-tight text-forest sm:text-[1.75rem]">
        {service.title}
      </h3>

      <span
        aria-hidden="true"
        className="relative mt-4 block h-px w-8 bg-line transition-[width,background-color] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-14 group-hover:bg-gold"
      />

      <p className="relative mt-5 grow text-[0.9375rem] leading-relaxed text-muted">
        {service.summary}
      </p>

      <span className="relative mt-7 text-[0.6875rem] font-medium tracking-[0.16em] text-forest/85 uppercase transition-colors duration-500 group-hover:text-forest">
        Learn more
      </span>
    </Link>
  )
}
