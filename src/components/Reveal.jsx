import { motion, useReducedMotion } from 'motion/react'
import { EASE, viewportOnce } from '../lib/motion'

/**
 * Scroll-triggered reveal. Wraps children in a single motion element so the
 * whole site shares one entrance language.
 *
 * With `prefers-reduced-motion` the element renders in its final state and no
 * transform is applied at all, so nothing shifts during layout.
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  duration = 0.7,
  className = '',
  amount,
  ...rest
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={amount ? { ...viewportOnce, amount } : viewportOnce}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Staggered list container. Pair with <RevealItem> children.
 */
export function RevealGroup({
  children,
  as = 'div',
  className = '',
  stagger = 0.09,
  delay = 0,
  amount,
  ...rest
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={amount ? { ...viewportOnce, amount } : viewportOnce}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

export function RevealItem({ children, as = 'div', className = '', y = 22, ...rest }) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as] ?? motion.div

  if (reduced) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
