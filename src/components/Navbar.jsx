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
} from 'lucide-react'
import { useLenis } from 'lenis/react'
import { navLinks, services, site } from '../data/site'
import { calculators, calculatorCategories } from '../data/calculators'
import { EASE } from '../lib/motion'

const serviceIconMap = { TrendingUp, Sunrise, ShieldCheck, Landmark, Users, Building2 }

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

/**
 * Brand lockup: the Parvath mark, then "Financial Services" set beside it.
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
        className={`hidden border-l pl-3 text-[0.5625rem] leading-[1.5] font-semibold tracking-[0.26em] uppercase transition-colors duration-300 sm:block ${
          isTransparent ? 'border-ivory/30 text-gold-soft' : 'border-line text-gold-ink'
        }`}
      >
        Financial
        <br />
        Services
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

  // Close any open dropdown/accordion on route change, and clear pending timers on unmount
  useEffect(() => {
    setOpenDropdown(null)
    setMobileExpanded(null)
  }, [location.pathname])

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
                className={`-mr-2 flex items-center justify-center rounded-full transition-all duration-300 lg:hidden ${
                  compact ? 'h-10 w-10' : 'h-11 w-11'
                } ${
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
                      className="flex items-center justify-center gap-2 py-2 text-sm font-medium tracking-[0.04em] text-forest"
                    >
                      <Phone aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                      {site.phoneDisplay}
                    </a>

                    <div className="mt-2 flex items-center justify-center gap-2.5 border-t border-line/60 pt-4">
                      {socialLinks.map((social) => (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Follow Parvath Financial Services on ${social.name}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-forest shadow-xs transition-all duration-200 hover:scale-110 hover:bg-forest hover:text-gold-soft"
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
