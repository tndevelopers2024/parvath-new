/**
 * Single source of truth for verified company information.
 *
 * Every factual claim on the site is sourced from this file. Nothing here is
 * invented: no awards, certifications, registrations, licences, AUM figures,
 * returns or rankings. Items that still need real content are prefixed with
 * `PLACEHOLDER` so they are trivial to find and replace.
 */

import { blogs } from './blogs'

export const site = {
  name: 'Parvath Life and Legacy Advisors',
  shortName: 'Parvath',
  founders: [
    {
      id: 'k-sridhar',
      name: 'K Sridhar',
      role: 'Founder & Principal Advisor',
      shortRole: 'Founder',
      experience: '20+ Years Corporate Advisory',
      focus: 'Corporate Advisory, Business Continuity & Risk Shielding',
      specialties: [
        'Corporate Continuity & Succession',
        'Promoter Risk Shielding & Keyman Cover',
        'Buy-Sell Agreements & Partnership Liquidity',
        'Executive Benefits & Group Gratuity Schemes',
      ],
      bio: 'Bringing over two decades of senior corporate advisory insight, K Sridhar works closely with business owners, promoters, and leadership teams to ensure personal and enterprise wealth are seamlessly shielded, capitalized, and transferred across generations.',
      image: null,
      initials: 'KS',
      ctaLabel: 'Discuss Business Advisory',
      ctaPath: '/contact?interest=business-continuity',
    },
    {
      id: 'varalakshmi-sridhar',
      name: 'Varalakshmi Sridhar',
      role: 'Founder & Principal Advisor',
      shortRole: 'Founder',
      experience: '7+ Years Financial Advisory',
      focus: 'Comprehensive Wealth Creation, Family Protection & Retirement',
      specialties: [
        'Structured Long-Term Wealth Creation',
        'Multi-Generational Legacy & Succession',
        'Retirement Freedom & Guaranteed Cashflows',
        'Holistic Family Life & Health Risk Shielding',
      ],
      bio: 'With over 7 years in financial advisory and 200+ families guided, Varalakshmi Sridhar leads comprehensive portfolio planning, translating personal milestones into disciplined, resilient wealth strategies and lasting family peace of mind.',
      image: '/images/about/varalakshmi-sridhar-2.avif',
      initials: 'VS',
      ctaLabel: 'Discuss Family Wealth',
      ctaPath: '/contact?interest=wealth-creation',
    },
  ],
  founder: 'K Sridhar & Varalakshmi Sridhar',
  founderRole: 'Founders – Parvath Life and Legacy Advisors',
  phoneDisplay: '+91 99400 50798',
  phoneHref: 'tel:+919940050798',
  email: 'contact@parvathfinserv.com',
  emailHref: 'mailto:contact@parvathfinserv.com',
  location: 'No. 46, Drowpathy Amman Koil Street, Ullagaram, Chennai - 600 091',
  locationHref:
    'https://maps.google.com/?q=No.+46,+Drowpathy+Amman+Koil+Street,+Ullagaram,+Chennai+-+600091',
  url: 'https://www.parvathfinancial.com',
  social: {
    facebook: 'https://www.facebook.com/parvathfinancial',
    twitter: 'https://twitter.com/parvathfinance',
    linkedin: 'https://www.linkedin.com/company/parvath-financial-services',
    whatsapp:
      'https://wa.me/919940050798?text=Hello%20Parvath%20Life%20and%20Legacy%20Advisors%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services',
    youtube: 'https://www.youtube.com/@parvathfinancial',
  },
  positioning:
    'Partners with business owners, professionals and families to create, grow, protect and transfer wealth through structured financial planning.',
}

export const stats = [
  { value: '20+', label: 'Years Corporate Experience' },
  { value: '7+', label: 'Years Financial Advisory' },
  { value: '200+', label: 'Families & Businesses Served' },
  { value: '8', label: 'Core Financial Planning Areas' },
]

