import test from 'node:test'
import assert from 'node:assert/strict'
import { sendEnquiry } from '../api/enquiry.js'
import { enquiryEmail } from '../server/enquiryEmail.js'

const fixture = { source: 'contact', name: 'Mohan QA', phone: '9000000000', email: 'mohan.qa@example.com', interest: 'General Enquiry', message: 'Local automated fixture. Do not send.' }
async function request({ body = fixture, method = 'POST', headers = {}, env = { SMTP_USER: 'fixture@example.com', SMTP_PASSWORD: 'dummy' }, rejected = [] } = {}) {
  const mails = []
  const req = { method, body, headers: { 'content-type': 'application/json', host: 'localhost', ...headers } }
  const res = { setHeader() {}, end(value) { this.body = JSON.parse(value) } }
  await sendEnquiry(req, res, env, () => ({ async sendMail(mail) { mails.push(mail); return { accepted: mail.to, rejected } } }))
  return { status: res.statusCode, body: res.body, mails }
}
test('both enquiry types send to both recipients using a stub transport only', async () => {
  for (const body of [fixture, { ...fixture, source: 'callback', email: '', message: '' }]) {
    const result = await request({ body })
    assert.equal(result.status, 200)
    assert.equal(result.mails.length, 1)
    assert.deepEqual(result.mails[0].to, ['varalakshmi@parvathfinserv.com', 'contact@parvathfinserv.com'])
    assert.equal(result.mails[0].replyTo, body.email || undefined)
  }
})
test('method, content type and foreign origin rejected without SMTP', async () => {
  for (const [options, expected] of [[{ method: 'GET' }, 405], [{ headers: { 'content-type': 'text/plain' } }, 415], [{ headers: { origin: 'https://foreign.example' } }, 403]]) {
    const result = await request(options); assert.equal(result.status, expected); assert.equal(result.mails.length, 0)
  }
  assert.equal((await request({ headers: { origin: 'http://localhost' } })).status, 200)
})
test('malformed, oversized and invalid submissions never reach SMTP', async () => {
  for (const [body, expected] of [[null, 400], [[], 400], ['{', 400], [{ ...fixture, phone: '123' }, 400], [{ ...fixture, interest: 'Unknown' }, 400], [{ ...fixture, message: '' }, 400], [{ ...fixture, junk: 'x'.repeat(9000) }, 413]]) {
    const result = await request({ body }); assert.equal(result.status, expected); assert.equal(result.mails.length, 0)
  }
  assert.equal((await request({ body: JSON.stringify(fixture) })).status, 200)
})
test('honeypot submission returns quietly without sending', async () => {
  const result = await request({ body: { ...fixture, website: 'spam.example' } })
  assert.equal(result.status, 200); assert.equal(result.mails.length, 0)
})
test('missing SMTP configuration and partial recipient rejection fail visibly', async () => {
  assert.equal((await request({ env: {} })).status, 503)
  assert.equal((await request({ rejected: ['contact@parvathfinserv.com'] })).status, 502)
})
test('visitor text is escaped in HTML emails', () => {
  const result = enquiryEmail({ isContact: true, ...fixture, name: '<img src=x onerror=alert(1)>', message: '<script>bad</script>\nsecond line' })
  assert.ok(!result.html.includes('<script>'))
  assert.ok(!result.html.includes('<img src=x'))
  assert.ok(result.html.includes('&lt;script&gt;bad&lt;/script&gt;<br>second line'))
})
test('the Hostinger PHP endpoint keeps the same recipients and interest options', async () => {
  const { readFileSync } = await import('node:fs')
  const { interestOptions } = await import('../src/data/site.js')
  const php = readFileSync(new URL('../public/api/enquiry.php', import.meta.url), 'utf8')
  const list = (name) => [...php.match(new RegExp(`const ${name} = \\[(.*?)\\];`, 's'))[1].matchAll(/'([^']*)'/g)].map(m => m[1])
  assert.deepEqual(list('INTEREST_OPTIONS'), interestOptions)
  assert.deepEqual(list('ENQUIRY_RECIPIENTS'), ['varalakshmi@parvathfinserv.com', 'contact@parvathfinserv.com'])
})
