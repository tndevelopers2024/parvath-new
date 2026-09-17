import {
  goalPlan,
  sipFutureValue,
  sipTotalInvested,
  lumpsumFutureValue,
  annualInvestmentFutureValue,
  emiAmount,
  emiTotalPayment,
  swpProjection,
  stepUpSipFutureValue,
  limitedPeriodSipFutureValue,
  costOfDelay,
  retirementCorpus,
  lifeInsuranceNeed,
} from '../lib/finance'

/**
 * Every calculator on the site is described here as data — one shared page
 * template (`components/calculators/CalculatorPage.jsx`) reads a config by
 * slug and renders its fields, live results and disclaimer. Adding a
 * calculator means adding an entry here, not a new page component.
 *
 * Field types:
 *   'slider' — bounded numeric range (ages, years, rates).
 *   'number' — open-ended currency amount, typed directly.
 *
 * Result formats: 'currency' | 'currencyCompact' | 'years' | 'months' | 'percent'.
 * `emphasis: true` renders as the large headline figure; others are
 * supporting breakdown lines.
 *
 * Optional `breakdown(results)` returns two parts that sum to a whole (e.g.
 * invested vs growth); the page draws them as a stacked bar under
 * `breakdownTitle`. Every part is derived from the calculator's own results.
 *
 * These are illustrative, assumption-driven estimates, not guarantees — see
 * `calculatorDisclaimer` below, shown on every calculator page.
 */

const currency = (key, label, { min = 0, max = 10000000, step = 1000, defaultValue } = {}) => ({
  key,
  label,
  type: 'number',
  min,
  max,
  step,
  default: defaultValue,
  prefix: '₹',
})

const slider = (key, label, { min, max, step = 1, defaultValue, suffix = '' } = {}) => ({
  key,
  label,
  type: 'slider',
  min,
  max,
  step,
  default: defaultValue,
  suffix,
})

export const calculatorCategories = [
  { key: 'goals', label: 'Life Goals' },
  { key: 'investing', label: 'Investing' },
  { key: 'loans', label: 'Loans' },
  { key: 'planning', label: 'Planning' },
]

