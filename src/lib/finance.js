/**
 * Pure financial-planning calculations. No side effects, no formatting —
 * every function takes numbers and returns numbers so it can be unit-tested
 * and reused across every calculator.
 *
 * Conventions:
 *   - Rates are annual percentages (e.g. 12 means 12%), converted internally.
 *   - SIP / annuity figures assume investment at the START of each period
 *     ("annuity due"), matching how Indian mutual-fund SIP calculators
 *     conventionally compute — a SIP instalment is debited on a fixed date
 *     each month, i.e. before that month's growth applies.
 *   - All money amounts are plain numbers (rupees); formatting is a
 *     presentation concern handled elsewhere (see lib/format.js).
 */

/** Future value of a monthly SIP. */
export function sipFutureValue(monthlyAmount, annualRatePct, years) {
  const i = annualRatePct / 100 / 12
  const n = Math.round(years * 12)
  if (n <= 0) return 0
  if (Math.abs(i) < 1e-9) return monthlyAmount * n
  return monthlyAmount * ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
}

/** Total principal paid into a monthly SIP over its term. */
export function sipTotalInvested(monthlyAmount, years) {
  return monthlyAmount * Math.round(years * 12)
}

/** Future value of a one-time lumpsum, compounded annually. */
export function lumpsumFutureValue(principal, annualRatePct, years) {
  return principal * Math.pow(1 + annualRatePct / 100, years)
}

/** Future value of a fixed annual investment (e.g. once a year on a birthday). */
export function annualInvestmentFutureValue(annualAmount, annualRatePct, years) {
  const r = annualRatePct / 100
  const n = Math.round(years)
  if (n <= 0) return 0
  if (Math.abs(r) < 1e-9) return annualAmount * n
  return annualAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
}

/** Monthly EMI for a reducing-balance loan. */
export function emiAmount(principal, annualRatePct, years) {
  const r = annualRatePct / 100 / 12
  const n = Math.round(years * 12)
  if (n <= 0) return 0
  if (Math.abs(r) < 1e-9) return principal / n
  const factor = Math.pow(1 + r, n)
  return (principal * r * factor) / (factor - 1)
}

/** Total of all EMI payments over the loan term. */
export function emiTotalPayment(principal, annualRatePct, years) {
  return emiAmount(principal, annualRatePct, years) * Math.round(years * 12)
}

/** Monthly SIP required to reach a target future value. */
export function requiredSipForTarget(targetFV, annualRatePct, years) {
  const i = annualRatePct / 100 / 12
  const n = Math.round(years * 12)
  if (n <= 0 || targetFV <= 0) return 0
  if (Math.abs(i) < 1e-9) return targetFV / n
  const factor = ((Math.pow(1 + i, n) - 1) / i) * (1 + i)
  return targetFV / factor
}

/** Lumpsum required today to reach a target future value. */
export function requiredLumpsumForTarget(targetFV, annualRatePct, years) {
  if (targetFV <= 0) return 0
  return targetFV / Math.pow(1 + annualRatePct / 100, years)
}

/**
 * Goal planning: inflate today's cost of a goal to the year it falls due,
 * net off what an existing investment will have grown to by then, and size
 * the SIP (or lumpsum) needed today to close the remaining gap. This is the
 * shared engine behind every "dream ___" calculator (education, wedding,
 * vehicle/property, vacation) — only the labels and defaults differ.
 */
export function goalPlan({
  currentCost,
  inflationPct,
  years,
  currentInvestment = 0,
  existingReturnPct = 0,
  newReturnPct,
}) {
  const futureCost = currentCost * Math.pow(1 + inflationPct / 100, years)
  const existingFutureValue = lumpsumFutureValue(currentInvestment, existingReturnPct, years)
  const gap = Math.max(0, futureCost - existingFutureValue)
  return {
    futureCost,
    existingFutureValue,
    gap,
    requiredMonthlySip: requiredSipForTarget(gap, newReturnPct, years),
    requiredLumpsumToday: requiredLumpsumForTarget(gap, newReturnPct, years),
  }
}

/**
 * Systematic Withdrawal Plan: simulate a corpus month by month as it grows at
 * the expected return and is drawn down by a fixed withdrawal, until either
 * the horizon ends or the corpus is exhausted. A direct simulation (rather
 * than a closed-form formula) keeps this easy to audit and correct.
 */
