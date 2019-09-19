/* eslint-disable no-console */
import nodemailer from 'nodemailer'
import validator from 'validator'
import xssFilters from 'xss-filters'

const shouldSend = process.env.SEND_MAIL

const NODEMAILER_INFO = {
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 465,
    secure: process.env.SMTP_SECURE ? Boolean(process.env.SMTP_SECURE) : true
  },
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
}

const SMTP_DEFAULT_FIELDS = {
  from: 'Developmint <no-reply@developmint.de>'
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ 'error': 'Method not allowed' }) }
  }
  try {
    const params = JSON.parse(event.body)

    const attributes = ['name', 'email', 'msg']
    const sanitizedAttributes = attributes.map(n => validateAndSanitize(n, params[n]))
    const someInvalid = sanitizedAttributes.some(r => !r)

    if (someInvalid) {
      return { statusCode: 422, body: JSON.stringify({ 'error': 'Ugh.. That looks unprocessable!' }) }
    }
    const sendMailFunction = shouldSend ? sendMail : sendMailDev
    try {
      await sendMailFunction(...sanitizedAttributes)
      return { statusCode: 200, body: JSON.stringify({ 'message': 'OH YEAH' }) }
    } catch (e) {
      console.error(e)
      return { statusCode: 500, body: 'error' }
    }
  } catch (_) {
    return { statusCode: 422, body: JSON.stringify({ 'error': 'Ugh.. That looks unprocessable!' }) }
  }
}

const validateAndSanitize = (key, value) => {
  const rejectFunctions = {
    name: v => v.length < 4,
    email: v => !validator.isEmail(v),
    msg: v => v.length < 25
  }

  // If object has key and function returns false, return sanitized input. Else, return false
  return rejectFunctions.hasOwnProperty(key) && !rejectFunctions[key](value) && xssFilters.inHTMLData(value)
}

const sendMail = async (name, email, msg) => {
  const transporter = nodemailer.createTransport(
    {
      ...NODEMAILER_INFO,
      logger: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error
      },
      debug: shouldSend
    },
    SMTP_DEFAULT_FIELDS
  )

  // Message object
  const message = {
    replyTo: email,
    to: process.env.EMAIL_TO,
    subject: `New contact form message from ${email}`,
    text: msg
  }

  await transporter.sendMail(message)

  console.log('Message sent successfully!')
}

const sendMailDev = (...args) => {
  console.log(...args)
}
