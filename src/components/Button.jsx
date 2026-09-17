import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[0.8125rem] font-medium tracking-[0.06em] uppercase transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.97] aria-disabled:pointer-events-none aria-disabled:opacity-60 disabled:pointer-events-none disabled:opacity-60'

const sizes = {
  md: 'px-6 py-3.5',
  sm: 'px-5 py-3 text-[0.75rem]',
}

// `light`/`outlineLight` are only ever used on the dark hero photo or the
// forest CTA card, so their focus ring is swapped to gold-soft — the default
// forest ring is close to invisible against a forest-toned backdrop (7.8:1 on
// forest per the palette notes, vs. an unreadable ~1:1 for forest-on-forest).
const variants = {
  primary:
    'bg-forest text-ivory hover:bg-forest-soft hover:shadow-lift focus-visible:outline-forest',
  secondary:
    'border border-forest/40 bg-transparent text-forest hover:border-forest/60 hover:bg-forest/5 focus-visible:outline-forest',
  light: 'bg-ivory text-forest hover:bg-white hover:shadow-lift focus-visible:outline-gold-soft',
  outlineLight:
    'border border-ivory/50 bg-transparent text-ivory hover:border-ivory/70 hover:bg-ivory/10 focus-visible:outline-gold-soft',
}

/**
 * The one button in the system. Renders as a router <Link>, an <a> for
 * external/tel targets, or a <button> — `to`/`href` decide which.
 *
 * `disabled` works on every rendered tag, including `to`/`href`: the CSS
 * `:disabled` pseudo-class only matches real form controls, so an anchor or
 * Link stays fully clickable even when it looks greyed out unless we also
 * gate navigation and tab order by hand here.
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  withArrow = true,
  shimmer = false,
  disabled = false,
  onClick,
  className = '',
  ...rest
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`

  const content = (
    <>
      {shimmer && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <span
            className={`animate-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent to-transparent motion-reduce:hidden ${
              variant === 'light' ? 'via-gold/35' : 'via-white/30'
            }`}
          />
        </span>
      )}
      <span className="relative">{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="relative h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      )}
    </>
  )

  if (to) {
    return (
      <Link
        to={disabled ? '#' : to}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        className={classes}
        {...rest}
      >
        {content}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  )
}

/** Quiet text link with a travelling arrow. Used inside cards and footers. */
export function ArrowLink({ children, to, href, className = '', ...rest }) {
  const classes = `group inline-flex items-center gap-2 text-[0.8125rem] font-medium tracking-[0.08em] text-forest uppercase transition-colors duration-300 hover:text-gold-ink ${className}`

  const content = (
    <>
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:group-hover:translate-x-1"
        strokeWidth={1.5}
      />
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  )
}