export const founderStats = [
  { value: '20+ Years', label: 'Corporate Advisory Experience' },
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
    signs: [
      'You are saving regularly, but without a clear idea of what each investment is for.',
      'Your investments have grown piecemeal over the years and no longer add up to a plan.',
      'A large goal — a home, a child’s education, a business expansion — is within ten years.',
      'Market swings make you want to stop investing, or to change course every few months.',
    ],
    deliverables: [
      { title: 'A goal map', body: 'Every objective written down with a horizon, a priority and an indicative amount.' },
      { title: 'An allocation that fits', body: 'A structure across asset classes matched to your timelines and to the volatility you can live with.' },
      { title: 'A review rhythm', body: 'Agreed check-in points so the plan is adjusted deliberately, not reactively.' },
    ],
    calculators: ['sip', 'lumpsum', 'sip-top-up', 'cost-of-delay'],
    faqs: [
      {
        question: 'How much do I need to start?',
        answer: 'There is no fixed minimum for a planning conversation. The plan is built around your cash flow as it is today, and a modest amount invested consistently is often more useful than a large amount invested once.',
      },
      {
        question: 'Will you recommend specific investments in the first meeting?',
        answer: 'No. The first conversation is about understanding your goals, timelines and existing holdings. Recommendations only make sense once that picture is clear.',
      },
      {
        question: 'What happens when markets fall?',
        answer: 'A plan built around your real tolerance for volatility is designed to be held through difficult periods. Reviews are the place to adjust it — calmly, and against your goals rather than the headlines.',
      },
    ],
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
    signs: [
      'You have a retirement age in mind, but no clear number to go with it.',
      'Most of your retirement savings sit in one place — often the business or a single account.',
      'You are within fifteen years of stopping work and want to know whether you are on track.',
      'You are unsure how income will actually be drawn once the salary or business income stops.',
    ],
    deliverables: [
      { title: 'Your retirement number', body: 'An inflation-adjusted estimate of the corpus your intended lifestyle requires.' },
      { title: 'A gap and a path', body: 'A clear view of what exists today, what still needs to be built, and how.' },
      { title: 'An income plan', body: 'A structure for drawing income once accumulation stops, planned for a long retirement.' },
    ],
    calculators: ['dream-retirement', 'swp', 'limited-period-sip', 'cost-of-delay'],
    faqs: [
      {
        question: 'When should I start planning for retirement?',
        answer: 'As early as possible, because time does much of the work. That said, a plan made later is still far better than none — it simply needs to be more deliberate about the gap.',
      },
      {
        question: 'I own a business. Is my business my retirement plan?',
        answer: 'For many owners it is, in practice. Planning helps reduce the dependence on a single sale or exit, so retirement does not rest entirely on one event going well.',
      },
      {
        question: 'How do you account for inflation and longer retirements?',
        answer: 'Retirement costs are estimated in future terms, not today’s, and the plan assumes a retirement that could run for decades rather than a few years.',
      },
    ],
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
    signs: [
      'Someone depends on your income — a partner, children, parents or a business.',
      'You have taken on a home loan or another large liability.',
      'Your family has grown, or your income has changed, since your cover was last reviewed.',
      'You hold several policies but are unsure what they add up to, or who is nominated.',
    ],
    deliverables: [
      { title: 'A needs figure', body: 'The cover your family would actually require, sized against liabilities and commitments.' },
      { title: 'A gap reading', body: 'Existing policies set against that figure, so you know what is missing — or duplicated.' },
      { title: 'A tidy structure', body: 'Ownership and nominations reviewed so proceeds reach the people they are meant for.' },
    ],
    calculators: ['life-insurance-need', 'child-education'],
    faqs: [
      {
        question: 'How much life cover do I need?',
        answer: 'It depends on what the cover has to do — clear liabilities, replace income for a period, and fund commitments such as education. A needs assessment turns those into a figure rather than a rule of thumb.',
      },
      {
        question: 'I already have cover through my employer. Is that enough?',
        answer: 'Sometimes, but employer cover is usually tied to the job and may not match your family’s full needs. It is worth reading it alongside everything else you hold.',
      },
      {
        question: 'Do you only look at new policies?',
        answer: 'No. Reviewing existing policies, nominations and ownership is often as valuable as adding cover.',
      },
    ],
  },
  {
    number: '04',
    slug: 'health-insurance',
    path: '/services/health-insurance',
    title: 'Health Insurance',
    icon: 'HeartPulse',
    summary:
      'Shield your family wealth and future against medical emergencies and escalating healthcare costs.',
    intro:
      'A single healthcare crisis should never derail a lifetime of disciplined wealth creation.',
    detail: [
      'Healthcare inflation consistently outpaces general inflation. When an unexpected hospitalization or critical illness strikes, paying out of pocket can force families to liquidate long-term investments prematurely or incur debt.',
      'We evaluate your family’s healthcare risks, decode room rent limits, disease co-pays, restoration features, and waiting periods, and structure comprehensive standalone and super top-up coverage that genuinely protects your balance sheet when you need it most.',
    ],
    points: [
      {
        title: 'Comprehensive family cover',
        body: 'Sized against modern private healthcare costs, not generic sum-insured figures.',
      },
      {
        title: 'Policy feature evaluation',
        body: 'Clear reading of room rent limits, co-payments, restoration benefits, and consumables cover.',
      },
      {
        title: 'Super top-up structuring',
        body: 'Cost-effective coverage scaling that builds high-sum protection on top of base cover.',
      },
      {
        title: 'Claim guidance & review',
        body: 'Ensuring disclosures, nominations, and coverage limits keep pace with family healthcare needs.',
      },
    ],
    forWhom: 'Families, self-employed individuals, and professionals needing resilient healthcare protection.',
    signs: [
      'You rely solely on corporate group health cover, which ends if you change jobs or retire.',
      'Your family health cover has not been increased in the last three to five years.',
      'Your current policy has severe room rent caps or co-payment clauses you are unsure about.',
      'Senior parents have inadequate cover, leaving medical expenses to be paid from cash reserves.',
    ],
    deliverables: [
      { title: 'A coverage audit', body: 'A thorough examination of current policies, identifying sub-limits, exclusions, and shortfall risks.' },
      { title: 'A tailored structure', body: 'Base cover paired with cost-effective super top-ups tailored to your family medical history.' },
      { title: 'Annual review cadence', body: 'Periodic evaluation to adjust sum insured as medical costs and family demographics evolve.' },
    ],
    calculators: [],
    faqs: [
      {
        question: 'Is my employer-provided health insurance enough?',
        answer: 'Corporate health cover is a valuable benefit, but it is tied to employment and can be revised or cancelled at the employer’s discretion. Having an independent family policy guarantees continuity irrespective of career transitions or retirement.',
      },
      {
        question: 'What is the benefit of a super top-up policy?',
        answer: 'A super top-up policy provides high sum insured at a fraction of the cost of a standard policy by applying a deductible. When combined with a modest base policy, it creates large medical protection very cost-effectively.',
      },
      {
        question: 'How do you handle pre-existing conditions?',
        answer: 'Complete and transparent medical disclosure during underwriting is critical. We ensure all disclosures are made meticulously so that claims are processed smoothly without dispute later.',
      },
    ],
  },
  {
    number: '05',
    slug: 'bonds-and-deposits',
    path: '/services/bonds-and-deposits',
    title: 'Bonds & Deposits',
    icon: 'Coins',
    summary:
      'Preserve capital and generate predictable, fixed-income yields through curated debt instruments.',
    intro:
      'Return of capital matters just as much as return on capital. Fixed-income structuring provides the foundation of stability.',
    detail: [
      'Every resilient financial plan requires an anchor — capital that does not fluctuate with equity market cycles and produces reliable, predictable cash flow. However, holding all reserves in conventional savings accounts often fails to beat inflation or optimize post-tax yields.',
      'We assist in selecting and structuring high-grade fixed income instruments — including government securities (G-Secs), sovereign gold bonds, corporate bonds, high-rated company fixed deposits, and structured debt. The aim is steady cash flows, capital preservation, and liquidity matched to your near-term obligations.',
    ],
    points: [
      {
        title: 'Capital preservation',
        body: 'Focusing on high-credit-rating instruments that prioritize safety of principal.',
      },
      {
        title: 'Predictable cash flows',
        body: 'Structuring coupon and interest payouts to meet recurring living or business expenses.',
      },
      {
        title: 'Tenure & liquidity matching',
        body: 'Laddering maturities so funds become available exactly when near-term goals come due.',
      },
      {
        title: 'Credit risk assessment',
        body: 'Disciplined evaluation of issuer balance sheets, credit ratings, and underlying fundamentals.',
      },
    ],
    forWhom: 'Retirees, conservative investors, and businesses seeking steady returns with high safety of capital.',
    signs: [
      'A large portion of your wealth sits in low-yielding bank accounts losing value to inflation.',
      'You want regular, predictable income without being vulnerable to stock market volatility.',
      'You have specific capital commitments due in 1 to 5 years and cannot afford market downside.',
      'You hold unrated or high-risk corporate deposits and need an objective credit evaluation.',
    ],
    deliverables: [
      { title: 'A fixed-income ladder', body: 'A staggered maturity framework ensuring recurring liquidity and steady coupon payments.' },
      { title: 'Credit quality assessment', body: 'An objective review of issuers, tenures, and security types to avoid concentration risk.' },
      { title: 'Cash flow timeline', body: 'A mapped schedule of interest payouts aligned with your lifestyle or operational needs.' },
    ],
    calculators: ['lumpsum', 'swp'],
    faqs: [
      {
        question: 'How are bonds different from fixed deposits?',
        answer: 'While fixed deposits are non-tradeable contracts with banks or NBFCs, bonds are debt securities issued by governments or corporations that can often be traded in secondary markets and may offer varied coupon structures and yields.',
      },
      {
        question: 'What is bond laddering?',
        answer: 'Laddering involves spreading your investments across bonds with different maturity dates (e.g., 1, 2, 3, and 5 years). This ensures regular liquidity, reduces interest-rate reinvestment risk, and provides steady cash flow.',
      },
      {
        question: 'Are company fixed deposits safe?',
        answer: 'Corporate deposits carry higher interest rates than bank FDs because they carry credit risk. We look closely at credit ratings (AAA / AA+), company track records, and balance sheet health before any allocation is considered.',
      },
    ],
  },
  {
    number: '06',
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
    signs: [
      'Your assets are spread across several banks, institutions or properties.',
      'Nominations and beneficiary details have not been checked in years.',
      'You own a business with no stated plan for who takes it forward.',
      'Your family would struggle to find everything if something happened unexpectedly.',
    ],
    deliverables: [
      { title: 'One complete picture', body: 'A single, current record of what is held, where it sits and who it is meant for.' },
      { title: 'Clear intentions', body: 'Succession wishes articulated, with the gaps that need formalising identified.' },
      { title: 'A family that understands', body: 'Support in explaining the plan to the next generation before they need it.' },
    ],
    calculators: ['child-education', 'grand-wedding', 'life-insurance-need'],
    faqs: [
      {
        question: 'Is legacy planning only for very wealthy families?',
        answer: 'No. Any family with property, investments, insurance or a business benefits from making the transfer orderly. Complications tend to come from disorganisation more than from size.',
      },
      {
        question: 'Do you draft wills or legal documents?',
        answer: 'Where formal legal or tax work is needed, we work alongside qualified professionals rather than in place of them. Our role is to bring the picture together and make intentions clear.',
      },
      {
        question: 'When should the next generation be involved?',
        answer: 'Usually earlier than people expect. A plan that heirs already understand is far easier to carry out.',
      },
    ],
  },
  {
    number: '07',
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
    signs: [
      'Your benefits have been added one policy at a time, without a common design.',
      'Employees do not seem to know — or value — what the company provides.',
      'You are growing quickly and want benefits that help attract and retain people.',
      'You are unsure what the programme costs the business over time.',
    ],
    deliverables: [
      { title: 'A coherent programme', body: 'Benefits designed around your workforce and obligations, rather than accumulated by accident.' },
      { title: 'Cost clarity', body: 'A clear view of what the programme costs today and how that changes as you grow.' },
      { title: 'Benefits people understand', body: 'Communication that helps employees know what they have and how to use it.' },
    ],
    calculators: [],
    faqs: [
      {
        question: 'We are a small business. Is a benefits programme relevant?',
        answer: 'Often more so. A well-designed programme can help a smaller employer compete for and keep good people, and it can be scaled as the team grows.',
      },
      {
        question: 'Can you work with the benefits we already have?',
        answer: 'Yes. The starting point is usually a review of what is already in place, so the programme is improved rather than rebuilt for its own sake.',
      },
      {
        question: 'How often should the programme be reviewed?',
        answer: 'Typically once a year, and whenever the organisation changes meaningfully — a jump in headcount, a new location or a change in workforce profile.',
      },
    ],
  },
  {
    number: '08',
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
    signs: [
      'Gratuity is paid from cash flow when employees leave or retire.',
      'A number of long-serving employees are approaching retirement.',
      'You are unsure how large the gratuity obligation on your books actually is.',
      'Administering gratuity payments takes more effort than it should.',
    ],
    deliverables: [
      { title: 'A clear liability view', body: 'An understanding of the gratuity obligation the business is carrying today.' },
      { title: 'A funded structure', body: 'An evaluation of how a funded scheme would work for your size and workforce profile.' },
      { title: 'Simpler administration', body: 'Support setting up the operational side so the scheme runs smoothly year to year.' },
    ],
    calculators: [],
    faqs: [
      {
        question: 'Why fund gratuity in advance?',
        answer: 'Because the obligation grows every year an employee stays. Funding it gradually turns an unpredictable cash outflow into a planned, predictable commitment.',
      },
      {
        question: 'Does a funded scheme suit smaller employers?',
        answer: 'It can. The right arrangement depends on headcount, tenure profile and cash flow, which is what the evaluation is for.',
      },
      {
        question: 'What does ongoing support involve?',
        answer: 'Revisiting the arrangement as headcount and tenure change, and helping with the administration so the scheme does not become a burden.',
      },
    ],
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

export const insights = blogs
export { blogs }

export const faqs = [
  {
    question: 'What does the process of working with Parvath Life and Legacy Advisors look like?',
    answer:
      'It follows four stages — understanding your goals, priorities, family and business context; developing a structured plan aligned with them; helping you implement the appropriate financial actions; and reviewing the plan regularly as your life and priorities evolve.',
  },
  {
    question: 'What kind of financial planning do you help with?',
    answer:
      'Eight core areas: wealth creation, retirement planning, life insurance, health insurance, bonds & deposits, legacy planning, employee benefit solutions and group gratuity schemes — covering both personal and business financial planning.',
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
  { label: 'Blogs', to: '/blogs' },
]

export const interestOptions = [
  'Wealth Creation',
  'Retirement Planning',
  'Life Insurance',
  'Health Insurance',
  'Bonds & Deposits',
  'Legacy Planning',
  'Employee Benefits',
  'Group Gratuity',
  'General Enquiry',
]

export const disclaimer =
  'Parvath Life and Legacy Advisors provides financial planning guidance. Investments in securities and market-linked products are subject to market risks; please read all scheme-related documents carefully before investing. Insurance is the subject matter of solicitation. Past performance is not indicative of future results. Nothing on this website constitutes an offer, a recommendation, or tax or legal advice.'

export const siteDescription =
  `${site.name} helps individuals, families and business owners plan, protect and grow their wealth through structured financial planning.`

/**
 * Organisation data for rich results.
 */
export const organisationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: site.name,
  url: site.url,
  telephone: '+919940050798',
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'No. 46, Drowpathy Amman Koil Street, Ullagaram',
    addressLocality: 'Chennai',
    postalCode: '600091',
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  description: siteDescription,
  founder: [
    { '@type': 'Person', name: 'K Sridhar' },
    { '@type': 'Person', name: 'Varalakshmi Sridhar' },
  ],
  areaServed: 'IN',
  knowsAbout: [
    'Wealth Creation',
    'Retirement Planning',
    'Life Insurance',
    'Health Insurance',
    'Bonds & Deposits',
    'Legacy Planning',
    'Employee Benefit Solutions',
    'Group Gratuity Schemes',
  ],
}
