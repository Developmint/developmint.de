const predefinedOptions = {
  self: `'self'`,
  unsafeInline: `'unsafe-inline'`,
  none: `'none'`
}

const otherOptions = {
  googleAnalytics: 'https://www.google-analytics.com',
  googleFontsCss: 'https://fonts.googleapis.com',
  googleFontsCdn: 'https://fonts.gstatic.com/',
  catApi: 'https://thecatapi.com/api/images/'
}

module.exports = {
  'default-src': [predefinedOptions.self],
  'script-src': [predefinedOptions.self, otherOptions.googleAnalytics],
  'style-src': [predefinedOptions.self, predefinedOptions.unsafeInline, otherOptions.googleFontsCss],
  'img-src': [predefinedOptions.self, otherOptions.googleAnalytics, otherOptions.catApi],
  'font-src': [otherOptions.googleFontsCdn]
}
