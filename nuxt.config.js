const tailwindConfig = require('./tailwind.js')
const path = require('path')
const glob = require('glob-all')
const PurgeCssPlugin = require('purgecss-webpack-plugin')
const i18n = require('./i18n')
const titleTemplate = c => c ? `${c} - Developmint` : 'Developmint'
module.exports = {

  /*
   * Environment
   */
  env: {
    baseUrl: process.env.BASE_URL || 'https://developmint.de/'
  },

  /*
   * Scroll behavior
   */
  router: {
    scrollBehavior: (to, from, savedPosition) => {
      let position = false

      if (to.matched.length < 2 || to.matched.some((r) => r.components.default.options.scrollToTop)) {
        position = { x: 0, y: 0 }
      }

      if (savedPosition) {
        position = savedPosition
      }

      return new Promise(resolve => {
        // wait for the out transition to complete (if necessary)
        window.$nuxt.$once('triggerScroll', () => {
          // coords will be used if no selector is provided,
          // or if the selector didn't match any element.
          if (to.hash && document.querySelector(to.hash)) {
            // scroll to anchor by returning the selector
            position = { selector: to.hash }
          }
          resolve(position)
        })
      })
    }
  },

  /*
   * Head of the page
   */
  head: {
    titleTemplate,
    meta: [
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Developmint' }
    ],
    noscript: [{ innerHTML: 'This website requires JavaScript.' }],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:400,700' }
    ],
    __dangerouslyDisableSanitizers: ['script'],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(
          {
            '@context': 'http://schema.org',
            '@type': 'Corporation',
            'name': 'Developmint',
            'legalName': 'Developmint GbR - Alexander Lichter, Max Langer',
            'address': {
              '@type': 'PostalAddress',
              'addressCountry': 'DE',
              'addressLocality': 'Leipzig',
              'addressRegion': 'Sachsen',
              'postalCode': '04289',
              'streetAddress': 'Corotweg 15'
            },
            'logo': 'https://developmint.de/logo.png',
            'email': 'mailto:support@developmint.de',
            'telephone': '+49 17670625208',
            'url': 'https://developmint.de',
            'sameAs': [
              'https://github.com/Developmint'
            ],
            'foundingDate': ' 2015-08-10',
            'founders': [
              {
                '@context': 'http://schema.org',
                '@type': 'Person',
                'address': {
                  '@type': 'PostalAddress',
                  'addressCountry': 'DE',
                  'addressLocality': 'Leipzig',
                  'addressRegion': 'Sachsen',
                  'postalCode': '04289',
                  'streetAddress': 'Corotweg 15'
                },
                'name': 'Alexander Lichter',
                'image': 'https://developmint.de/alex@2x.jpg',
                'email': 'mailto:alichter@developmint.de',
                'telephone': '+49 17670625208',
                'jobTitle': 'Founder of Developmint',
                'sameAs': [
                  'https://twitter.com/TheAlexLichter',
                  'https://github.com/manniL',
                  'https://lichter.io',
                  'https://linkedin.com/in/alexanderlichter'
                ]
              },
              {
                '@context': 'http://schema.org',
                '@type': 'Person',
                'name': 'Max Langer',
                'image': 'https://developmint.de/max@2x.jpg',
                'email': 'mailto:mlanger@developmint.de',
                'jobTitle': 'Founder of Developmint',
                'sameAs': [
                  'https://twitter.com/mangerlahn',
                  'https://github.com/mangerlahn',
                  'https://www.linkedin.com/in/max-langer-17b133136/'
                ]
              }
            ],
            'numberOfEmployees': 2,
            'vatID': 'DE301268038',
            'taxID': '231/158/16101'
          })
      }
    ]
  },

  /*
   * Meta information
   */
  meta: {
    name: 'Developmint',
    description: 'Developmint is an experienced Software agency based in Dresden (Germany). Let your visions become' +
    ' reality with us!',
    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    author: 'Developmint',
    ogHost: process.env.BASE_URL || 'https://developmint.de/',
    ogImage: {
      path: 'logo.png'
    },
    twitterCard: 'summary'
  },

  /*
  ** CSS Load
   */
  css: [
    // SCSS file in the project
    '@/assets/styles/app.scss'
  ],

  /*
   * Nuxt plugins
   */
  plugins: [
    { src: '~/plugins/vue-prototype-extensions' },
    { src: '~/plugins/vue-scroll-directive', ssr: false },
    { src: '~/plugins/vue-observe-visibility-directive', ssr: false }
  ],

  /*
   * Modules
   */
  modules: [
    // Simple usage
    ['@nuxtjs/google-analytics', {
      id: 'UA-62902757-7',
      disabled: () => document.cookie.indexOf('ga_optout=true') !== -1,
      debug: {
        sendHitTask: process.env.NODE_ENV === 'production'
      },
      set: [
        { field: 'anonymizeIp', value: true }
      ]
    }],
    '@nuxtjs/pwa',
    ['@nuxtjs/axios', { baseURL: '/api/contact' }],
    ['nuxt-i18n', i18n]
  ],

  /*
   * Customize the progress bar color
   */
  loading: { color: tailwindConfig.colors.developmint },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: 'white',
    background: tailwindConfig.colors.developmint
  },

  /*
   * Manifest
   */
  manifest: {
    name: 'Developmint',
    short_name: 'Developmint',
    start_url: '/',
    display: 'standalone',
    background_color: tailwindConfig.colors['rains'],
    theme_color: tailwindConfig.colors.developmint
  },

  serverMiddleware: [
    '~/api/contact'
  ],
  /*
   * Build configuration
   */
  build: {
    vendor: ['intersection-observer', 'vue-observe-visibility'],
    extractCSS: {
      allChunks: true
    },
    postcss: [
      require('tailwindcss')('./tailwind.js'),
      require('autoprefixer')
    ],

    /*
     * Run ESLint on save
     * Add PurgeCSS
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        if (ctx.isDev) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
          })
        } else {
          config.plugins.push(new PurgeCssPlugin({
            paths: glob.sync([
              path.join(__dirname, 'components/**/*.vue'),
              path.join(__dirname, 'layouts/**/*.vue'),
              path.join(__dirname, 'i18n/**/*.js'),
              path.join(__dirname, 'pages/**/*.vue'),
              path.join(__dirname, 'plugins/**/*.vue')
            ]),
            styleExtensions: ['.css'],
            whitelist: ['body', 'html', 'nuxt-progress'],
            whitelistPatterns: [/cookie-consent/],
            extractors: [
              {
                extractor: class {
                  static extract (content) {
                    return content.match(/[A-z0-9-:\\/]+/g)
                  }
                },
                extensions: ['vue', 'js']
              }
            ]
          }))
        }
      }
      config.module.rules.push({
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['vue-app'],
          babelrc: false,
          cacheDirectory: true
        },
        include: [
          path.resolve(__dirname, './node_modules/vuelidate/src')
        ]
      })
    }
  }
}
