import { motion, useReducedMotion } from 'motion/react'
import { EASE } from '../lib/motion'

/** Subtle opacity/translate transition between routes. */
export default function PageTransition({ children }) {
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
