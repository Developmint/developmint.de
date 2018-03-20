import Vue from 'vue'

// What a monster :O
Vue.prototype.$createSeo = function (slug, baseMetaArray = []) {
  console.log(this.$i18n.messages[this.$i18n.locale].seo[slug])
  return Object.entries(this.$i18n.messages[this.$i18n.locale].seo[slug]).reduce((acc, [key, value]) => {
    if (key === 'meta') {
      const defaultMetaArray = [
        {
          name: 'og:url',
          content: `${process.env.baseUrl}${this.$route.path.substr(1)}`
        }
      ]

      value = Array.isArray(value) ? value : [value]

      // If meta, add base array (likely og:image) and defaultArray containing og:url
      acc[key] = value.concat(defaultMetaArray).concat(baseMetaArray).reduce((acc, metaObject) => {
        metaObject.name = Array.isArray(metaObject.name) ? metaObject.name : [metaObject.name]

        return acc.concat(metaObject.name.map(n => ({
          hid: n,
          name: n,
          property: n,
          // Fix url when the meta information is og:image
          content: metaObject.name.includes('og:image') ? process.env.baseUrl + metaObject.content.substr(1) : metaObject.content
        })))
      }, [])
    } else {
      acc[key] = value
    }

    return acc
  }, {})
}