export const calculators = [
  // ---------------------------------------------------------------- Goals
  {
    slug: 'child-education',
    path: '/calculators/child-education',
    category: 'goals',
    icon: 'GraduationCap',
    title: 'Child Education Calculator',
    summary: 'Estimate the corpus a child’s higher education is likely to need, and what to invest today to reach it.',
    intro:
      'Education costs tend to outpace general inflation. This estimates the future cost of your child’s higher education and the SIP or lumpsum needed today to meet it.',
    fields: [
      slider('childAge', 'Child’s current age', { min: 0, max: 17, defaultValue: 5, suffix: ' yrs' }),
      slider('educationAge', 'Age at higher education', { min: 16, max: 25, defaultValue: 18, suffix: ' yrs' }),
      currency('currentCost', 'Current cost of higher education', { defaultValue: 2000000, step: 50000 }),
      slider('inflation', 'Education inflation', { min: 4, max: 14, step: 0.5, defaultValue: 8, suffix: '%' }),
      currency('currentInvestment', 'Already invested for this goal', { defaultValue: 0, step: 25000 }),
      slider('existingReturn', 'Expected return on that investment', { min: 4, max: 16, step: 0.5, defaultValue: 8, suffix: '%' }),
      slider('newReturn', 'Expected return on new investment', { min: 4, max: 16, step: 0.5, defaultValue: 12, suffix: '%' }),
    ],
    compute: (v) => {
      const years = Math.max(1, v.educationAge - v.childAge)
      const plan = goalPlan({
        currentCost: v.currentCost,
        inflationPct: v.inflation,
        years,
        currentInvestment: v.currentInvestment,
        existingReturnPct: v.existingReturn,
        newReturnPct: v.newReturn,
      })
      return { years, ...plan }
    },
    results: [
      { key: 'futureCost', label: 'Estimated cost at that time', format: 'currency' },
      { key: 'requiredMonthlySip', label: 'Monthly SIP needed today', format: 'currency', emphasis: true },
      { key: 'requiredLumpsumToday', label: 'Or a lumpsum today of', format: 'currency' },
      { key: 'years', label: 'Years to goal', format: 'years' },
    ],
  },
  {
    slug: 'grand-wedding',
    path: '/calculators/grand-wedding',
    category: 'goals',
    icon: 'Gem',
    title: 'Wedding Planning Calculator',
    summary: 'Plan ahead for a wedding’s cost, adjusted for inflation, with a clear monthly or lumpsum target.',
    intro:
      'Wedding costs are rarely planned for years in advance, which is exactly why they catch families off guard. This projects today’s cost forward and sizes what to invest now.',
    fields: [
      slider('years', 'Years until the wedding', { min: 1, max: 25, defaultValue: 15, suffix: ' yrs' }),
      currency('currentCost', 'Current estimated cost', { defaultValue: 1500000, step: 50000 }),
      slider('inflation', 'Expected cost inflation', { min: 4, max: 14, step: 0.5, defaultValue: 8, suffix: '%' }),
      currency('currentInvestment', 'Already invested for this goal', { defaultValue: 0, step: 25000 }),
      slider('existingReturn', 'Expected return on that investment', { min: 4, max: 16, step: 0.5, defaultValue: 8, suffix: '%' }),
      slider('newReturn', 'Expected return on new investment', { min: 4, max: 16, step: 0.5, defaultValue: 12, suffix: '%' }),
    ],
    compute: (v) =>
      goalPlan({
        currentCost: v.currentCost,
        inflationPct: v.inflation,
        years: v.years,
        currentInvestment: v.currentInvestment,
        existingReturnPct: v.existingReturn,
        newReturnPct: v.newReturn,
      }),
    results: [
      { key: 'futureCost', label: 'Estimated cost at that time', format: 'currency' },
      { key: 'requiredMonthlySip', label: 'Monthly SIP needed today', format: 'currency', emphasis: true },
      { key: 'requiredLumpsumToday', label: 'Or a lumpsum today of', format: 'currency' },
    ],
  },
  {
    slug: 'dream-purchase',
    path: '/calculators/dream-purchase',
    category: 'goals',
    icon: 'Car',
    title: 'Car, Bike & Property Calculator',
    summary: 'Work out what a future car, bike or property purchase will really cost, and what to set aside now.',
    intro:
      'A price tag today is rarely the price tag on the day you buy. This adjusts a purchase goal for inflation and sizes the investment needed to fund it without a loan, or to reduce how much you’d need to borrow.',
    fields: [
      slider('years', 'Years until the purchase', { min: 1, max: 20, defaultValue: 5, suffix: ' yrs' }),
      currency('currentCost', 'Current price', { defaultValue: 1000000, step: 25000 }),
      slider('inflation', 'Expected price inflation', { min: 2, max: 12, step: 0.5, defaultValue: 6, suffix: '%' }),
      currency('currentInvestment', 'Already invested for this goal', { defaultValue: 0, step: 25000 }),
      slider('existingReturn', 'Expected return on that investment', { min: 4, max: 16, step: 0.5, defaultValue: 8, suffix: '%' }),
      slider('newReturn', 'Expected return on new investment', { min: 4, max: 16, step: 0.5, defaultValue: 12, suffix: '%' }),
    ],
    compute: (v) =>
      goalPlan({
        currentCost: v.currentCost,
        inflationPct: v.inflation,
        years: v.years,
        currentInvestment: v.currentInvestment,
        existingReturnPct: v.existingReturn,
        newReturnPct: v.newReturn,
      }),
    results: [
      { key: 'futureCost', label: 'Estimated price at that time', format: 'currency' },
      { key: 'requiredMonthlySip', label: 'Monthly SIP needed today', format: 'currency', emphasis: true },
      { key: 'requiredLumpsumToday', label: 'Or a lumpsum today of', format: 'currency' },
    ],
  },
  {
    slug: 'dream-vacation',
    path: '/calculators/dream-vacation',
    category: 'goals',
    icon: 'Plane',
    title: 'Vacation Calculator',
    summary: 'Fund a future trip without dipping into savings meant for something else.',
    intro:
      'Short-horizon goals still deserve a plan of their own, rather than coming out of whatever is left over closer to the date.',
    fields: [
      slider('years', 'Years until the trip', { min: 1, max: 10, defaultValue: 2, suffix: ' yrs' }),
      currency('currentCost', 'Current estimated cost', { defaultValue: 300000, step: 10000 }),
      slider('inflation', 'Expected cost inflation', { min: 2, max: 12, step: 0.5, defaultValue: 6, suffix: '%' }),
      currency('currentInvestment', 'Already set aside for this', { defaultValue: 0, step: 10000 }),
      slider('existingReturn', 'Expected return on that amount', { min: 2, max: 14, step: 0.5, defaultValue: 6, suffix: '%' }),
      slider('newReturn', 'Expected return on new investment', { min: 2, max: 14, step: 0.5, defaultValue: 8, suffix: '%' }),
    ],
    compute: (v) =>
      goalPlan({
        currentCost: v.currentCost,
        inflationPct: v.inflation,
        years: v.years,
        currentInvestment: v.currentInvestment,
        existingReturnPct: v.existingReturn,
        newReturnPct: v.newReturn,
      }),
    results: [
      { key: 'futureCost', label: 'Estimated cost at that time', format: 'currency' },
      { key: 'requiredMonthlySip', label: 'Monthly SIP needed today', format: 'currency', emphasis: true },
      { key: 'requiredLumpsumToday', label: 'Or a lumpsum today of', format: 'currency' },
    ],
  },

  // ------------------------------------------------------------ Investing
  {
    slug: 'sip',
    path: '/calculators/sip',
    category: 'investing',
    icon: 'LineChart',
    title: 'SIP Calculator',
    summary: 'See what a monthly SIP could grow into over time.',
    intro: 'A simple projection of what a fixed monthly investment could become, at a steady assumed rate of return.',
    fields: [
      currency('monthly', 'Monthly investment', { defaultValue: 10000, step: 500, max: 500000 }),
      slider('returnRate', 'Expected annual return', { min: 1, max: 20, step: 0.5, defaultValue: 12, suffix: '%' }),
      slider('years', 'Investment period', { min: 1, max: 30, defaultValue: 10, suffix: ' yrs' }),
    ],
    compute: (v) => {
      const futureValue = sipFutureValue(v.monthly, v.returnRate, v.years)
      const invested = sipTotalInvested(v.monthly, v.years)
      return { futureValue, invested, gain: futureValue - invested }
    },
    results: [
      { key: 'futureValue', label: 'Projected value', format: 'currency', emphasis: true },
      { key: 'invested', label: 'Total invested', format: 'currency' },
      { key: 'gain', label: 'Estimated growth', format: 'currency' },
    ],
    breakdownTitle: 'What the projected value is made of',
    breakdown: (r) => [
      { label: 'Invested', value: r.invested },
      { label: 'Growth', value: r.gain },
    ],
  },
  {
    slug: 'lumpsum',
    path: '/calculators/lumpsum',
    category: 'investing',
    icon: 'Landmark',
    title: 'Lumpsum Calculator',
    summary: 'Project the future value of a one-time investment.',
    intro: 'What a single investment made today could grow into, compounded annually at an assumed rate of return.',
    fields: [
      currency('principal', 'Investment amount', { defaultValue: 100000, step: 5000, max: 10000000 }),
      slider('returnRate', 'Expected annual return', { min: 1, max: 20, step: 0.5, defaultValue: 10, suffix: '%' }),
      slider('years', 'Investment period', { min: 1, max: 30, defaultValue: 10, suffix: ' yrs' }),
    ],
    compute: (v) => {
      const futureValue = lumpsumFutureValue(v.principal, v.returnRate, v.years)
      return { futureValue, gain: futureValue - v.principal }
    },
    results: [
      { key: 'futureValue', label: 'Projected value', format: 'currency', emphasis: true },
      { key: 'gain', label: 'Estimated growth', format: 'currency' },
    ],
    breakdownTitle: 'What the projected value is made of',
    breakdown: (r) => [
      { label: 'Invested', value: r.futureValue - r.gain },
      { label: 'Growth', value: r.gain },
    ],
  },
  {
    slug: 'cost-of-delay',
    path: '/calculators/cost-of-delay',
    category: 'investing',
    icon: 'Hourglass',
    title: 'Cost of Delay Calculator',
    summary: 'See, in real numbers, what postponing a SIP actually costs.',
    intro:
      'The same monthly amount, invested for a shorter period because it started later, arrives at a noticeably smaller number — this makes that gap concrete.',
    fields: [
      currency('monthly', 'Monthly investment', { defaultValue: 10000, step: 500, max: 500000 }),
      slider('returnRate', 'Expected annual return', { min: 1, max: 20, step: 0.5, defaultValue: 12, suffix: '%' }),
      slider('years', 'Total horizon', { min: 5, max: 35, defaultValue: 20, suffix: ' yrs' }),
      slider('delayYears', 'Years delayed before starting', { min: 1, max: 15, defaultValue: 3, suffix: ' yrs' }),
    ],
    compute: (v) =>
      costOfDelay({ monthlyAmount: v.monthly, annualRatePct: v.returnRate, years: v.years, delayYears: v.delayYears }),
    results: [
      { key: 'shortfall', label: 'What the delay costs you', format: 'currency', emphasis: true },
      { key: 'fvStartingNow', label: 'Value if started now', format: 'currency' },
      { key: 'fvIfDelayed', label: 'Value if delayed', format: 'currency' },
    ],
    breakdownTitle: 'Starting now, split by the delay',
    breakdown: (r) => [
      { label: 'Value if delayed', value: r.fvIfDelayed },
      { label: 'Lost to delay', value: r.shortfall },
    ],
  },
  {
    slug: 'limited-period-sip',
    path: '/calculators/limited-period-sip',
    category: 'investing',
    icon: 'CalendarClock',
    title: 'Limited Period SIP Calculator',
    summary: 'Invest via SIP for a fixed number of years, then let it grow untouched until your goal date.',
    intro:
      'Useful when contributions can only run for a limited window — say, through a child’s early working years — but the goal itself sits further out.',
    fields: [
      currency('monthly', 'Monthly investment', { defaultValue: 10000, step: 500, max: 500000 }),
      slider('returnRate', 'Expected annual return', { min: 1, max: 20, step: 0.5, defaultValue: 12, suffix: '%' }),
      slider('investYears', 'Years you will contribute', { min: 1, max: 25, defaultValue: 10, suffix: ' yrs' }),
      slider('totalYears', 'Years until the goal', { min: 1, max: 35, defaultValue: 20, suffix: ' yrs' }),
    ],
    compute: (v) => {
      const investYears = Math.min(v.investYears, v.totalYears)
      const futureValue = limitedPeriodSipFutureValue({
        monthlyAmount: v.monthly,
        annualRatePct: v.returnRate,
        investYears,
        totalYears: v.totalYears,
      })
      return { futureValue, invested: sipTotalInvested(v.monthly, investYears) }
    },
    results: [
      { key: 'futureValue', label: 'Projected value at goal date', format: 'currency', emphasis: true },
      { key: 'invested', label: 'Total invested', format: 'currency' },
    ],
    breakdownTitle: 'What the projected value is made of',
    breakdown: (r) => [
      { label: 'Invested', value: r.invested },
      { label: 'Growth', value: r.futureValue - r.invested },
    ],
  },
  {
    slug: 'sip-top-up',
    path: '/calculators/sip-top-up',
    category: 'investing',
    icon: 'TrendingUp',
    title: 'SIP Top-Up Calculator',
    summary: 'Model a SIP that increases every year, in step with a growing income.',
    intro:
      'Increasing a SIP each year — even by a modest percentage — tends to close goal gaps faster than raising the starting amount alone.',
    fields: [
      currency('initialMonthly', 'Starting monthly investment', { defaultValue: 10000, step: 500, max: 500000 }),
      slider('stepUp', 'Annual step-up', { min: 2, max: 25, defaultValue: 10, suffix: '%' }),
      slider('returnRate', 'Expected annual return', { min: 1, max: 20, step: 0.5, defaultValue: 12, suffix: '%' }),
      slider('years', 'Investment period', { min: 1, max: 30, defaultValue: 15, suffix: ' yrs' }),
    ],
    compute: (v) => {
      const futureValue = stepUpSipFutureValue({
        initialMonthly: v.initialMonthly,
        stepUpPct: v.stepUp,
        annualRatePct: v.returnRate,
        years: v.years,
      })
      const withoutStepUp = sipFutureValue(v.initialMonthly, v.returnRate, v.years)
      return { futureValue, withoutStepUp, extraFromStepUp: futureValue - withoutStepUp }
    },
    results: [
      { key: 'futureValue', label: 'Projected value with step-up', format: 'currency', emphasis: true },
      { key: 'withoutStepUp', label: 'Without step-up, for comparison', format: 'currency' },
      { key: 'extraFromStepUp', label: 'Extra from stepping up', format: 'currency' },
    ],
    breakdownTitle: 'How the step-up adds up',
    breakdown: (r) => [
      { label: 'Without step-up', value: r.withoutStepUp },
      { label: 'Extra from step-up', value: r.extraFromStepUp },
    ],
  },
  {
    slug: 'birthday-sip',
    path: '/calculators/birthday-sip',
    category: 'investing',
    icon: 'Cake',
    title: 'Birthday SIP Calculator',
    summary: 'A once-a-year investment — made, say, on a birthday — projected forward.',
    intro:
      'Some families prefer marking a milestone each year with a single investment rather than a monthly debit. This projects what that annual habit could become.',
    fields: [
      currency('annual', 'Amount invested each year', { defaultValue: 50000, step: 5000, max: 2000000 }),
      slider('returnRate', 'Expected annual return', { min: 1, max: 20, step: 0.5, defaultValue: 12, suffix: '%' }),
      slider('years', 'Number of years', { min: 1, max: 25, defaultValue: 15, suffix: ' yrs' }),
    ],
    compute: (v) => {
      const futureValue = annualInvestmentFutureValue(v.annual, v.returnRate, v.years)
      const invested = v.annual * v.years
      return { futureValue, invested, gain: futureValue - invested }
    },
    results: [
      { key: 'futureValue', label: 'Projected value', format: 'currency', emphasis: true },
      { key: 'invested', label: 'Total invested', format: 'currency' },
      { key: 'gain', label: 'Estimated growth', format: 'currency' },
    ],
    breakdownTitle: 'What the projected value is made of',
    breakdown: (r) => [
      { label: 'Invested', value: r.invested },
      { label: 'Growth', value: r.gain },
    ],
  },

  // ---------------------------------------------------------------- Loans
  {
    slug: 'emi',
    path: '/calculators/emi',
    category: 'loans',
    icon: 'Wallet',
    title: 'EMI Calculator',
    summary: 'Work out the monthly instalment on a loan, and what it costs in total.',
    intro: 'A standard reducing-balance EMI calculation for a home, vehicle or personal loan.',
    fields: [
      currency('principal', 'Loan amount', { defaultValue: 3000000, step: 50000, max: 20000000 }),
      slider('rate', 'Interest rate', { min: 4, max: 18, step: 0.05, defaultValue: 8.5, suffix: '%' }),
      slider('years', 'Loan tenure', { min: 1, max: 30, defaultValue: 20, suffix: ' yrs' }),
    ],
    compute: (v) => {
      const emi = emiAmount(v.principal, v.rate, v.years)
      const totalPayment = emiTotalPayment(v.principal, v.rate, v.years)
      return { emi, totalPayment, totalInterest: totalPayment - v.principal }
    },
    results: [
      { key: 'emi', label: 'Monthly EMI', format: 'currency', emphasis: true },
      { key: 'totalInterest', label: 'Total interest payable', format: 'currency' },
      { key: 'totalPayment', label: 'Total of all payments', format: 'currency' },
    ],
    breakdownTitle: 'What you repay over the loan',
    breakdown: (r) => [
      { label: 'Principal', value: r.totalPayment - r.totalInterest },
      { label: 'Interest', value: r.totalInterest },
    ],
  },
  {
    slug: 'home-loan-sip',
    path: '/calculators/home-loan-sip',
    category: 'loans',
    icon: 'Home',
    title: 'Home Loan + SIP Calculator',
    summary: 'See your home loan EMI alongside what a parallel SIP could build by the time the loan matures.',
    intro:
      'This does not model prepayment — it shows two numbers side by side: your EMI, and what a disciplined parallel investment over the same tenure could be worth.',
    fields: [
      currency('principal', 'Loan amount', { defaultValue: 3000000, step: 50000, max: 20000000 }),
      slider('rate', 'Loan interest rate', { min: 4, max: 18, step: 0.05, defaultValue: 8.5, suffix: '%' }),
      slider('years', 'Loan tenure', { min: 1, max: 30, defaultValue: 20, suffix: ' yrs' }),
      currency('sipAmount', 'Parallel monthly SIP', { defaultValue: 5000, step: 500, max: 200000 }),
      slider('sipReturn', 'Expected SIP return', { min: 1, max: 20, step: 0.5, defaultValue: 12, suffix: '%' }),
    ],
    compute: (v) => {
      const emi = emiAmount(v.principal, v.rate, v.years)
      const sipValue = sipFutureValue(v.sipAmount, v.sipReturn, v.years)
      const sipInvested = sipTotalInvested(v.sipAmount, v.years)
      return { emi, sipValue, sipInvested }
    },
    results: [
      { key: 'emi', label: 'Monthly home loan EMI', format: 'currency', emphasis: true },
      { key: 'sipValue', label: 'Parallel SIP, projected value', format: 'currency' },
      { key: 'sipInvested', label: 'Parallel SIP, total invested', format: 'currency' },
    ],
    breakdownTitle: 'What the matching SIP becomes',
    breakdown: (r) => [
      { label: 'SIP invested', value: r.sipInvested },
      { label: 'SIP growth', value: r.sipValue - r.sipInvested },
    ],
  },

  // ------------------------------------------------------------ Planning
  {
    slug: 'swp',
    path: '/calculators/swp',
    category: 'planning',
    icon: 'ArrowDownToLine',
    title: 'SWP Calculator',
    summary: 'See how long a corpus lasts under a fixed monthly withdrawal.',
    intro:
      'A Systematic Withdrawal Plan draws a fixed amount from a corpus at regular intervals. This simulates the balance month by month to show how long it holds up.',
    fields: [
      currency('corpus', 'Starting corpus', { defaultValue: 5000000, step: 100000, max: 50000000 }),
      currency('withdrawal', 'Monthly withdrawal', { defaultValue: 30000, step: 1000, max: 500000 }),
      slider('returnRate', 'Expected annual return', { min: 1, max: 16, step: 0.5, defaultValue: 8, suffix: '%' }),
      slider('years', 'Horizon to check', { min: 1, max: 40, defaultValue: 20, suffix: ' yrs' }),
    ],
    compute: (v) =>
      swpProjection({
        corpus: v.corpus,
        monthlyWithdrawal: v.withdrawal,
        annualRatePct: v.returnRate,
        years: v.years,
      }),
    results: [
      { key: 'monthsLasted', label: 'How long it lasts', format: 'months', emphasis: true },
      { key: 'endingBalance', label: 'Balance at end of horizon', format: 'currency' },
      { key: 'totalWithdrawn', label: 'Total withdrawn', format: 'currency' },
    ],
  },
  {
    slug: 'dream-retirement',
    path: '/calculators/dream-retirement',
    category: 'planning',
    icon: 'Sunrise',
    title: 'Retirement Calculator',
    summary: 'Estimate the corpus needed to sustain your lifestyle through retirement.',
    intro:
      'This inflates today’s monthly expenses to your retirement date, then sizes the corpus needed to fund an inflation-adjusted income through retirement.',
    fields: [
      slider('currentAge', 'Current age', { min: 20, max: 58, defaultValue: 32, suffix: ' yrs' }),
      slider('retirementAge', 'Retirement age', { min: 45, max: 65, defaultValue: 60, suffix: ' yrs' }),
      slider('lifeExpectancy', 'Plan until age', { min: 70, max: 95, defaultValue: 85, suffix: ' yrs' }),
      currency('monthlyExpense', 'Current monthly expenses', { defaultValue: 60000, step: 5000, max: 1000000 }),
      slider('inflation', 'Expected inflation', { min: 3, max: 10, step: 0.5, defaultValue: 6, suffix: '%' }),
      slider('preReturn', 'Return before retirement', { min: 4, max: 16, step: 0.5, defaultValue: 12, suffix: '%' }),
      slider('postReturn', 'Return during retirement', { min: 2, max: 12, step: 0.5, defaultValue: 7, suffix: '%' }),
    ],
    compute: (v) =>
      retirementCorpus({
        currentMonthlyExpense: v.monthlyExpense,
        currentAge: v.currentAge,
        retirementAge: v.retirementAge,
        lifeExpectancy: v.lifeExpectancy,
        inflationPct: v.inflation,
        preRetirementReturnPct: v.preReturn,
        postRetirementReturnPct: v.postReturn,
      }),
    results: [
      { key: 'corpusNeeded', label: 'Corpus needed at retirement', format: 'currency', emphasis: true },
      { key: 'requiredMonthlySip', label: 'Monthly SIP to get there', format: 'currency' },
      { key: 'monthlyExpenseAtRetirement', label: 'Monthly expense at retirement', format: 'currency' },
      { key: 'yearsToRetirement', label: 'Years to retirement', format: 'years' },
    ],
  },
  {
    slug: 'life-insurance-need',
    path: '/calculators/life-insurance-need',
    category: 'planning',
    icon: 'ShieldCheck',
    title: 'Life Insurance Need Calculator',
    summary: 'A needs-based estimate of how much life cover your family would require.',
    intro:
      'Rather than a rule of thumb, this adds up what your income supports, what is owed, and what is still being saved for — then nets off what is already in place.',
    fields: [
      currency('annualIncome', 'Annual income', { defaultValue: 1200000, step: 50000, max: 20000000 }),
      slider('yearsToReplace', 'Years of income to replace', { min: 5, max: 30, defaultValue: 15, suffix: ' yrs' }),
      currency('liabilities', 'Outstanding loans', { defaultValue: 2000000, step: 100000, max: 20000000 }),
      currency('futureGoals', 'Future goals still unfunded', { defaultValue: 3000000, step: 100000, max: 20000000 }),
      currency('existingCover', 'Existing cover and assets', { defaultValue: 1000000, step: 100000, max: 20000000 }),
    ],
    compute: (v) =>
      lifeInsuranceNeed({
        annualIncome: v.annualIncome,
        yearsOfIncomeToReplace: v.yearsToReplace,
        outstandingLiabilities: v.liabilities,
        futureGoalsCost: v.futureGoals,
        existingCoverAndAssets: v.existingCover,
      }),
    results: [
      { key: 'additionalCoverNeeded', label: 'Additional cover needed', format: 'currency', emphasis: true },
      { key: 'totalNeed', label: 'Total need', format: 'currency' },
      { key: 'incomeReplacementNeed', label: 'Income-replacement portion', format: 'currency' },
    ],
  },
]

export function getCalculator(slug) {
  return calculators.find((c) => c.slug === slug)
}

export const calculatorDisclaimer =
  'This calculator produces an illustrative estimate to support a planning conversation — it is not a quote, a projection of guaranteed returns, or financial advice. Actual outcomes depend on markets, rates and your specific circumstances, and will differ from this estimate. Please speak with us before acting on it.'
