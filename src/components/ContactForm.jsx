import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { AlertCircle, Check, ChevronDown, Send } from 'lucide-react'
import { interestOptions } from '../data/site'
import { EASE } from '../lib/motion'

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
// Indian mobile numbers, optionally with +91 / 0 prefix and spaces or dashes.
const PHONE = /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/

const EMPTY = { name: '', email: '', phone: '', interest: '', message: '' }

function validate(values) {
  const errors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length < 2) errors.name = 'Please enter your full name.'

  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL.test(values.email.trim())) errors.email = 'Please enter a valid email address.'

  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  else if (!PHONE.test(values.phone.trim()))
    errors.phone = 'Please enter a valid 10-digit mobile number.'

  if (!values.interest) errors.interest = 'Please choose what you would like to discuss.'

  if (!values.message.trim()) errors.message = 'Please tell us a little about your enquiry.'
  else if (values.message.trim().length < 10)
    errors.message = 'Please add a little more detail — at least 10 characters.'

  return errors
}

const fieldBase =
  'w-full rounded-lg border bg-white px-4 py-3.5 text-[0.9375rem] text-charcoal transition-colors duration-300 placeholder:text-muted/50 focus:outline-none'

/** Label + control + inline error, wired up for screen readers. */
function Field({ id, label, error, children, hint }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[0.6875rem] font-medium tracking-[0.16em] text-forest uppercase"
      >
        {label}
      </label>
      {hint && <p className="mt-1.5 text-[0.75rem] text-muted">{hint}</p>}
      <div className="mt-2.5">{children}</div>
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="flex items-center gap-1.5 overflow-hidden pt-2 text-[0.75rem] text-[#8C3A2B]"
          >
            <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Enquiry form.
 *
 * Validation runs on submit and then live per-field once a field has been
 * touched. There is no backend wired up yet — on a valid submit the form shows
 * a confirmation and logs the payload. See the note below for where to connect
 * a real endpoint.
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)
  const reduced = useReducedMotion()
  const uid = useId()
  const formRef = useRef(null)

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
      // Move focus to the first field that needs attention.
      const first = Object.keys(EMPTY).find((k) => found[k])
      formRef.current?.querySelector(`#${CSS.escape(fid(first))}`)?.focus()
      return
    }

    // TODO: POST `values` to the enquiry endpoint once one is available.
    console.info('[Parvath] enquiry ready to send', values)
    setSent(true)
    setValues(EMPTY)
    setTouched({})
  }

  const control = (name) =>
    `${fieldBase} ${
      errors[name] && touched[name]
        ? 'border-[#C08878] focus:border-[#8C3A2B]'
        : 'border-line focus:border-forest'
    }`

  const aria = (name) => ({
    'aria-invalid': Boolean(errors[name] && touched[name]),
    'aria-describedby': errors[name] && touched[name] ? `${fid(name)}-error` : undefined,
  })

  if (sent) {
    return (
      <motion.div
        role="status"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={reduced ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-xl border border-line bg-white p-8 sm:p-10"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50">
          <Check aria-hidden="true" className="h-5 w-5 text-forest" strokeWidth={1.5} />
        </span>
        <h3 className="mt-6 font-display text-[1.75rem] leading-tight text-forest">
          Thank you — your enquiry has been recorded.
        </h3>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
          Varalakshmi will be in touch personally. If it is urgent, a call is usually quicker than
          email.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-[0.75rem] font-medium tracking-[0.14em] text-forest uppercase underline decoration-gold/50 underline-offset-4 transition-colors duration-300 hover:text-gold-ink"
        >
          Send another enquiry
        </button>
      </motion.div>
    )
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="rounded-xl border border-line bg-ivory p-6 sm:p-8 lg:p-10"
    >
      <p className="sr-only" aria-live="polite">
        {Object.keys(errors).length > 0 && Object.keys(touched).length > 0
          ? `${Object.keys(errors).length} field${Object.keys(errors).length > 1 ? 's need' : ' needs'} attention.`
          : ''}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fid('name')} label="Name" error={touched.name ? errors.name : undefined}>
          <input
            id={fid('name')}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            onBlur={blur('name')}
            placeholder="Your full name"
            className={control('name')}
            {...aria('name')}
          />
        </Field>

        <Field id={fid('email')} label="Email" error={touched.email ? errors.email : undefined}>
          <input
            id={fid('email')}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={values.email}
            onChange={update('email')}
            onBlur={blur('email')}
            placeholder="you@example.com"
            className={control('email')}
            {...aria('email')}
          />
        </Field>

        <Field id={fid('phone')} label="Phone" error={touched.phone ? errors.phone : undefined}>
          <input
            id={fid('phone')}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={update('phone')}
            onBlur={blur('phone')}
            placeholder="98765 43210"
            className={control('phone')}
            {...aria('phone')}
          />
        </Field>

        <Field
          id={fid('interest')}
          label="I’m interested in"
          error={touched.interest ? errors.interest : undefined}
        >
          <div className="relative">
            <select
              id={fid('interest')}
              name="interest"
              value={values.interest}
              onChange={update('interest')}
              onBlur={blur('interest')}
              className={`${control('interest')} appearance-none pr-11`}
              {...aria('interest')}
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
        </Field>

        <div className="sm:col-span-2">
          <Field
            id={fid('message')}
            label="Message"
            error={touched.message ? errors.message : undefined}
          >
            <textarea
              id={fid('message')}
              name="message"
              rows={5}
              value={values.message}
              onChange={update('message')}
              onBlur={blur('message')}
              placeholder="A sentence or two about what you would like to discuss."
              className={`${control('message')} resize-y`}
              {...aria('message')}
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-forest px-7 py-3.5 text-[0.8125rem] font-medium tracking-[0.06em] text-white uppercase transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:bg-forest-soft hover:shadow-lift motion-safe:hover:-translate-y-0.5"
        >
          Send Enquiry
          <Send
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 motion-safe:group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </button>

        <p className="text-[0.75rem] leading-relaxed text-muted">
          Your details are used only to respond to this enquiry.
        </p>
      </div>
    </form>
  )
}
