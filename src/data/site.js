/**
 * Single source of truth for verified company information.
 *
 * Every factual claim on the site is sourced from this file. Nothing here is
 * invented: no awards, certifications, registrations, licences, AUM figures,
 * returns or rankings. Items that still need real content are prefixed with
 * `PLACEHOLDER` so they are trivial to find and replace.
 */

export const site = {
  name: 'Parvath Financial Services',
  shortName: 'Parvath',
  founder: 'Varalakshmi Sridhar',
  founderRole: 'Founder – Parvath Financial Services',
  phoneDisplay: '+91 99400 50798',
  phoneHref: 'tel:+919940050798',
  email: 'contact@parvathfinancial.com',
  emailHref: 'mailto:contact@parvathfinancial.com',
  // PLACEHOLDER: replace with the firm's real published address, if any.
  location: 'Chennai, Tamil Nadu',
  url: 'https://www.parvathfinancial.com',
  social: {
    facebook: 'https://www.facebook.com/parvathfinancial',
    twitter: 'https://twitter.com/parvathfinance',
    linkedin: 'https://www.linkedin.com/company/parvath-financial-services',
    whatsapp:
      'https://wa.me/919940050798?text=Hello%20Parvath%20Financial%20Services%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services',
    youtube: 'https://www.youtube.com/@parvathfinancial',
  },
  positioning:
    'Partners with business owners, professionals and families to create, grow, protect and transfer wealth through structured financial planning.',
}

export const stats = [
  { value: '20+', label: 'Years Corporate Experience' },
  { value: '7+', label: 'Years Financial Advisory' },
  { value: '200+', label: 'Families & Businesses Served' },
  { value: '6', label: 'Core Financial Planning Areas' },
]

export const founderStats = [
  { value: '20+ Years', label: 'Corporate Experience' },
  { value: '7+ Years', label: 'Financial Advisory' },
  { value: '200+', label: 'Families & Businesses' },
]

