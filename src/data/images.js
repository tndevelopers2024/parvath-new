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
  src: '/images/banner/banner-img-by-mohan.avif',
  alt: 'Executive financial advisory desk with Varalakshmi Sridhar analyzing portfolio growth metrics and wealth strategies',
  position: 'object-[75%_center] lg:object-center',
  eyebrow: 'Structured Financial Planning',
  title: 'Structured Wealth. Confident Future.',
  description:
    'We partner with business owners, professionals and families to create, grow, protect and transfer wealth — across wealth creation, retirement planning, life insurance, legacy planning, employee benefits and group gratuity schemes.',
  primaryCta: { label: 'Book a Consultation', to: '/contact', variant: 'light' },
  secondaryCta: { label: 'Explore Services', to: '/services', variant: 'outlineLight' },
}

export const images = {
  /** Full-bleed hero background — wide, used with object-cover, no aspect lock. */
  heroWide: {
    src: '/images/banner/banner-img-by-mohan.avif',
    alt: 'Parvath Financial Services Banner',
    placeholder: false,
  },
  heroMobile: {
    src: '/images/banner/mobile-banner-img-by-mohan.avif',
    alt: 'Parvath Financial Services Mobile Banner',
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
    alt: 'Portrait of Varalakshmi Sridhar, Founder of Parvath Financial Services',
    aspect: '4 / 5',
    placeholder: false,
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
