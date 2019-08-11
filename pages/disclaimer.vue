<template>
  <div>
    <div class="h-48 bg-rains" />
    <section class="flex flex-col flex-wrap items-center bg-gray-lighter py-8 leading-normal text-gray-darkest min-h-screen">
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="justify-around items-center w-5/6 md:w-1/2 mx-auto"
        v-html="$t('legal.disclaimer')"
      />
    </section>
  </div>
</template>
<script>
export default {
  head () {
    return {
      ...this.$t('seo.disclaimer'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
