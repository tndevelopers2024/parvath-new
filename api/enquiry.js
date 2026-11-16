import nodemailer from 'nodemailer'
import { interestOptions } from '../src/data/site.js'
import { enquiryEmail } from '../server/enquiryEmail.js'

const EMAIL = /^[^\s@,<>"]+@[^\s@,<>"]+\.[a-z]{2,}$/i
const PHONE = /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/
const MAX_BODY_BYTES = 8192
const ENQUIRY_RECIPIENTS = [
  'varalakshmi@parvathfinserv.com',
  'contact@parvathfinserv.com',
]

async function readBody(req) {
  if (req.body !== undefined) {
    const raw = typeof req.body === 'string' || Buffer.isBuffer(req.body)
      ? req.body.toString()
      : JSON.stringify(req.body)
    if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
      throw Object.assign(new Error('Request body too large'), { status: 413 })
    }
    return JSON.parse(raw)
  }

  const chunks = []
  let bytes = 0
  for await (const chunk of req.iterator({ destroyOnReturn: false })) {
    bytes += chunk.length
    if (bytes > MAX_BODY_BYTES) throw Object.assign(new Error('Request body too large'), { status: 413 })
    chunks.push(chunk)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

export async function sendEnquiry(req, res, env, createTransport = nodemailer.createTransport) {
  const reply = (status, body) => {
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.setHeader('Cache-Control', 'no-store')
    res.end(JSON.stringify(body))
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return reply(405, { ok: false })
  }
  if (req.headers['content-type']?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return reply(415, { ok: false })
  }
  if (Number(req.headers['content-length']) > MAX_BODY_BYTES) {
    return reply(413, { ok: false })
  }
  // Block browser submissions initiated from another site. This supplements,
  // but does not replace, host-level rate limiting for non-browser clients.
  const origin = req.headers.origin
  if (origin) {
    try {
      const host = req.headers['x-forwarded-host'] || req.headers.host
      if (new URL(origin).host !== host) return reply(403, { ok: false })
    } catch {
      return reply(403, { ok: false })
    }
  }

  let body
  try {
    body = await readBody(req)
  } catch (error) {
    return reply(error.status === 413 ? 413 : 400, { ok: false })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400, { ok: false })
  // A field hidden from visitors catches simple form-filling bots quietly.
  if (typeof body.website === 'string' && body.website.trim()) return reply(200, { ok: true })

  const field = (key) => typeof body?.[key] === 'string' ? body[key].trim() : ''
  const source = field('source')
  const name = field('name')
  const phone = field('phone')
  const email = field('email')
  const interest = field('interest')
  const message = field('message')
  const isContact = source === 'contact'

  if (
    (!isContact && source !== 'callback') ||
    name.length < (isContact ? 2 : 1) || name.length > 120 ||
    !PHONE.test(phone) ||
    ((isContact || email) && (!EMAIL.test(email) || email.length > 254)) ||
    !interestOptions.includes(interest) ||
    (isContact && (message.length < 10 || message.length > 2000))
  ) {
    return reply(400, { ok: false })
  }

  const { SMTP_USER, SMTP_PASSWORD } = env
  if (!SMTP_USER || !SMTP_PASSWORD) {
    return reply(503, { ok: false })
  }

  const transport = createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  })

  try {
    const result = await transport.sendMail({
      from: SMTP_USER,
      to: ENQUIRY_RECIPIENTS,
      replyTo: email || undefined,
      ...enquiryEmail({ isContact, name, phone, email, interest, message }),
    })
    // SMTP can accept one recipient and reject the other without throwing.
    if (result.rejected?.length) {
      console.error('Enquiry SMTP rejected recipient count', result.rejected.length)
      return reply(502, { ok: false })
    }
    return reply(200, { ok: true })
  } catch (error) {
    console.error('Enquiry SMTP failed', error.code)
    return reply(502, { ok: false })
  }
}

export default function handler(req, res) {
  return sendEnquiry(req, res, process.env)
}
