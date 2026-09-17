import { ArrowUpRight, CalendarCheck, Mail, MapPin, MessageCircle, PenLine, Phone, Reply } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { JaaliField } from '../components/Ornaments'
import { images } from '../data/images'
import { site } from '../data/site'
import { trackPointer } from '../lib/motion'

/** One-tap ways to get in touch. Location has no link — there is no published address yet. */
const channels = [
  {
    label: 'Call',
    value: site.phoneDisplay,
    note: 'The quickest way to reach us',
    href: site.phoneHref,
    Icon: Phone,
  },
  {
    label: 'WhatsApp',
    value: 'Message us',
    note: 'Send a note, we reply personally',
    href: site.social.whatsapp,
    external: true,
    Icon: MessageCircle,
  },
  {
    label: 'Email',
    // Zero-width space after "@" so a narrow card wraps there, not mid-word
    value: site.email.replace('@', '@\u200B'),
    note: 'For longer questions',
    href: site.emailHref,
    Icon: Mail,
  },
  {
    label: 'Location',
    value: site.location,
    note: 'Consultations in person or by call',
    Icon: MapPin,
  },
]

/** What happens after an enquiry — each step restates a commitment made elsewhere on the site. */
const nextSteps = [
  {
    title: 'You send a short note',
    body: 'A sentence or two is enough. No documents are needed at this stage.',
    Icon: PenLine,
  },
  {
    title: 'A personal reply',
    body: 'Enquiries are answered personally, usually within two working days.',
    Icon: Reply,
  },
  {
    title: 'A first conversation',
    body: 'It carries no obligation, and no recommendation is made in it.',
    Icon: CalendarCheck,
  },
]

function ChannelCard({ channel, index }) {
  const { label, value, note, href, external, Icon } = channel
  const Tag = href ? 'a' : 'div'
  const linkProps = href
    ? { href, ...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {}) }
    : {}

  return (
    <Tag
      {...linkProps}
      onPointerMove={trackPointer}
      className={`spotlight group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-4 transition-[translate,border-color,box-shadow] duration-500 sm:p-6 ${
        href ? 'hover:border-gold/60 hover:shadow-card motion-safe:hover:-translate-y-1' : ''
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-0.5 w-10 bg-gold transition-[width] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:w-full"
      />
      <div className="flex items-start justify-between gap-3">
        <span
          className="animate-float flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest transition-colors duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft"
          style={{ animationDelay: `${index * -1.5}s` }}
        >
          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </span>
        {href && (
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 text-forest/40 transition-[transform,color] duration-500 group-hover:text-gold-ink motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            strokeWidth={1.5}
          />
        )}
      </div>
      <p className="mt-4 text-[0.625rem] font-medium tracking-[0.18em] text-gold-ink uppercase sm:mt-5 sm:text-[0.6875rem]">{label}</p>
      <p className="mt-1 font-display text-[0.9375rem] leading-snug break-words text-forest sm:mt-1.5 sm:text-[1.25rem]">{value}</p>
      <p className="mt-1 hidden text-[0.8125rem] text-muted sm:block">{note}</p>
    </Tag>
  )
}

function NextStepsPanel() {
  return (
    <aside
      data-cursor-theme="dark"
      className="relative isolate overflow-hidden rounded-2xl bg-forest p-6 text-ivory shadow-lift sm:p-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_100%_0%,black,transparent_70%)]">
          <div className="animate-drift absolute top-0 left-0 -right-[44px] -bottom-[44px] [--drift:44px]">
            <JaaliField opacity={0.12} scale={44} tone="#E4D2A6" />
          </div>
        </div>
        <span className="animate-wander absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-gold/15 blur-3xl motion-reduce:hidden" />
      </div>

      <div className="flex items-center gap-4">
        <span className="relative shrink-0">
          <img
            src={images.founder.src}
            alt=""
            className="h-14 w-14 rounded-full object-cover object-top ring-2 ring-gold-soft/40"
            loading="lazy"
          />
          <span aria-hidden="true" className="absolute right-0 bottom-0 flex h-3.5 w-3.5">
            <span className="animate-ping-soft absolute inset-0 rounded-full bg-[#3aa678] motion-reduce:hidden" />
            <span className="relative h-3.5 w-3.5 rounded-full border-2 border-forest bg-[#3aa678]" />
          </span>
        </span>
        <div>
          <p className="font-display text-[1.25rem] leading-tight">{site.founder}</p>
          <p className="text-[0.75rem] text-ivory/65">{site.founderRole}</p>
        </div>
      </div>

      <p className="mt-7 text-[0.6875rem] font-medium tracking-[0.18em] text-gold-soft uppercase">What happens next</p>

      <ol className="relative mt-5 space-y-6">
        <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.0625rem] w-px bg-ivory/15" />
        {nextSteps.map(({ title, body, Icon }, i) => (
          <li key={title} className="relative flex gap-4">
            <span className="relative z-10 flex h-[2.125rem] w-[2.125rem] shrink-0 items-center justify-center rounded-full border border-gold-soft/40 bg-forest text-gold-soft">
              <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-[0.625rem] tracking-[0.18em] text-ivory/50 uppercase">Step {i + 1}</p>
              <p className="mt-0.5 font-medium text-ivory">{title}</p>
              <p className="mt-1 text-[0.875rem] leading-relaxed text-ivory/70">{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <a
        href={site.phoneHref}
        className="group mt-8 flex items-center justify-between gap-3 rounded-xl border border-ivory/15 bg-ivory/5 px-4 py-3.5 transition-colors duration-300 hover:border-gold-soft/50 hover:bg-ivory/10"
      >
        <span>
          <span className="block text-[0.6875rem] tracking-[0.14em] text-ivory/60 uppercase">Prefer to talk now?</span>
          <span className="mt-0.5 block font-display text-[1.25rem] tracking-wide">{site.phoneDisplay}</span>
        </span>
        <Phone
          aria-hidden="true"
          className="h-5 w-5 text-gold-soft transition-transform duration-300 motion-safe:group-hover:rotate-12"
          strokeWidth={1.5}
        />
      </a>
    </aside>
  )
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        path="/contact"
        description={`Speak with ${site.founder}, Founder of ${site.name}, about wealth creation, retirement, protection, legacy planning, employee benefits or group gratuity. Call ${site.phoneDisplay}.`}
      />

      <PageHeader
        eyebrow="Contact"
        title="Let’s talk about your financial future."
        lede="Tell us a little about what you would like to discuss and we will get back to you. A first conversation carries no obligation."
        crumb="Contact"
      />

      {/* ---- Channels ---- */}
      <section className="relative z-10 -mt-8 pb-2 sm:-mt-10">
        <div className="shell">
          <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" stagger={0.08}>
            {channels.map((channel, i) => (
              <RevealItem key={channel.label} y={24} className="h-full">
                <ChannelCard channel={channel} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---- Form + next steps ---- */}
      <section className="section bg-ivory">
        <div className="shell">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal y={20}>
                <h2 className="sr-only">Enquiry form</h2>
                <ContactForm />
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal y={20} delay={0.1}>
                <NextStepsPanel />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
