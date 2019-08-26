<template>
  <!-- eslint-disable vue/max-attributes-per-line -->
  <div>
    <div class="h-48 bg-rains" />
    <section class="flex flex-col flex-wrap items-center bg-gray-lighter py-8 leading-normal text-gray-darkest">
      <!-- eslint-disable vue/no-v-html -->
      <div
        class="justify-around items-center w-5/6 md:w-1/2 mx-auto legal"
        v-html="$t('legal.legal')"
      />
    </section>
  </div>
</template>

<script>

export default {
  head () {
    return {
      ...this.$t('seo.legal'),
      meta: [
        { hid: 'robots', name: 'robots', content: 'noindex' }
      ]
    }
  }
}
</script>

<style lang="postcss">
  .legal > h1 {
    @apply font-bold text-2xl py-6
  }
  .legal > h2 {
    @apply font-bold text-xl py-4
  }
  .legal > h3 {
    @apply font-bold text-lg py-2
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
