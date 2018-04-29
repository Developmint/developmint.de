import Vue from 'vue'

// What a monster :O
Vue.prototype.$createSeo = function (slug, baseMetaArray = []) {
  return Object.entries(this.$i18n.messages[this.$i18n.locale].seo[slug])
    .reduce((acc, [key, actualValue]) => {
      const defaultMetaArray = [
        {
          name: 'og:url',
          content: `${process.env.baseUrl}${this.$route.path.substr(1)}`
        }
      ]

      // If meta, add base array (likely og:image) and defaultArray containing og:url
      const valueForKey = key !== 'meta'
        ? actualValue
        : wrap(actualValue)
          .concat(defaultMetaArray)
          .concat(baseMetaArray)
          .reduce((acc, metaObject) => acc.concat(retrieveMetaObjectArray(metaObject)), [])

      return { ...acc, [key]: valueForKey }
    }, {})
}

const wrap = a => Array.isArray(a) ? a : [a]

const retrieveMetaObjectArray = metaObject => {
  const wrappedName = wrap(metaObject.name)

  return wrappedName.map(n => ({
    hid: n,
    name: n,
    property: n,
    // Fix url when the meta information is og:image
    content: wrappedName.includes('og:image') ? process.env.baseUrl + metaObject.content.substr(1) : metaObject.content
  }))
}
