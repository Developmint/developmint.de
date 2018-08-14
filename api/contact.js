import express from 'express'
import nodemailer from 'nodemailer'
import validator from 'validator'
import xssFilters from 'xss-filters'

const app = express()
let isDev = false

app.use(express.json())

app.get('/', (req, res) => {
  res.status(405).json({ error: 'sorry!' })
})

app.post('/', (req, res) => {
  const attributes = ['name', 'email', 'msg']
  const sanitizedAttributes = attributes.map(n => validateAndSanitize(n, req.body[n]))
  const someInvalid = sanitizedAttributes.some(r => !r)

  if (someInvalid) {
    return res.status(422).json({ 'error': 'Ugh.. That looks unprocessable!' })
  }

  const sendMailFunction = isDev ? sendMailDev : sendMail
  sendMailFunction(...sanitizedAttributes)
  res.status(200).json({ 'message': 'OH YEAH' })
})

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
    to: 'support@developmint.de',
    subject: 'New contact form message',
    text: msg
  })
}

const sendMailDev = (...args) => {
  console.log(...args)
}

export default (nuxtDev = false) => {
  isDev = nuxtDev
  return {
    'path': '/api/contact',
    handler: app
  }
}
