<template>
  <div class="font-lato text-rains text-base antialiased leading-normal bg-grey-lightest overflow-hidden">
    <consent/>
    <navbar/>
    <nuxt/>
    <app-footer/>
    <contact-us
      v-if="showContactUsModal"
      @close="hideContactUsModal"/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'
import Consent from '~/components/Consent'

export default {
  components: {
    Consent,
    Navbar,
    AppFooter: () => import('~/components/Footer'),
    ContactUs: () => import('~/components/ContactUsModal')
  },
  data () {
    return {
      showContactUsModal: false
    }
  },
  watch: {
    $route (to) {
      this.checkForHash(to)
    }
  },
  mounted () {
    this.checkForHash(this.$route)
  },
  methods: {
    hideContactUsModal () {
      this.showContactUsModal = false
      history.back()
    },
    checkForHash (to) {
      this.showContactUsModal = to.hash.includes(this.$t('anchors.contact-us'))
    }
  }
}
</script>
