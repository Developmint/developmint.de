import nodemailer from 'nodemailer'
import validator from 'validator'
import xssFilters from 'xss-filters'

const shouldSend = process.env.SEND_MAIL

// eslint-disable-next-line require-await
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
    sendMailFunction(...sanitizedAttributes)
    return { statusCode: 200, body: JSON.stringify({ 'message': 'OH YEAH' }) }
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

const sendMail = (name, email, msg) => {
  const transporter = nodemailer.createTransport({
    sendmail: true,
    newline: 'unix',
    path: '/usr/sbin/sendmail'
  })
  transporter.sendMail({
    from: email,
    to: process.env.MAIL_TO,
    subject: 'New contact form message',
    text: msg
  })
}

const sendMailDev = (...args) => {
  // eslint-disable-next-line no-console
  console.log(...args)
}
