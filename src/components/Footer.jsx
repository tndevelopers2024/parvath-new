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
import { images } from '../data/images'
import { JaaliField } from './Ornaments'

/** Circular brand social links matching top bar styling */
const socialLinks = [
  {
    name: 'Facebook',
    href: site.social.facebook,
    icon: (
      <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: site.social.instagram,
    icon: (
      <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: site.social.linkedin,
    icon: (
      <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: site.social.whatsapp,
    icon: (
      <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.905.534 3.684 1.458 5.203L2.052 22l4.945-1.396A9.957 9.957 0 0012.004 22c5.524 0 10.004-4.48 10.004-10.004 0-5.52-4.48-10-10.004-10z"
        />
        <path
          fill="#FFFFFF"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        />
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
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Column 1: Brand & Founder — 4 cols */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center gap-4" aria-label="Parvath Life and Legacy Advisors — home">
              <img
                src="/brand/parvath-logo-light.png"
                alt=""
                width="640"
                height="479"
                loading="lazy"
                decoding="async"
                className="h-16 w-auto sm:h-20"
              />
              <span className="border-l border-ivory/20 pl-4 text-[0.625rem] leading-[1.5] font-medium tracking-[0.24em] text-gold-soft uppercase">
                Life &amp; Legacy
                <br />
                Advisors
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/75">
              Structured financial planning for individuals, families and business owners. Guiding you to create, protect and transfer generational wealth with clarity and confidence.
            </p>

            {/* Founders & Advisory Card */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4.5 backdrop-blur-xs">
              <p className="text-[0.6875rem] font-medium tracking-wider text-gold-soft uppercase">
                Founders &amp; Advisory
              </p>
              <div className="mt-2.5 space-y-2.5">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-gold-soft/40">
                    <img
                      src={images.founders.sridhar.src}
                      alt="K Sridhar"
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-white leading-tight">
                      K Sridhar
                    </p>
                    <p className="text-[0.6875rem] text-ivory/65">Founder &bull; 20+ Years of Experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-gold-soft/40">
                    <img
                      src={images.founder.src}
                      alt="Varalakshmi Sridhar"
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-white leading-tight">
                      Varalakshmi Sridhar
                    </p>
                    <p className="text-[0.6875rem] text-ivory/65">Founder &bull; 7+ Yrs Financial Advisory</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 border-t border-white/10 pt-2 text-[0.6875rem] font-medium text-gold-soft/90">
                Parvath Life and Legacy Advisors
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
                    aria-label={`Follow Parvath Life and Legacy Advisors on ${social.name}`}
                    className="flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white text-forest shadow-xs transition-all duration-200 hover:scale-110 hover:bg-forest-soft hover:text-gold-soft hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-gold"
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
                    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="#25D366"
                        d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.905.534 3.684 1.458 5.203L2.052 22l4.945-1.396A9.957 9.957 0 0012.004 22c5.524 0 10.004-4.48 10.004-10.004 0-5.52-4.48-10-10.004-10z"
                      />
                      <path
                        fill="#FFFFFF"
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                      />
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
                  <a
                    href={site.locationHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-white hover:text-gold-soft transition-colors block text-[0.8125rem] leading-snug"
                  >
                    {site.location}
                  </a>
                  <p className="text-[0.6875rem] text-ivory/60 mt-1">In-person &amp; Virtual Advisory</p>
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
                  Corporate advisory and financial planning experience brought to personal portfolios.
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
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-5 text-xs text-ivory/65 sm:p-6">
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
        <div className="mt-8 border-t border-white/10 py-6 text-xs text-ivory/60">
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
