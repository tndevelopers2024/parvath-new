import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Plus } from 'lucide-react'
import { faqs } from '../data/site'
import { EASE } from '../lib/motion'
import SectionHeading from './SectionHeading'
import { RevealGroup, RevealItem } from './Reveal'

function FAQItem({ item, isOpen, onToggle }) {
  const reduced = useReducedMotion()
  const panelId = `faq-panel-${item.question.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div
      className={`group border bg-white px-6 transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] sm:px-8 ${
        isOpen
          ? 'rounded-[2rem] border-gold/60 shadow-card'
          : 'rounded-full border-line hover:border-gold/40 hover:shadow-xs motion-safe:hover:-translate-y-0.5'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-4 py-3.5 text-left cursor-pointer sm:gap-6 sm:py-4"
      >
        <span className="font-display text-base text-forest sm:text-lg">
          {item.question}
        </span>
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-[background-color,border-color,transform] duration-300 ${
            isOpen ? 'border-gold bg-gold text-white' : 'border-line text-gold-ink group-hover:border-gold/60'
          }`}
        >
          <Plus
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
            strokeWidth={1.75}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            className="overflow-hidden"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={reduced ? {} : { height: 'auto', opacity: 1 }}
            exit={reduced ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p className="max-w-2xl pr-8 pb-5 pt-0.5 text-[0.875rem] leading-relaxed text-muted sm:pr-10 sm:pb-6 sm:text-[0.9375rem]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Single-open accordion, centred as the closing note of the homepage. Service
 * pages pass their own `items` and heading copy. Answers
 * stay grounded in what's stated elsewhere on the site (process, services,
 * contact channels) rather than introducing new claims.
 */
export default function FAQ({
  background = 'bg-ivory',
  items = faqs,
  eyebrow = 'FAQ',
  title = 'Frequently Asked Questions',
  lede = 'Answers to the questions we hear most often before a first planning conversation.',
}) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className={`section relative overflow-hidden border-t border-line ${background}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="shell">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          lede={lede}
        />

        <RevealGroup className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:gap-3.5 lg:mt-10" stagger={0.06}>
          {items.map((item, i) => (
            <RevealItem key={item.question}>
              <FAQItem
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
