<template>
  <div>
    <div class="h-48 bg-rains" />
    <section class="flex flex-col flex-wrap items-center bg-gray-lighter py-8 leading-normal text-gray-darkest min-h-screen">
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="justify-around items-center w-5/6 md:w-1/2 mx-auto legal"
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

<style lang="postcss">
  .legal > h1 {
    @apply font-bold text-2xl
  }
  .legal > h2 {
    @apply font-bold text-xl
  }
  .legal > h3 {
    @apply font-bold text-lg
  }
  .legal > a {
    @apply underline text-blue-400;

    &:hover {
      @apply text-indigo-400
    }
  }
  .legal > ul {
    @apply list-disc px-8
  }
</style>
