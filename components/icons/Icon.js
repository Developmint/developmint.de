const createTitleElement = (h, title) => title ? [h('title', {}, [title])] : []

export default {
  functional: true,
  props: {
    path: {
      type: String,
      required: true
    },
    viewBox: {
      type: String,
      default: '0 100 1792 1792'
    },
    iconTitle: {
      type: String,
      default: ''
    }
  },
  render(h, { children, data, props: { viewBox, path, iconTitle } }) {
    return h('svg', {
      ...data,
      attrs: {
        viewBox,
        xmlns: 'http://www.w3.org/2000/svg'
      }
    }, [h('path', { attrs: { d: path } }), ...createTitleElement(h, iconTitle)])
  }
}
