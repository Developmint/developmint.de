/* eslint-disable no-console */
export default {
  methods: {
    logClick (icon) {
      this.$ga.event({
        eventCategory: 'click',
        eventAction: `${this.name} - ${icon}`
      })
    }
  }
}
