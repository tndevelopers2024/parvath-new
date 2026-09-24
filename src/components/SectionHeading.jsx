import Reveal, { SplitWords } from './Reveal'
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
 * Titles are a single plain line of copy — no split or accented phrases. The
 * title rises in word by word; its eyebrow and lede fade up around it.
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
        <Level className={`${eyebrow ? 'mt-3 sm:mt-4' : ''} display-2 ${light ? 'text-ivory' : 'text-forest'}`}>
          <SplitWords text={title} delay={0.08} />
        </Level>
      )}

      {lede && (
        <Reveal y={16} delay={0.3}>
          <p className={`lede mx-auto mt-3.5 sm:mt-4 max-w-2xl ${light ? 'text-ivory/80' : ''}`}>{lede}</p>
        </Reveal>
      )}

      {children}
    </div>
  )
}
