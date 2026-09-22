/**
 * Every image path on the site is declared here.
 *
 * `placeholder: true` means the asset is generated stand-in artwork rather
 * than real photography — the <EditorialImage> component renders a small
 * replaceable marker for those. See public/images/README.md for how to swap
 * in the real files.
 */
/** Single, still hero banner — no slider. */
export const heroBanner = {
  id: 'wealth-creation',
  src: '/images/banner/banner.avif',
  // Portrait crop for phones and upright tablets (see `mobileMedia`)
  mobileSrc: '/images/banner/mobile-banner.avif',
  mobileMedia: '(max-width: 767px), (max-width: 1023px) and (orientation: portrait)',
  alt: 'A smiling family planning their finances together on a laptop at a desk overlooking the city at sunset',
  position: 'object-[60%_center] lg:object-center',
  eyebrow: 'Structured Financial Planning',
  title: 'Structured Wealth. Confident Future.',
  description:
    'We partner with business owners, professionals and families to create, grow, protect and transfer wealth — across wealth creation, retirement planning, life insurance, health insurance, bonds & deposits, legacy planning, employee benefits and group gratuity schemes.',
  // Phones: the text sits over the wall above the family, so it has to be short
  mobileDescription:
    'We partner with business owners, professionals and families to create, grow, protect and transfer wealth.',
  primaryCta: { label: 'Book a Consultation', to: '/contact', variant: 'light' },
  secondaryCta: { label: 'Explore Services', to: '/services', variant: 'outlineLight' },
}

export const images = {
  /** Full-bleed hero background — wide, used with object-cover, no aspect lock. */
  heroWide: {
    src: '/images/banner/banner.avif',
    alt: 'Parvath Life and Legacy Advisors Banner',
    placeholder: false,
  },
  heroMobile: {
    src: '/images/banner/mobile-banner.avif',
    alt: 'Parvath Life and Legacy Advisors Mobile Banner',
    placeholder: false,
  },
  hero: {
    src: '/images/plate-hero.svg',
    alt: 'Arched colonnade receding toward warm daylight',
    aspect: '4 / 5',
    placeholder: true,
  },
  founder: {
    src: '/images/about/varalakshmi-sridhar-2.avif',
    alt: 'Varalakshmi Sridhar & K Sridhar, Founders of Parvath Life and Legacy Advisors',
    aspect: '4 / 5',
    placeholder: false,
  },
  founders: {
    sridhar: {
      src: '/images/about/k-sridhar.avif',
      fallbackSrc: '/images/plate-founder.svg',
      alt: 'K Sridhar, Founder of Parvath Life and Legacy Advisors',
      aspect: '4 / 5',
      placeholder: true,
      initials: 'KS',
    },
    varalakshmi: {
      src: '/images/about/varalakshmi-sridhar-2.avif',
      fallbackSrc: '/images/about/varalakshmi-sridhar-2.avif',
      alt: 'Varalakshmi Sridhar, Founder of Parvath Life and Legacy Advisors',
      aspect: '4 / 5',
      placeholder: false,
      initials: 'VS',
    },
  },
  business: {
    src: '/images/plate-business.svg',
    alt: 'Wide arcade opening onto light',
    aspect: '3 / 2',
    placeholder: true,
  },
  consultation: {
    src: '/images/plate-consultation.svg',
    alt: 'Quiet arched interior in warm daylight',
    aspect: '4 / 3',
    placeholder: true,
  },
  legacy: {
    src: '/images/plate-legacy.svg',
    alt: 'Arcade opening onto light',
    aspect: '3 / 2',
    placeholder: true,
  },
}
