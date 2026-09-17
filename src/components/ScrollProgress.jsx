import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'

/** Hairline gold bar across the top of the viewport tracking page progress. */
export default function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  if (reduced) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gold"
      style={{ scaleX }}
    />
  )
}
