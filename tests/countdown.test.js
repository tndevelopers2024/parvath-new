import test from 'node:test'
import assert from 'node:assert/strict'
import { getTimeRemaining, padTwo } from '../src/lib/countdown.js'

test('getTimeRemaining splits days, hours, minutes, and seconds accurately', () => {
  const target = Date.parse('2026-11-25T12:00:00+05:30')
  const now = target - ((3 * 86400 + 4 * 3600 + 5 * 60 + 9) * 1000)

  const result = getTimeRemaining(target, now)
  assert.deepEqual(result, {
    totalMs: (3 * 86400 + 4 * 3600 + 5 * 60 + 9) * 1000,
    days: 3,
    hours: 4,
    minutes: 5,
    seconds: 9,
    isLaunched: false,
  })
})

test('getTimeRemaining clamps at zero and marks launched when target has passed', () => {
  const target = '2026-11-25T12:00:00+05:30'
  const after = Date.parse(target) + 5000

  assert.deepEqual(getTimeRemaining(target, after), {
    totalMs: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLaunched: true,
  })
})

test('padTwo pads single digits with leading zero', () => {
  assert.equal(padTwo(0), '00')
  assert.equal(padTwo(7), '07')
  assert.equal(padTwo(12), '12')
})