export const services = [
  {
    number: '01',
    slug: 'wealth-creation',
    path: '/services/wealth-creation',
    title: 'Wealth Creation',
    icon: 'TrendingUp',
    summary:
      'Build a structured approach toward long-term wealth creation aligned with your goals and risk profile.',
    intro:
      'Wealth is rarely created by a single decision. It is the result of a structured plan, followed consistently, reviewed honestly and adjusted as life changes.',
    detail: [
      'We begin with what you are actually working towards — a home, a child’s education, a business expansion, financial independence — and give each goal a timeline and a sense of proportion. Only then does the question of where money should sit become answerable.',
      'From there we look at your existing holdings, your cash flow, and how much fluctuation you are genuinely comfortable living with. The aim is a portfolio you can stay invested in through difficult markets, because a plan you abandon halfway is not a plan.',
    ],
    points: [
      {
        title: 'Goal mapping',
        body: 'Each objective is given a horizon, a priority and an indicative requirement.',
      },
      {
        title: 'Risk profiling',
        body: 'An honest reading of the volatility you can carry, not the volatility you should tolerate on paper.',
      },
      {
        title: 'Asset allocation',
        body: 'A structure across asset classes appropriate to your timelines and circumstances.',
      },
      {
        title: 'Periodic review',
        body: 'Regular check-ins so the portfolio keeps pace with your life, not only with markets.',
      },
    ],
    forWhom: 'Professionals, families and business owners building long-term capital.',
  },
  {
    number: '02',
    slug: 'retirement-planning',
    path: '/services/retirement-planning',
    title: 'Retirement Planning',
    icon: 'Sunrise',
    summary:
      'Prepare for financial independence and a retirement lifestyle with clarity and confidence.',
    intro:
      'Retirement planning is less about an age and more about a question: at what point does work become optional?',
    detail: [
      'We translate the retirement you have in mind into a number — the corpus needed to support that lifestyle, adjusted for inflation and for the fact that retirements now routinely last three decades.',
      'Then we work backwards. What is already in place, what needs to be built, and how income can be drawn once accumulation stops. Business owners get particular attention here, since their retirement and their business exit are usually the same event.',
    ],
    points: [
      {
        title: 'Lifestyle costing',
        body: 'What your intended retirement actually costs, in today’s terms and tomorrow’s.',
      },
      {
        title: 'Corpus planning',
        body: 'The gap between what exists today and what the plan requires.',
      },
      {
        title: 'Income structuring',
        body: 'How money is drawn down once the salary or business income stops.',
      },
      {
        title: 'Longevity view',
        body: 'Planning for a retirement that may run longer than the career that funded it.',
      },
    ],
    forWhom: 'Salaried professionals and business owners planning financial independence.',
  },
  {
    number: '03',
    slug: 'life-insurance',
    path: '/services/life-insurance',
    title: 'Life Insurance',
    icon: 'ShieldCheck',
    summary: "Protect your family’s financial future against life’s uncertainties.",
    intro:
      'Protection is the part of a financial plan nobody wants to think about and no plan is complete without.',
    detail: [
      'The starting point is a needs assessment rather than a product. What would it take to keep your family’s life materially unchanged — outstanding liabilities cleared, dependants supported, commitments such as education met — if your income stopped tomorrow?',
      'That figure, set against what you already hold, tells us what is actually required. We then look at structure: who owns the policy, who is nominated, and how the proceeds would reach the people they are meant for.',
    ],
    points: [
      {
        title: 'Needs assessment',
        body: 'Cover sized against liabilities, dependants and long-term commitments.',
      },
      {
        title: 'Gap analysis',
        body: 'A clear reading of existing cover against what the plan requires.',
      },
      {
        title: 'Policy structuring',
        body: 'Ownership and nomination arranged so proceeds reach the right hands.',
      },
      {
        title: 'Periodic revisit',
        body: 'Cover reviewed as income, liabilities and family circumstances change.',
      },
    ],
    forWhom: 'Anyone whose income supports another person — or a business.',
  },
  {
    number: '04',
    slug: 'legacy-planning',
    path: '/services/legacy-planning',
    title: 'Legacy Planning',
    icon: 'Landmark',
    summary: 'Plan how your wealth can be preserved and transferred across generations.',
    intro:
      'Wealth that has taken decades to build can be complicated to pass on. Legacy planning is the work of making that transfer orderly.',
    detail: [
      'Most families discover the difficulty only at the worst possible moment — assets spread across institutions, nominations never updated, a business with no stated succession, and no single document that says what was intended.',
      'We help bring that picture together: what exists, where it sits, who it is meant for, and what needs to be formalised. Where specialist legal or tax counsel is required, we work alongside it rather than in place of it.',
    ],
    points: [
      {
        title: 'Asset consolidation',
        body: 'A single, current view of what is held and where.',
      },
      {
        title: 'Succession intent',
        body: 'Clarity on who receives what, and on what terms.',
      },
      {
        title: 'Nomination hygiene',
        body: 'Nominations and beneficiary details reviewed and kept current.',
      },
      {
        title: 'Family conversation',
        body: 'Helping the next generation understand the plan before they inherit it.',
      },
    ],
    forWhom: 'Families and business owners thinking one generation ahead.',
  },
  {
    number: '05',
    slug: 'employee-benefits',
    path: '/services/employee-benefits',
    title: 'Employee Benefit Solutions',
    icon: 'Users',
    summary: 'Help businesses create meaningful and structured employee benefit programs.',
    intro:
      'A benefits programme is one of the clearest statements a company makes about how it regards its people.',
    detail: [
      'We work with employers to structure benefits that are genuinely valued by employees and sustainable for the business — rather than a collection of policies accumulated over the years without a common design.',
      'That includes understanding the shape of your workforce, what your obligations are, what your peers offer, and how the programme should be communicated so that employees actually understand what they have.',
    ],
    points: [
      {
        title: 'Benefit design',
        body: 'A programme structured around your workforce and your obligations.',
      },
      {
        title: 'Cost clarity',
        body: 'A clear view of what the programme costs the business, now and over time.',
      },
      {
        title: 'Employee communication',
        body: 'Benefits explained in terms the team can understand and use.',
      },
      {
        title: 'Ongoing review',
        body: 'The programme revisited as the organisation grows and changes.',
      },
    ],
    forWhom: 'Employers building or restructuring a benefits programme.',
  },
  {
    number: '06',
    slug: 'group-gratuity',
    path: '/services/group-gratuity',
    title: 'Group Gratuity Schemes',
    icon: 'Building2',
    summary:
      'Structured gratuity solutions designed to support employers and their employees.',
    intro:
      'Gratuity is a long-dated obligation. Funding it deliberately is considerably easier than meeting it from cash flow when it falls due.',
    detail: [
      'Many businesses carry gratuity as an unfunded liability that grows quietly in the background until a cluster of long-serving employees retires at once. A structured scheme turns that into a planned, predictable commitment.',
      'We help employers understand the liability they are carrying, evaluate how a funded arrangement would work for their organisation, and set up the administration so the scheme runs without becoming a burden.',
    ],
    points: [
      {
        title: 'Liability assessment',
        body: 'An understanding of the gratuity obligation the business currently carries.',
      },
      {
        title: 'Scheme structuring',
        body: 'A funding arrangement appropriate to the size and profile of the organisation.',
      },
      {
        title: 'Administration support',
        body: 'Help with the operational side so the scheme is straightforward to run.',
      },
      {
        title: 'Annual review',
        body: 'The arrangement revisited as headcount and tenure profiles change.',
      },
    ],
    forWhom: 'Employers with a growing gratuity obligation.',
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Understand',
    body: 'We begin by understanding your goals, priorities, family and business context.',
    icon: 'Search',
    tags: ['Goals & Priorities', 'Family Context', 'Business Context'],
  },
  {
    number: '02',
    title: 'Plan',
    body: 'We develop a structured financial strategy aligned with your objectives.',
    icon: 'ClipboardList',
    tags: ['Structured Strategy', 'Your Objectives'],
  },
  {
    number: '03',
    title: 'Implement',
    body: 'We help translate the plan into appropriate financial actions and solutions.',
    icon: 'Rocket',
    tags: ['Financial Actions', 'Solutions'],
  },
  {
    number: '04',
    title: 'Review',
    body: 'We continue to review and adapt the plan as your life and priorities evolve.',
    icon: 'RefreshCcw',
    tags: ['Ongoing Review', 'Adapts With You'],
  },
]

