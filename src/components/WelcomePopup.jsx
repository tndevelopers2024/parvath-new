import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { AlertCircle, Check, ChevronDown, Sparkles, X } from 'lucide-react'
import { interestOptions, site } from '../data/site'
import { EASE } from '../lib/motion'
import { usePreloaderDone } from '../lib/preloader'
import { Diamond, GoldRule, JaaliField } from './Ornaments'

const OPEN_DELAY_MS = 1800

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const PHONE = /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/

const EMPTY = { name: '', phone: '', email: '', interest: '' }

const benefits = [
  'Understand exactly where your wealth, protection and retirement plans stand today',
  'See what a structured plan could change — in plain language, not jargon',
  'No cost and no obligation for the first conversation',
]

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!PHONE.test(values.phone.trim())) errors.phone = 'Please enter a valid mobile number.'
  if (values.email.trim() && !EMAIL.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.'
  if (!values.interest) errors.interest = 'Please choose an area of interest.'

  return errors
}

const fieldBase =
  'w-full rounded-lg border bg-white px-4 py-3 text-[0.9375rem] text-charcoal transition-colors duration-300 placeholder:text-muted/50 focus:outline-none'

/**
 * A single, session-scoped invitation to talk — not a marketing takeover.
 * Shows once per browser session, a couple of seconds after the site loads,
 * and never reappears once dismissed or submitted.
 */
