<template>
  <div class="font-lato text-rains-500 text-base antialiased leading-normal bg-gray-100 overflow-hidden">
    <Navbar />
    <Nuxt />
    <AppFooter />
    <ContactUs
      v-if="showContactUsModal"
      @close="hideContactUsModal"
    />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
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
  head () {
    return this.$nuxtI18nSeo()
  },
  methods: {
    hideContactUsModal () {
      this.showContactUsModal = false
      if (history.length > 2) {
        this.$router.back()
      } else {
        this.$router.push(this.$route.path)
      }
    },
    checkForHash (to) {
      this.showContactUsModal = to.hash.includes(this.$t('anchors.contact-us'))
    }
  }
}
</script>
