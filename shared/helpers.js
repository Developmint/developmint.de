export const deterministicRotate = (arr) => {
  if (arr.length <= 1) {
    return arr
  }
  let rotations = (new Date()).getMinutes() % arr.length

  if (arr.length === 2) {
    return rotations ? arr : arr.reverse()
  }

  return arr.slice(rotations, arr.length).concat(arr.slice(0, rotations))
}

// What a monster :O

export const seoCreator = (slug, { $i18n, $route }, baseMetaArray = []) => Object.entries($i18n.messages[$i18n.locale].seo[slug]).reduce((acc, [key, value]) => {
  if (key === 'meta') {
    const defaultMetaArray = [
      {
        name: 'og:url',
        content: `${process.env.baseUrl}${$route.path.substr(1)}`
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