export function swpProjection({ corpus, monthlyWithdrawal, annualRatePct, years }) {
  const i = annualRatePct / 100 / 12
  const n = Math.round(years * 12)
  let balance = corpus
  let monthsLasted = 0
  let totalWithdrawn = 0
  for (let m = 0; m < n; m++) {
    balance = balance * (1 + i) - monthlyWithdrawal
    totalWithdrawn += monthlyWithdrawal
    monthsLasted = m + 1
    if (balance <= 0) {
      balance = 0
      break
    }
  }
  return {
    endingBalance: Math.max(0, balance),
    monthsLasted,
    depleted: balance <= 0 && monthsLasted < n,
    totalWithdrawn,
  }
}

/** Future value of a SIP whose instalment increases by a fixed % every year. */
export function stepUpSipFutureValue({ initialMonthly, stepUpPct, annualRatePct, years }) {
  const i = annualRatePct / 100 / 12
  let balance = 0
  let monthly = initialMonthly
  const n = Math.round(years)
  for (let year = 0; year < n; year++) {
    for (let m = 0; m < 12; m++) {
      balance = (balance + monthly) * (1 + i)
    }
    monthly *= 1 + stepUpPct / 100
  }
  return balance
}

/**
 * A SIP that only runs for part of the horizon, then sits untouched (no
 * further contributions, still invested) until the goal date.
 */
export function limitedPeriodSipFutureValue({ monthlyAmount, annualRatePct, investYears, totalYears }) {
  const corpusAtEndOfInvesting = sipFutureValue(monthlyAmount, annualRatePct, investYears)
  const remainingYears = Math.max(0, totalYears - investYears)
  return lumpsumFutureValue(corpusAtEndOfInvesting, annualRatePct, remainingYears)
}

/**
 * What waiting costs: the same SIP, same horizon end-date, but started
 * `delayYears` later — so it only runs for (years − delayYears).
 */
export function costOfDelay({ monthlyAmount, annualRatePct, years, delayYears }) {
  const fvStartingNow = sipFutureValue(monthlyAmount, annualRatePct, years)
  const remainingYears = Math.max(0, years - delayYears)
  const fvIfDelayed = sipFutureValue(monthlyAmount, annualRatePct, remainingYears)
  return { fvStartingNow, fvIfDelayed, shortfall: Math.max(0, fvStartingNow - fvIfDelayed) }
}

/**
 * Retirement corpus needed to sustain inflation-adjusted monthly expenses
 * through retirement. Values the withdrawal stream at the *real* rate of
 * return (nominal post-retirement return net of inflation) — the standard
 * way to price a payment stream that itself grows with inflation, so the
 * inflation adjustment is not double-counted.
 */
export function retirementCorpus({
  currentMonthlyExpense,
  currentAge,
  retirementAge,
  lifeExpectancy,
  inflationPct,
  preRetirementReturnPct,
  postRetirementReturnPct,
}) {
  const yearsToRetirement = Math.max(0, retirementAge - currentAge)
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge)
  const monthlyExpenseAtRetirement =
    currentMonthlyExpense * Math.pow(1 + inflationPct / 100, yearsToRetirement)

  // Fisher relation: real rate from nominal post-retirement return and inflation.
  const realReturnPct =
    ((1 + postRetirementReturnPct / 100) / (1 + inflationPct / 100) - 1) * 100
  const iReal = realReturnPct / 100 / 12
  const nMonths = Math.round(yearsInRetirement * 12)

  let corpusNeeded
  if (nMonths <= 0) {
    corpusNeeded = 0
  } else if (Math.abs(iReal) < 1e-9) {
    corpusNeeded = monthlyExpenseAtRetirement * nMonths
  } else {
    corpusNeeded =
      monthlyExpenseAtRetirement * ((1 - Math.pow(1 + iReal, -nMonths)) / iReal) * (1 + iReal)
  }

  return {
    yearsToRetirement,
    yearsInRetirement,
    monthlyExpenseAtRetirement,
    corpusNeeded,
    requiredMonthlySip: requiredSipForTarget(corpusNeeded, preRetirementReturnPct, yearsToRetirement),
  }
}

/**
 * Life cover need via an income-replacement + goals-and-liabilities approach:
 * enough to replace lost income for a chosen number of years, clear
 * outstanding debts, and fund future goals — net of cover and assets already
 * in place.
 */
export function lifeInsuranceNeed({
  annualIncome,
  yearsOfIncomeToReplace,
  outstandingLiabilities = 0,
  futureGoalsCost = 0,
  existingCoverAndAssets = 0,
}) {
  const incomeReplacementNeed = annualIncome * yearsOfIncomeToReplace
  const totalNeed = incomeReplacementNeed + outstandingLiabilities + futureGoalsCost
  return {
    incomeReplacementNeed,
    totalNeed,
    additionalCoverNeeded: Math.max(0, totalNeed - existingCoverAndAssets),
  }
}
