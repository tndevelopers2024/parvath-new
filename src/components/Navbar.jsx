import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  Menu,
  X,
  Phone,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  TrendingUp,
  Sunrise,
  ShieldCheck,
  Landmark,
  Users,
  Building2,
  HeartPulse,
  Coins,
} from 'lucide-react'
import { useLenis } from 'lenis/react'
import { navLinks, services, site } from '../data/site'
import { calculators, calculatorCategories } from '../data/calculators'
import { EASE } from '../lib/motion'

const serviceIconMap = {
  TrendingUp,
  Sunrise,
  ShieldCheck,
  Landmark,
  Users,
  Building2,
  HeartPulse,
  Coins,
}

const calculatorGroups = calculatorCategories.map((category) => ({
  ...category,
  items: calculators.filter((calc) => calc.category === category.key),
}))

/** Nav items that expand into a hover (desktop) / accordion (mobile) menu of sub-pages */
const dropdownMenus = {
  '/services': { kind: 'services', items: services },
  '/calculators': { kind: 'calculators', groups: calculatorGroups },
}

/** Circular brand social links */
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

/**
 * Brand lockup: the Parvath mark, then "Life & Legacy Advisors" set beside it.
 * Over the hero photo the light mark (ivory wordmark) is swapped in.
 */
function Wordmark({ isTransparent = false, compact = false }) {
  return (
    <span className="flex items-center gap-3">
      <img
        src={isTransparent ? '/brand/parvath-logo-light.png' : '/brand/parvath-logo.png'}
        alt="Parvath"
        width="640"
        height="479"
        className={`w-auto transition-[height] duration-300 ${compact ? 'h-11' : 'h-12 sm:h-14'}`}
        decoding="async"
      />
      <span
        className={`hidden border-l pl-3 text-[0.5625rem] leading-[1.35] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 sm:block ${
          isTransparent ? 'border-ivory/30 text-gold-soft' : 'border-line text-gold-ink'
        }`}
      >
        Life &amp; Legacy
        <br />
        Advisors
      </span>
    </span>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isTransparent = isHome && !isScrolled && !open
  // Slim bar once the page has scrolled (full height again while the mobile menu is open)
  const compact = isScrolled && !open
  const reduced = useReducedMotion()
  const toggleRef = useRef(null)
  const closeTimer = useRef(null)

  const openMenu = (key) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setOpenDropdown(key)
  }

  const scheduleCloseMenu = () => {
    // Clear any pending close first — leaving the panel and its <li> fires two
    // mouseleaves, and an untracked timer could close the *next* menu opened.
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => {
      closeTimer.current = null
      setOpenDropdown(null)
    }, 180)
  }

  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = null
    setOpenDropdown(null)
  }

  // Close any open dropdown/accordion on route change
  const [prevPath, setPrevPath] = useState(location.pathname)
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname)
    setOpenDropdown(null)
    setMobileExpanded(null)
  }

  // Clear pending timers on unmount
  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  // Escape closes an open desktop dropdown
  useEffect(() => {
    if (!openDropdown) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openDropdown])

  // Track scroll position via Lenis smooth scroll
  const lenis = useLenis((instance) => {
    setIsScrolled(instance.scroll > 25)
  })

  // Native window scroll fallback for reliability
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setIsScrolled(scrollY > 25)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock page scroll and trap escape when mobile menu is active. Lenis drives
  // scrolling, so body overflow alone doesn't hold the page still — pause it too.
  // (On a route change the preloader's own stop() runs after this cleanup.)
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    lenis?.stop()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = overflow
      lenis?.start()
      document.removeEventListener('keydown', onKey)
    }
  }, [open, lenis])

  // The mobile menu only exists below `lg`; close it if the viewport grows past that
  useEffect(() => {
    if (!open) return
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      {/* ---- Main Navigation: Transparent at top of Hero, Floating Solid Pill on scroll ---- */}
      <div
        className={`mx-auto px-3 transition-all duration-300 sm:px-6 ${
          compact ? 'mt-2 max-w-6xl' : 'mt-2 max-w-6xl sm:mt-2.5 xl:max-w-7xl'
        }`}
      >
        <div
          className={`${
            open ? 'rounded-2xl' : 'rounded-full'
          } ${
            isTransparent
              ? 'border border-transparent bg-transparent shadow-none'
              : 'border border-line/70 bg-white/95 backdrop-blur-md shadow-[0_12px_36px_-6px_rgba(23,63,53,0.18),0_4px_12px_-2px_rgba(23,63,53,0.08)]'
          } transition-all duration-300`}
        >
          <a
            href="#main"
            className="sr-only rounded-full bg-forest px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50"
          >
            Skip to content
          </a>

          <nav aria-label="Primary" className="w-full pl-4 pr-2 sm:pl-8 sm:pr-3">
            <div
              className={`flex items-center justify-between transition-all duration-300 ${
                compact ? 'py-1.5' : 'py-2 sm:py-2.5'
              }`}
            >
              {/* Wordmark Logo */}
              <Link
                to="/"
                className="mr-4 shrink-0 rounded-full xl:mr-8 transition-transform duration-200 hover:scale-[1.02]"
                aria-label={`${site.name} — home`}
              >
                <Wordmark isTransparent={isTransparent} compact={compact} />
              </Link>

              {/* Navigation Links — clean Title Case with gold underline on active */}
              <ul className="mx-auto hidden items-center gap-3 lg:flex xl:gap-6">
                {navLinks.map((link) => {
                  const menu = dropdownMenus[link.to]
                  const isMenuOpen = Boolean(menu) && openDropdown === link.to

                  return (
                    <li
                      key={link.to}
                      className="relative"
                      onMouseEnter={() => menu && openMenu(link.to)}
                      onMouseLeave={() => menu && scheduleCloseMenu()}
                      onBlur={(e) => {
                        // Tabbing out of the link and its panel closes the menu
                        if (menu && !e.currentTarget.contains(e.relatedTarget)) closeMenu()
                      }}
                    >
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        onFocus={() => menu && openMenu(link.to)}
                        aria-expanded={menu ? isMenuOpen : undefined}
                        className={({ isActive }) =>
                          `relative flex items-center gap-1 py-1 text-[0.8125rem] font-medium tracking-normal whitespace-nowrap transition-colors duration-300 xl:text-[0.875rem] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:transition-all after:duration-300 after:content-[''] ${
                            isTransparent
                              ? isActive
                                ? 'text-white after:w-full after:bg-gold-soft'
                                : 'text-white/85 after:w-0 after:bg-gold-soft hover:text-white hover:after:w-full'
                              : isActive
                                ? 'text-forest after:w-full after:bg-gold'
                                : 'text-charcoal/85 after:w-0 after:bg-gold hover:text-forest hover:after:w-full'
                          }`
                        }
                      >
                        {link.label}
                        {menu && (
                          <ChevronDown
                            aria-hidden="true"
                            className={`h-3 w-3 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                            strokeWidth={2}
                          />
                        )}
                      </NavLink>

                      {menu && (
                        <AnimatePresence>
                          {isMenuOpen && (
                            <motion.div
                              initial={reduced ? false : { opacity: 0, y: 8 }}
                              animate={reduced ? {} : { opacity: 1, y: 0 }}
                              exit={reduced ? {} : { opacity: 0, y: 8 }}
                              transition={{ duration: 0.22, ease: EASE }}
                              onClick={(e) => e.target.closest('a') && closeMenu()}
                              className={`absolute left-1/2 top-full z-50 mt-4 -translate-x-1/2 rounded-2xl before:absolute before:inset-x-0 before:-top-4 before:h-4 before:content-[''] border border-line/70 bg-white/98 p-5 shadow-[0_24px_48px_-12px_rgba(23,63,53,0.22),0_8px_24px_-4px_rgba(23,63,53,0.1)] backdrop-blur-md ${
                                menu.kind === 'services' ? 'w-[560px]' : 'w-[680px]'
                              }`}
                            >
                              {menu.kind === 'services' && (
                                <div className="grid grid-cols-2 gap-1.5">
                                  {menu.items.map((service) => {
                                    const Icon = serviceIconMap[service.icon]
                                    return (
                                      <Link
                                        key={service.slug}
                                        to={service.path}
                                        className="group flex items-start gap-3 rounded-xl p-3 text-left transition-colors duration-200 hover:bg-cream"
                                      >
                                        {Icon && (
                                          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-cream text-forest transition-colors duration-200 group-hover:border-forest group-hover:bg-forest group-hover:text-gold-soft">
                                            <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                                          </span>
                                        )}
                                        <span>
                                          <span className="block text-[0.8125rem] font-semibold text-forest">
                                            {service.title}
                                          </span>
                                          <span className="mt-0.5 line-clamp-2 block text-[0.75rem] leading-snug text-muted">
                                            {service.summary}
                                          </span>
                                        </span>
                                      </Link>
                                    )
                                  })}
                                </div>
                              )}

                              {menu.kind === 'calculators' && (
                                <div className="grid grid-cols-4 gap-5">
                                  {menu.groups.map((group) => (
                                    <div key={group.key}>
                                      <p className="text-[0.6875rem] font-semibold tracking-[0.12em] text-gold-ink uppercase">
                                        {group.label}
                                      </p>
                                      <ul className="mt-2.5 flex flex-col gap-1.5">
                                        {group.items.map((calc) => (
                                          <li key={calc.slug}>
                                            <Link
                                              to={calc.path}
                                              className="block rounded-lg px-1.5 py-1 text-[0.8125rem] text-charcoal/80 transition-colors duration-200 hover:bg-cream hover:text-forest"
                                            >
                                              {calc.title.replace(' Calculator', '')}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <div className="mt-4 border-t border-line/70 pt-3">
                                <Link
                                  to={link.to}
                                  className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-[0.04em] text-forest transition-colors duration-200 hover:text-gold-ink"
                                >
                                  View all {link.label.toLowerCase()}
                                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} />
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </li>
                  )
                })}
              </ul>

              {/* Book a Consultation CTA Button */}
              <div className="ml-4 hidden shrink-0 items-center lg:flex xl:ml-8">
                <Link
                  to="/contact"
                  className={`group inline-flex items-center gap-2 rounded-full text-[0.75rem] ${
                    compact ? 'px-5 py-2' : 'px-5 py-2.5'
                  } font-semibold tracking-[0.06em] uppercase shadow-xs transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5 xl:text-[0.8125rem] ${
                    isTransparent
                      ? 'bg-white text-forest hover:bg-ivory'
                      : 'bg-forest text-white hover:bg-forest-soft'
                  }`}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </Link>
              </div>

              {/* Mobile Hamburger Toggle Button */}
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 lg:hidden ${
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-forest hover:bg-forest/5'
                }`}
              >
                {open ? (
                  <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Dropdown Panel */}
          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                key="panel"
                className="overflow-hidden border-t border-line bg-ivory lg:hidden rounded-b-2xl"
                initial={reduced ? false : { height: 0, opacity: 0 }}
                animate={reduced ? {} : { height: 'auto', opacity: 1 }}
                exit={reduced ? {} : { height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div
                  data-lenis-prevent
                  className="shell flex max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto overscroll-contain py-6 sm:max-h-[calc(100dvh-7rem)]"
                  onClick={(e) => {
                    if (e.target.closest('a')) setOpen(false)
                  }}
                >
                  {navLinks.map((link, i) => {
                    const menu = dropdownMenus[link.to]
                    const isExpanded = menu && mobileExpanded === link.to
                    const subItems = menu?.kind === 'services' ? menu.items : []

                    return (
                      <motion.div
                        key={link.to}
                        initial={reduced ? false : { opacity: 0, y: 10 }}
                        animate={reduced ? {} : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: EASE, delay: reduced ? 0 : 0.06 + i * 0.045 }}
                      >
                        <div className="flex items-center border-b border-line/70">
                          <NavLink
                            to={link.to}
                            end={link.to === '/'}
                            className={({ isActive }) =>
                              `flex flex-1 items-baseline gap-3 py-3.5 font-display text-2xl transition-colors duration-300 ${
                                isActive ? 'text-gold-ink' : 'text-forest'
                              }`
                            }
                          >
                            <span className="w-6 text-[0.625rem] font-medium tracking-[0.14em] text-gold-ink">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {link.label}
                          </NavLink>
                          {menu && (
                            <button
                              type="button"
                              onClick={() => setMobileExpanded(isExpanded ? null : link.to)}
                              aria-expanded={isExpanded}
                              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${link.label} menu`}
                              className="flex h-11 w-11 shrink-0 items-center justify-center text-forest"
                            >
                              <ChevronDown
                                aria-hidden="true"
                                className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                strokeWidth={2}
                              />
                            </button>
                          )}
                        </div>

                        {menu && (
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={reduced ? false : { height: 0, opacity: 0 }}
                                animate={reduced ? {} : { height: 'auto', opacity: 1 }}
                                exit={reduced ? {} : { height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: EASE }}
                                className="overflow-hidden border-b border-line/70"
                              >
                                {menu.kind === 'calculators' ? (
                                  <div className="py-2 pl-9">
                                    {menu.groups.map((group) => (
                                      <div key={group.key}>
                                        <p className="text-[0.625rem] font-semibold tracking-[0.12em] text-gold-ink uppercase mt-3 first:mt-0 mb-1 pl-1">
                                          {group.label}
                                        </p>
                                        <ul className="flex flex-col gap-0.5">
                                          {group.items.map((item) => (
                                            <li key={item.slug}>
                                              <Link to={item.path} className="block py-2 text-[0.9375rem] text-charcoal/80">
                                                {item.title.replace(' Calculator', '')}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <ul className="flex flex-col gap-0.5 py-2 pl-9">
                                    {subItems.map((item) => (
                                      <li key={item.slug}>
                                        <Link to={item.path} className="block py-2 text-[0.9375rem] text-charcoal/80">
                                          {item.title.replace(' Calculator', '')}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.div>
                    )
                  })}

                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      to="/contact"
                      className="flex items-center justify-center gap-2 rounded-full bg-forest py-3.5 text-xs font-semibold tracking-wider text-white uppercase shadow-lift transition-all hover:bg-forest-soft"
                    >
                      <span>Book a Consultation</span>
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>

                    <a
                      href={site.phoneHref}
                      className="flex min-h-[44px] items-center justify-center gap-2 py-2.5 text-sm font-medium tracking-[0.04em] text-forest"
                    >
                      <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                      {site.phoneDisplay}
                    </a>

                    <div className="mt-2 flex items-center justify-center gap-3 border-t border-line/60 pt-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow Parvath Life and Legacy Advisors on ${social.name}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-forest shadow-xs transition-all duration-200 hover:scale-110 hover:bg-forest hover:text-gold-soft"
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
