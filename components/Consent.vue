<template>
  <if-bot>
    <cookie-consent
      message="We use Cookies for user analysis and on-page improvements!"
      link-label="Learn about cookies"/>
  </if-bot>
</template>

<script>
import IfBot from 'vue-if-bot/dist/vue-if-bot.es'
import CookieConsent from '~/node_modules/vue-cookieconsent-component/src/components/CookieConsent'

export default {
  components: {
    IfBot,
    CookieConsent
  }
}
</script>
