import { motion, useReducedMotion } from 'motion/react'
import { EASE, viewportOnce } from '../lib/motion'

/**
 * The site's one image treatment: an aspect-locked plate, a thin gold frame
 * offset behind it, and a clip-path wipe on entry.
 *
 * The aspect ratio is reserved up front so nothing shifts while the image
 * decodes or while the reveal runs.
 *
 * The wipe lives on an inner element rather than on the observed one: an
 * element clipped to `inset(0 0 100% 0)` has no visible area, so an
 * IntersectionObserver watching it would never report it as in view and the
 * reveal could never fire.
 */
export default function EditorialImage({
  image,
  priority = false,
  frame = true,
  frameSide = 'left',
  className = '',
  rounded = 'rounded-xl',
  delay = 0,
  showPlaceholderNote = true,
  children,
}) {
  const reduced = useReducedMotion()
  const { src, alt, aspect, placeholder } = image

  const frameOffset =
    frameSide === 'left'
      ? '-translate-x-4 translate-y-4 sm:-translate-x-6 sm:translate-y-6'
      : 'translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6'

  const trigger = reduced
    ? {}
    : {
        initial: 'hidden',
        ...(priority
          ? { animate: 'visible' }
          : { whileInView: 'visible', viewport: viewportOnce }),
      }

  const wipe = {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    visible: {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      transition: { duration: 1, ease: EASE, delay },
    },
  }

  return (
    <div className={`relative ${className}`}>
      {frame && (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 border border-gold/60 ${rounded} ${frameOffset}`}
        />
      )}

      <motion.div
        className={`group relative overflow-hidden bg-ivory ${rounded} ring-1 ring-line`}
        style={{ aspectRatio: aspect }}
        {...trigger}
      >
        <motion.div className="relative h-full w-full" variants={reduced ? undefined : wipe}>
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] motion-safe:group-hover:scale-[1.02]"
          />

          {placeholder && showPlaceholderNote && (
            <span className="pointer-events-none absolute right-3 bottom-3 rounded-sm border border-gold/55 bg-ivory/90 px-2 py-1 text-[0.5625rem] font-medium tracking-[0.14em] text-muted uppercase">
              Placeholder imagery
            </span>
          )}
        </motion.div>
      </motion.div>

      {children}
    </div>
  )
}
