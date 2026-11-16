import test from 'node:test'
import assert from 'node:assert/strict'
import * as finance from '../src/lib/finance.js'
import { calculators, getCalculatorFields } from '../src/data/calculators.js'

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) <= Math.max(1e-6, Math.abs(expected) * 1e-9), `${actual} != ${expected}`)
test('all 15 calculators produce finite default and single-bound results', () => {
  assert.equal(calculators.length, 15)
  for (const calculator of calculators) {
    const defaults = Object.fromEntries(calculator.fields.map(f => [f.key, f.default]))
    for (const values of [defaults, ...calculator.fields.flatMap(f => ['min', 'max'].map(bound => ({ ...defaults, [f.key]: f[bound] })))]) {
      const results = calculator.compute(values)
      for (const [key, value] of Object.entries(results)) if (typeof value === 'number') assert.ok(Number.isFinite(value), `${calculator.slug}: ${key}`)
    }
  }
})
test('SIP closed form agrees with independent monthly cashflow simulation', () => {
  for (const rate of [0, 1, 12, 20]) {
    let balance = 0
    for (let month = 0; month < 120; month++) balance = (balance + 10000) * (1 + rate / 1200)
    close(finance.sipFutureValue(10000, rate, 10), balance)
    close(finance.requiredSipForTarget(balance, rate, 10), 10000)
  }
})
test('EMI pays the loan down to zero, including a zero-interest loan', () => {
  for (const rate of [0, 8.5, 18]) {
    const payment = finance.emiAmount(3000000, rate, 20)
    let balance = 3000000
    for (let month = 0; month < 240; month++) balance = balance * (1 + rate / 1200) - payment
    assert.ok(Math.abs(balance) < 0.001)
  }
})
test('SWP never withdraws money which is unavailable', () => {
  assert.deepEqual(finance.swpProjection({ corpus: 100, monthlyWithdrawal: 1000, annualRatePct: 0, years: 1 }), { endingBalance: 0, monthsLasted: 1, depleted: true, totalWithdrawn: 100 })
  assert.equal(finance.swpProjection({ corpus: 0, monthlyWithdrawal: 1000, annualRatePct: 8, years: 1 }).monthsLasted, 0)
  assert.equal(finance.swpProjection({ corpus: 1200, monthlyWithdrawal: 100, annualRatePct: 0, years: 1 }).depleted, true)
  assert.equal(finance.swpProjection({ corpus: 100, monthlyWithdrawal: 0, annualRatePct: 0, years: 1 }).endingBalance, 100)
})
test('limited SIP maintains monthly compounding after the final instalment', () => {
  let expected = 0
  for (let month = 0; month < 240; month++) expected = (expected + (month < 120 ? 10000 : 0)) * 1.01
  close(finance.limitedPeriodSipFutureValue({ monthlyAmount: 10000, annualRatePct: 12, investYears: 10, totalYears: 20 }), expected)
})
test('retirement corpus equals the present value of the monthly real withdrawal stream', () => {
  const input = { currentMonthlyExpense: 60000, currentAge: 32, retirementAge: 60, lifeExpectancy: 85, inflationPct: 6, preRetirementReturnPct: 12, postRetirementReturnPct: 7 }
  const result = finance.retirementCorpus(input)
  const monthlyReal = Math.pow(1.07 / 1.06, 1 / 12) - 1
  let expected = 0
  for (let month = 0; month < 300; month++) expected += result.monthlyExpenseAtRetirement / Math.pow(1 + monthlyReal, month)
  close(result.corpusNeeded, expected)
})
test('dependent slider ranges prohibit impossible ages and timelines', () => {
  const lookup = (slug, values, key) => getCalculatorFields(calculators.find(c => c.slug === slug), values).find(f => f.key === key)
  assert.equal(lookup('child-education', { childAge: 17, educationAge: 18 }, 'educationAge').min, 18)
  assert.equal(lookup('dream-retirement', { currentAge: 58, retirementAge: 60 }, 'retirementAge').min, 59)
  assert.equal(lookup('limited-period-sip', { investYears: 10, totalYears: 10 }, 'totalYears').min, 10)
  assert.equal(lookup('cost-of-delay', { years: 5, delayYears: 3 }, 'delayYears').max, 4)
})