export const pillars = [
  {
    title: 'Experience',
    body: '20+ years of corporate experience behind every recommendation — an understanding of how careers, organisations and cash flow actually behave.',
    icon: 'Compass',
    tags: ['20+ Years Experience', 'Careers & Cash Flow'],
  },
  {
    title: 'Personalised Planning',
    body: 'Strategies shaped around individual circumstances — your goals, your family and your timelines — rather than a standard set of products.',
    icon: 'PenLine',
    tags: ['Your Goals', 'Your Timelines'],
  },
  {
    title: 'Long-Term Relationships',
    body: 'Financial planning evolves as life changes, so the plan is reviewed and adjusted over the years rather than set once and left.',
    icon: 'Handshake',
    tags: ['Ongoing Review', 'Adapts With You'],
  },
  {
    title: 'Business Understanding',
    body: 'A perspective that connects personal and business wealth, treating the two as one plan rather than separate conversations.',
    icon: 'Briefcase',
    tags: ['Personal Wealth', 'Business Wealth'],
  },
]

export const businessPillars = [
  {
    title: 'Personal Wealth',
    body: 'Wealth held outside the business, built deliberately rather than as an afterthought.',
  },
  {
    title: 'Business Continuity',
    body: 'What happens to the business if a key person is suddenly no longer there.',
  },
  {
    title: 'Retirement',
    body: 'Financial independence that does not depend entirely on selling the business.',
  },
  {
    title: 'Family Legacy',
    body: 'An orderly transfer of both business and personal assets to the next generation.',
  },
]

