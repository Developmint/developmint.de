/* eslint-disable no-console */
import { promisify } from 'util'
import sendmail from 'sendmail'
import validator from 'validator'
import xssFilters from 'xss-filters'

const shouldSend = process.env.SEND_MAIL

const noop = () => {}
const sendmailOptions = {
  logger: {
    debug: noop,
    info: noop,
    warn: console.warn,
    error: console.error
  }
}
const pSendMail = promisify(sendmail(sendmailOptions))

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

const sendMail = (name, email, msg) => pSendMail({
  from: email,
  to: process.env.MAIL_TO,
  subject: 'New contact form message',
  text: msg
})

const sendMailDev = (...args) => {
  console.log(...args)
}
