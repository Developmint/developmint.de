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

<style lang="scss">
  .cookie-consent {
    @apply .w-full .py-2 .relative .flex .items-center .justify-center .bg-developmint-darker .text-developmint-lightest .text-xs;

    @screen md {
      @apply .text-sm .text-center;
    }

    &-link {
      @apply .no-underline .text-developmint-light;
      &:hover {
        @apply text-developmint-lighter;
      }
    }

    &-message,
    &-compliance {
      @apply .mx-2 .my-1 .px-2;

      @screen md {
        @apply .px-4;
      }
    }

    &-compliance {
      @apply .cursor-pointer .text-white .py-2 .rounded .border-white .border;

      &:hover {
        @apply bg-white .text-black;
      }
    }
  }
</style>