export const insights = [
  {
    slug: 'understanding-wealth-creation',
    category: 'Wealth',
    title: 'Understanding Wealth Creation',
    excerpt:
      'Why structure, time horizon and consistency tend to matter more to long-term outcomes than the search for a single good investment.',
    readingTime: '6 min read',
  },
  {
    slug: 'planning-for-retirement',
    category: 'Retirement',
    title: 'Planning for Retirement',
    excerpt:
      'Translating the retirement you picture into a number you can plan towards — and working backwards from it.',
    readingTime: '7 min read',
  },
  {
    slug: 'protecting-your-familys-financial-future',
    category: 'Protection',
    title: "Protecting Your Family’s Financial Future",
    excerpt:
      'How a needs-based assessment produces a very different answer to “how much cover?” than a product-led one.',
    readingTime: '5 min read',
  },
  {
    slug: 'financial-planning-for-business-owners',
    category: 'Business',
    title: 'Financial Planning for Business Owners',
    excerpt:
      'Why personal wealth, business continuity, retirement and succession are one conversation rather than four.',
    readingTime: '8 min read',
  },
  {
    slug: 'building-a-family-legacy',
    category: 'Legacy',
    title: 'Building a Family Legacy',
    excerpt:
      'The practical groundwork that makes a generational transfer orderly instead of contested.',
    readingTime: '6 min read',
  },
  {
    slug: 'understanding-employee-benefits',
    category: 'Employers',
    title: 'Understanding Employee Benefits',
    excerpt:
      'What a well-designed benefits programme signals to a workforce — and what an accumulated one signals instead.',
    readingTime: '5 min read',
  },
]

export const faqs = [
  {
    question: 'What does the process of working with Parvath Financial Services look like?',
    answer:
      'It follows four stages — understanding your goals, priorities, family and business context; developing a structured plan aligned with them; helping you implement the appropriate financial actions; and reviewing the plan regularly as your life and priorities evolve.',
  },
  {
    question: 'What kind of financial planning do you help with?',
    answer:
      'Six core areas: wealth creation, retirement planning, life insurance, legacy planning, employee benefit solutions and group gratuity schemes — covering both personal and business financial planning.',
  },
  {
    question: 'Do you work with individuals, or only with business owners?',
    answer:
      'Both. We work with salaried professionals and families building long-term wealth, as well as business owners — for whom personal wealth, business continuity, retirement and succession are usually one conversation rather than several separate ones.',
  },
  {
    question: 'How often is my plan reviewed once it is in place?',
    answer:
      'Plans are revisited on a regular basis rather than left untouched — reviews are built into the process so your portfolio, cover and structuring keep pace with changes in income, family circumstances and goals.',
  },
  {
    question: 'Is the information I share kept confidential?',
    answer:
      'Yes. What you share in a planning conversation is used only to inform the advice and structuring we recommend to you.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Book a consultation through the website, call or WhatsApp our advisory desk, or use the contact form. The first conversation is simply to understand where things stand and whether structured planning would help.',
  },
]

/**
 * PLACEHOLDER CONTENT — replace with verified client testimonials before launch.
 * Do not publish these as if they were real client statements.
 */
export const testimonials = [
  {
    quote:
      'Placeholder testimonial — replace this with a verified client testimonial. Keep it to two or three sentences describing the working relationship rather than investment outcomes.',
    attribution: 'Client name',
    context: 'Business owner · City',
  },
  {
    quote:
      'Placeholder testimonial — replace this with a verified client testimonial. A short account of what changed after the planning conversation works better than general praise.',
    attribution: 'Client name',
    context: 'Professional · City',
  },
]

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Calculators', to: '/calculators' },
  { label: 'Approach', to: '/approach' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
]

export const interestOptions = [
  'Wealth Creation',
  'Retirement Planning',
  'Life Insurance',
  'Legacy Planning',
  'Employee Benefits',
  'Group Gratuity',
  'General Enquiry',
]

export const disclaimer =
  'Parvath Financial Services provides financial planning guidance. Investments in securities and market-linked products are subject to market risks; please read all scheme-related documents carefully before investing. Insurance is the subject matter of solicitation. Past performance is not indicative of future results. Nothing on this website constitutes an offer, a recommendation, or tax or legal advice. PLACEHOLDER: add registration, licence and regulatory disclosure details here before publishing.'

export const siteDescription =
  `${site.name} helps individuals, families and business owners plan, protect and grow their wealth through structured financial planning.`

/**
 * Organisation data for rich results. Deliberately limited to facts that have
 * been verified — no ratings, awards, registrations or address are asserted.
 */
export const organisationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: site.name,
  url: site.url,
  telephone: '+919940050798',
  description: siteDescription,
  founder: { '@type': 'Person', name: site.founder },
  areaServed: 'IN',
  knowsAbout: [
    'Wealth Creation',
    'Retirement Planning',
    'Life Insurance',
    'Legacy Planning',
    'Employee Benefit Solutions',
    'Group Gratuity Schemes',
  ],
}