export default function WelcomePopup() {
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)
  const reduced = useReducedMotion()
  const preloaderDone = usePreloaderDone()
  const uid = useId()
  const formRef = useRef(null)
  const closeRef = useRef(null)

  // Opens on every full page load (landing or refresh), shortly after the
  // first preloader lifts — not again when the preloader replays on navigation
  const hasOpened = useRef(false)
  useEffect(() => {
    if (!preloaderDone || hasOpened.current) return
    const timer = setTimeout(() => {
      hasOpened.current = true
      setOpen(true)
    }, OPEN_DELAY_MS)
    return () => clearTimeout(timer)
  }, [preloaderDone])

  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const fid = (name) => `${uid}-${name}`

  const update = (name) => (event) => {
    const next = { ...values, [name]: event.target.value }
    setValues(next)
    if (touched[name]) setErrors(validate(next))
  }

  const blur = (name) => () => {
    setTouched((t) => ({ ...t, [name]: true }))
    setErrors(validate(values))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])))

    if (Object.keys(found).length > 0) {
      const first = Object.keys(EMPTY).find((k) => found[k])
      formRef.current?.querySelector(`#${CSS.escape(fid(first))}`)?.focus()
      return
    }

    // TODO: POST `values` to the enquiry endpoint once one is available.
    console.info('[Parvath] welcome popup enquiry ready to send', values)
    setSent(true)
  }

  const control = (name) =>
    `${fieldBase} ${
      errors[name] && touched[name]
        ? 'border-[#C08878] focus:border-[#8C3A2B]'
        : 'border-line focus:border-forest'
    }`

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div
            aria-hidden="true"
            onClick={close}
            className="absolute inset-0 bg-[#0c1c17]/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-popup-title"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative grid max-h-[92vh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-3xl border border-gold/20 bg-ivory shadow-[0_40px_80px_-24px_rgba(12,28,23,0.55)] lg:grid-cols-[1fr_1.15fr] lg:overflow-hidden"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black/25 lg:text-forest lg:border-forest/10 lg:bg-white/70 lg:hover:bg-white"
            >
              <X aria-hidden="true" className="h-4.5 w-4.5" strokeWidth={1.5} />
            </button>

            {/* ---- Left: the pitch ---- */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-forest px-7 py-9 text-ivory sm:px-9 sm:py-10">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <JaaliField opacity={0.12} scale={44} tone="#E4D2A6" />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-40 bg-gradient-to-b from-black/25 to-transparent"
              />

              <div className="relative">
                <span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-medium tracking-[0.18em] text-gold-soft uppercase">
                  <Sparkles aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                  Complimentary &middot; 30 Minutes
                </span>
                <GoldRule className="mt-4" width="2.5rem" tone="bg-gold-soft" />

                <h2
                  id="welcome-popup-title"
                  className="mt-5 font-display text-[1.75rem] leading-[1.15] text-ivory sm:text-[2rem]"
                >
                  A clearer picture of your wealth, in one conversation.
                </h2>

                <ul className="mt-7 space-y-4">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Diamond size={6} className="mt-1.5 shrink-0 border-gold-soft" />
                      <span className="text-[0.875rem] leading-relaxed text-ivory/85">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-10 flex items-center gap-3 border-t border-ivory/15 pt-5 text-[0.75rem] text-ivory/70">
                <span className="font-display text-lg text-gold-soft">20+</span>
                <span>Years corporate experience</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ivory/30" />
                <span className="font-display text-lg text-gold-soft">200+</span>
                <span>Families &amp; businesses served</span>
              </div>
            </div>

            {/* ---- Right: the form ---- */}
            <div className="px-6 py-8 sm:px-8 sm:py-9">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-4 text-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50">
                    <Check aria-hidden="true" className="h-5 w-5 text-forest" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-[1.625rem] leading-tight text-forest">
                    Thank you — we’ll be in touch shortly.
                  </h3>
                  <p className="mx-auto mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-muted">
                    {site.founder} will reach out personally to schedule your first conversation.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-8 rounded-full bg-forest px-6 py-3 text-[0.75rem] font-medium tracking-[0.1em] text-white uppercase transition-colors duration-300 hover:bg-forest-soft"
                  >
                    Continue browsing
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl text-forest">Request a callback</h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                    A few details, and our advisory desk will reach out to schedule your first
                    conversation.
                  </p>

                  <form ref={formRef} noValidate onSubmit={onSubmit} className="mt-6 space-y-4">
                    <div>
                      <label
                        htmlFor={fid('name')}
                        className="block text-[0.6875rem] font-medium tracking-[0.16em] text-forest uppercase"
                      >
                        Name
                      </label>
                      <input
                        id={fid('name')}
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={update('name')}
                        onBlur={blur('name')}
                        placeholder="Your full name"
                        className={`${control('name')} mt-2`}
                        aria-invalid={Boolean(errors.name && touched.name)}
                      />
                      {errors.name && touched.name && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-[0.75rem] text-[#8C3A2B]">
                          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={fid('phone')}
                        className="block text-[0.6875rem] font-medium tracking-[0.16em] text-forest uppercase"
                      >
                        Phone
                      </label>
                      <input
                        id={fid('phone')}
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={update('phone')}
                        onBlur={blur('phone')}
                        placeholder="98765 43210"
                        className={`${control('phone')} mt-2`}
                        aria-invalid={Boolean(errors.phone && touched.phone)}
                      />
                      {errors.phone && touched.phone && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-[0.75rem] text-[#8C3A2B]">
                          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={fid('email')}
                        className="block text-[0.6875rem] font-medium tracking-[0.16em] text-forest uppercase"
                      >
                        Email <span className="normal-case text-muted/70">(optional)</span>
                      </label>
                      <input
                        id={fid('email')}
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={update('email')}
                        onBlur={blur('email')}
                        placeholder="you@example.com"
                        className={`${control('email')} mt-2`}
                        aria-invalid={Boolean(errors.email && touched.email)}
                      />
                      {errors.email && touched.email && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-[0.75rem] text-[#8C3A2B]">
                          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={fid('interest')}
                        className="block text-[0.6875rem] font-medium tracking-[0.16em] text-forest uppercase"
                      >
                        I’m interested in
                      </label>
                      <div className="relative mt-2">
                        <select
                          id={fid('interest')}
                          name="interest"
                          value={values.interest}
                          onChange={update('interest')}
                          onBlur={blur('interest')}
                          className={`${control('interest')} appearance-none pr-11`}
                          aria-invalid={Boolean(errors.interest && touched.interest)}
                        >
                          <option value="">Select an area</option>
                          {interestOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-forest/60"
                          strokeWidth={1.5}
                        />
                      </div>
                      {errors.interest && touched.interest && (
                        <p className="mt-1.5 flex items-center gap-1.5 text-[0.75rem] text-[#8C3A2B]">
                          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                          {errors.interest}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest py-3.5 text-[0.8125rem] font-medium tracking-[0.06em] text-white uppercase transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:bg-forest-soft hover:shadow-lift motion-safe:hover:-translate-y-0.5"
                    >
                      Request a Callback
                    </button>

                    <p className="text-center text-[0.6875rem] leading-relaxed text-muted">
                      Your details are used only to arrange this callback.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
