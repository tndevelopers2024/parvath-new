import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Users,
  Calculator,
} from 'lucide-react'
import { disclaimer, navLinks, services, site } from '../data/site'
import { JaaliField } from './Ornaments'

/** Circular brand social links matching top bar styling */
const socialLinks = [
  {
    name: 'Facebook',
    href: site.social.facebook,
    icon: (
      <svg aria-hidden="true" className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'X (Twitter)',
    href: site.social.twitter,
    icon: (
      <svg aria-hidden="true" className="h-3 w-3 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: site.social.linkedin,
    icon: (
      <svg aria-hidden="true" className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: site.social.whatsapp,
    icon: (
      <svg aria-hidden="true" className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.39-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.24.25-.4.08-.17.04-.31-.02-.44s-.56-1.36-.77-1.86c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.25 3.76.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: site.social.youtube,
    icon: (
      <svg aria-hidden="true" className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

const popularCalculators = [
  { label: 'SIP Return Calculator', to: '/calculators/sip' },
  { label: 'Retirement Corpus Planner', to: '/calculators/dream-retirement' },
  { label: 'Child Education Planner', to: '/calculators/child-education' },
  { label: 'Lumpsum Investment Tool', to: '/calculators/lumpsum' },
  { label: 'Life Insurance Need', to: '/calculators/life-insurance-need' },
  { label: 'Cost of Delay Calculator', to: '/calculators/cost-of-delay' },
]

const linkClass =
  'inline-flex items-center gap-1.5 text-[0.875rem] text-ivory/70 transition-colors duration-200 hover:text-gold-soft'

export default function Footer() {
  return (
    <footer data-cursor-theme="dark" className="relative overflow-hidden border-t-2 border-gold/30 bg-[#091D17] text-ivory">
      {/* Background architectural jaali watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
      >
        <JaaliField scale={48} tone="#E4D2A6" />
      </div>

      {/* Ambient gold glow at the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-forest-soft/25 to-transparent"
      />

      <div className="shell relative z-10">
        {/* Main Footer Multi-Column Grid */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Column 1: Brand & Founder — 4 cols */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex flex-col leading-none">
              <span className="font-display text-2xl font-semibold tracking-[0.18em] text-white sm:text-3xl">
                PARVATH
              </span>
              <span className="mt-1.5 text-[0.625rem] font-medium tracking-[0.28em] text-gold-soft uppercase">
                Financial Services
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/75">
              Structured financial planning for individuals, families and business owners. Guiding you to create, protect and transfer generational wealth with clarity and confidence.
            </p>

            {/* Founder Card */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4.5 backdrop-blur-xs">
              <p className="text-[0.6875rem] font-medium tracking-wider text-gold-soft uppercase">
                Principal Advisory
              </p>
              <p className="mt-1 font-display text-lg font-semibold text-white">
                {site.founder}
              </p>
              <p className="text-xs text-ivory/70">
                {site.founderRole}
              </p>
              <p className="mt-2 text-[0.6875rem] font-medium text-gold-soft/90">
                20+ Years Corporate Banking &amp; Advisory Experience
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-6">
              <p className="text-[0.6875rem] font-medium tracking-[0.18em] text-gold-soft uppercase">
                Connect With Us
              </p>
              <div className="mt-3 flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Parvath Financial Services on ${social.name}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-forest shadow-xs transition-all duration-200 hover:scale-110 hover:bg-forest-soft hover:text-gold-soft hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-gold"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Advisory Services — 2 cols */}
          <nav aria-label="Services" className="lg:col-span-2">
            <h3 className="font-heading text-[0.6875rem] font-semibold tracking-[0.2em] text-gold-soft uppercase">
              Advisory Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link to={service.path} className={linkClass}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Planning Calculators — 2 cols */}
          <nav aria-label="Calculators" className="lg:col-span-2">
            <h3 className="font-heading text-[0.6875rem] font-semibold tracking-[0.2em] text-gold-soft uppercase">
              Calculators &amp; Tools
            </h3>
            <ul className="mt-5 space-y-3">
              {popularCalculators.map((calc) => (
                <li key={calc.to}>
                  <Link to={calc.to} className={linkClass}>
                    {calc.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1.5">
                <Link
                  to="/calculators"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-soft transition-colors hover:text-white"
                >
                  <Calculator className="h-3.5 w-3.5" />
                  View All Calculators &rarr;
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 4: Quick Navigation — 2 cols */}
          <nav aria-label="Quick Links" className="lg:col-span-2">
            <h3 className="font-heading text-[0.6875rem] font-semibold tracking-[0.2em] text-gold-soft uppercase">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 5: Direct Contact Desk — 2 cols */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-[0.6875rem] font-semibold tracking-[0.2em] text-gold-soft uppercase">
              Advisory Desk
            </h3>
            <ul className="mt-5 space-y-4 text-xs text-ivory/80">
              <li>
                <a
                  href={site.phoneHref}
                  className="group flex items-center gap-2.5 transition-colors hover:text-gold-soft"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-forest shadow-xs transition-transform group-hover:scale-110">
                    <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span className="font-medium">{site.phoneDisplay}</span>
                </a>
              </li>

              <li>
                <a
                  href={site.emailHref}
                  className="group flex items-center gap-2.5 transition-colors hover:text-gold-soft"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-forest shadow-xs transition-transform group-hover:scale-110">
                    <Mail className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span className="font-medium break-all">{site.email}</span>
                </a>
              </li>

              <li>
                <a
                  href={site.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 transition-colors hover:text-gold-soft"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white shadow-xs transition-transform group-hover:scale-110">
                    <svg aria-hidden="true" className="h-3.5 w-3.5 fill-[#25D366]" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.39-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.24.25-.4.08-.17.04-.31-.02-.44s-.56-1.36-.77-1.86c-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.25 3.76.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.29z" />
                    </svg>
                  </span>
                  <span className="font-medium">Instant WhatsApp Chat</span>
                </a>
              </li>

              <li className="flex items-start gap-2.5 pt-1">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold-soft">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-medium text-white">{site.location}</p>
                  <p className="text-[0.6875rem] text-ivory/60">In-person &amp; Virtual Advisory</p>
                </div>
              </li>

              <li className="flex items-start gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold-soft">
                  <Clock className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-medium text-white">Mon &ndash; Sat: 9:00 AM &ndash; 7:00 PM</p>
                  <p className="text-[0.6875rem] text-ivory/60">Sunday by appointment</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust & Commitment 3-Pillar Strip */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xs sm:p-8">
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-8">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-soft ring-1 ring-gold/30">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-heading text-sm font-semibold text-white">Fiduciary Discipline</h3>
                <p className="mt-1 text-xs leading-relaxed text-ivory/70">
                  Unbiased, goal-oriented wealth planning tailored exclusively to your family’s vision.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-soft ring-1 ring-gold/30">
                <Award className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-heading text-sm font-semibold text-white">20+ Years Institutional Rigor</h3>
                <p className="mt-1 text-xs leading-relaxed text-ivory/70">
                  Corporate banking and financial advisory experience brought to personal portfolios.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-soft ring-1 ring-gold/30">
                <Users className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-heading text-sm font-semibold text-white">200+ Families Served</h3>
                <p className="mt-1 text-xs leading-relaxed text-ivory/70">
                  Multigenerational wealth preservation and business continuity built on enduring trust.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance & Regulatory Notice */}
        <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-xs text-ivory/65 sm:p-6">
          <h3 className="font-heading text-[0.6875rem] font-semibold tracking-wider text-gold-soft uppercase">
            Regulatory Disclosure &amp; Risk Notice
          </h3>
          <p className="mt-2.5 leading-relaxed">
            {disclaimer}
          </p>
          <p className="mt-2 text-[0.6875rem] text-ivory/50">
            AMFI Registered Mutual Fund Distributor &middot; Insurance is the subject matter of solicitation. Mutual fund investments are subject to market risks, read all scheme-related documents carefully.
          </p>
        </div>

        {/* Sub-Footer / Copyright & Legal Bar */}
        <div className="mt-10 border-t border-white/10 py-8 text-xs text-ivory/60">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-ivory/70">
              <Link to="/about" className="transition-colors hover:text-gold-soft">About Practice</Link>
              <Link to="/services" className="transition-colors hover:text-gold-soft">Services</Link>
              <Link to="/calculators" className="transition-colors hover:text-gold-soft">Calculators</Link>
              <Link to="/contact" className="transition-colors hover:text-gold-soft">Contact</Link>
              <span className="hidden sm:inline text-white/20">&middot;</span>
              <span className="text-[0.6875rem] tracking-[0.1em] text-gold-soft uppercase">
                Financial Planning &middot; Wealth &middot; Protection &middot; Legacy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
