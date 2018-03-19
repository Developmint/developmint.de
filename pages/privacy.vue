<template>
  <div>
    <div class="h-48 bg-rains"/>
    <section
      class="flex flex-col flex-wrap items-center bg-grey-lighter py-8 leading-normal text-grey-darkest">
      <div
        class="justify-around items-center w-5/6 md:w-1/2 mx-auto"
        v-html="$t('legal.privacy')"/>
    </section>
  </div>
</template>

<script>
export default {
  head () {
    return {
      ...this.$t('seo.privacy'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>
