import Reveal from './Reveal'
import { GoldRule } from './Ornaments'

/** Section label in tracked caps, framed by a hairline on each side. */
export function Eyebrow({ children, tone = 'dark', className = '' }) {
  const text = tone === 'light' ? 'text-gold-soft' : 'text-gold-ink'
  const rule = tone === 'light' ? 'bg-gold-soft/60' : 'bg-gold/60'

  return (
    <Reveal y={12} duration={0.6} className={`flex items-center justify-center gap-3 ${className}`}>
      <GoldRule width="2rem" tone={rule} />
      <p className={`eyebrow ${text}`}>{children}</p>
      <GoldRule width="2rem" tone={rule} delay={0.15} />
    </Reveal>
  )
}

/**
 * Label → headline → description, centred. Opens every section on the site.
 * Titles are a single plain line of copy — no split or accented phrases.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  level: Level = 'h2',
  tone = 'dark',
  className = '',
  children,
}) {
  const light = tone === 'light'

  return (
    <div className={`mx-auto max-w-5xl text-center ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}

      {title && (
        <Reveal y={20} delay={0.08}>
          <Level className={`${eyebrow ? 'mt-5' : ''} display-2 ${light ? 'text-ivory' : 'text-forest'}`}>
            {title}
          </Level>
        </Reveal>
      )}

      {lede && (
        <Reveal y={16} delay={0.14}>
          <p className={`lede mx-auto mt-5 max-w-xl ${light ? 'text-ivory/80' : ''}`}>{lede}</p>
        </Reveal>
      )}

      {children}
    </div>
  )
}
