<template>
  <div
    :class="{'border border-t border-b bg-grey-light md:bg-grey-lighter': odd, 'bg-grey-lightest shadow-lg': !odd}"
    class="w-full transition-all">
    <div
      :class="{'xl:flex-row-reverse': odd, 'xl:flex-row': !odd}"
      class="flex flex-col xl:justify-around items-center md:mx-16 xl:p-16">
      <a
        v-bind="bindUrl"
        target="_blank"
        rel="noopener"
        class="text-rains flex justify-center group sm:mt-8 lg:my-8 md:w-1/2"
        @click="logClick('img')">
        <img
          :src="require(`~/assets/img/work/${slug}.jpg`)"
          :srcset="`${require(`~/assets/img/work/${slug}@2x.jpg`)} 2x`"
          :alt="`${$t(`work.projects.${slug}.title`)} ${$t(`general.preview`)}`"
          class="transition-all group-hover:scale-1025 group-hover:shadow-lg shadow-md border md:border-2 border-rains-lighter md:border-grey-light md:rounded max-w-none">
      </a>
      <div class="my-6 xl:px-6 xl:w-1/2">
        <a
          v-t="`work.projects.${slug}.title`"
          v-bind="bindUrl"
          target="_blank"
          rel="noopener"
          class="block text-rains no-underline text-center mx-6 mt-4 font-bold text-2xl hover:text-shadow-sm transition-all"
          @click="logClick('heading')"/>
        <p
          class="mt-2 p-6 py-8 md:py-6 text-justify my-16 md:my-0 md:px-16"
          v-html="$t(`work.projects.${slug}.shortDescription`)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import logClick from '~/mixins/logClick'

export default {
  mixins: [logClick],
  props: {
    slug: {
      type: String,
      default: ''
    },
    odd: {
      type: Boolean,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    bindUrl() {
      // Looks weird, but is needed to disable links if empty url is provided, because no href will be bound then
      return this.url.length ? { href: `${this.url}?ref=developmint.de` } : {}
    }
  }
}
</script>
