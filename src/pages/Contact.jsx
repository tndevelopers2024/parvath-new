import { ArrowUpRight, CalendarCheck, Mail, MapPin, PenLine, Phone, Reply } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import ContactForm from '../components/ContactForm'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { JaaliField } from '../components/Ornaments'
import { images } from '../data/images'
import { site } from '../data/site'
import { trackPointer } from '../lib/motion'

function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.905.534 3.684 1.458 5.203L2.052 22l4.945-1.396A9.957 9.957 0 0012.004 22c5.524 0 10.004-4.48 10.004-10.004 0-5.52-4.48-10-10.004-10z"
      />
      <path
        fill="#FFFFFF"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
      />
    </svg>
  )
}

/** Social channel links */
const socialChannels = [
  {
    name: 'LinkedIn',
    handle: 'Varalakshmi Sridhar',
    note: 'Follow advisory insights',
    href: site.social.linkedin,
    icon: (
      <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@finance.with.lakshmi',
    note: 'Daily financial education & reels',
    href: site.social.instagram,
    icon: (
      <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: 'Parvath Financial',
    note: 'Updates & practice news',
    href: site.social.facebook,
    icon: (
      <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

/** One-tap ways to get in touch. */
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
    Icon: WhatsAppIcon,
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
    note: 'Consultations in person or by appointment',
    href: site.locationHref,
    external: true,
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
      <p className={`mt-1 font-display leading-snug break-words text-forest sm:mt-1.5 ${label === 'Location' ? 'text-[0.875rem] sm:text-[1rem]' : 'text-[0.9375rem] sm:text-[1.25rem]'}`}>{value}</p>
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
        <div className="flex -space-x-3 items-center shrink-0">
          <span className="relative z-10 overflow-hidden h-13 w-13 rounded-full border-2 border-forest ring-2 ring-gold-soft/50 shadow-md">
            <img
              src={images.founders.sridhar.src}
              alt="K Sridhar"
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          </span>
          <span className="relative z-20 overflow-hidden h-13 w-13 rounded-full border-2 border-forest ring-2 ring-gold-soft/50 shadow-md">
            <img
              src={images.founders.varalakshmi.src}
              alt="Varalakshmi Sridhar"
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
            <span aria-hidden="true" className="absolute right-0 bottom-0 flex h-3.5 w-3.5">
              <span className="animate-ping-soft absolute inset-0 rounded-full bg-[#3aa678] motion-reduce:hidden" />
              <span className="relative h-3.5 w-3.5 rounded-full border-2 border-forest bg-[#3aa678]" />
            </span>
          </span>
        </div>
        <div>
          <p className="font-display text-[1.125rem] leading-tight text-white">{site.founder}</p>
          <p className="text-[0.75rem] text-ivory/65">{site.founderRole}</p>
          <p className="mt-1 text-[0.6875rem] font-medium text-gold-soft/90">Direct Senior Founder Advisory</p>
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
        description={`Speak with our founders, ${site.founder}, at ${site.name}, about wealth creation, retirement, life & health insurance, bonds & deposits, legacy planning, employee benefits or group gratuity. Call ${site.phoneDisplay}.`}
      />

      <PageHeader
        eyebrow="Contact"
        title="Let’s talk about your financial future."
        lede="Tell us a little about what you would like to discuss and we will get back to you. A first conversation carries no obligation."
        crumb="Contact"
      />

      {/* ---- Channels ---- */}
      <section className="section border-b border-line bg-cream">
        <div className="shell">
          <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" stagger={0.08}>
            {channels.map((channel, i) => (
              <RevealItem key={channel.label} y={24} className="h-full">
                <ChannelCard channel={channel} index={i} />
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Social Channels Strip */}
          <div className="mt-8 border-t border-line/70 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-gold-ink uppercase">
                  Social Channels
                </p>
                <p className="mt-0.5 text-sm text-forest font-medium">
                  Follow Varalakshmi Sridhar for insights & updates
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {socialChannels.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 text-xs font-medium text-forest transition-all duration-300 hover:border-gold hover:bg-forest hover:text-ivory hover:shadow-sm"
                  >
                    <span className="text-forest transition-colors duration-300 group-hover:text-gold-soft">
                      {soc.icon}
                    </span>
                    <span>{soc.name}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-forest/40 transition-transform duration-300 group-hover:text-gold-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
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

            <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
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
