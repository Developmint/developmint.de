<template>
  <div
    :class="{'border border-t border-b bg-gray-light md:bg-gray-200': odd, 'bg-gray-100 shadow-lg': !odd}"
    class="w-full transition-all"
  >
    <div
      :class="{'xl:flex-row-reverse': odd, 'xl:flex-row': !odd}"
      class="flex flex-col xl:justify-around md:mx-16 xl:p-16"
    >
      <a
        v-bind="boundUrl"
        target="_blank"
        :rel="rel"
        class="text-rains-500 flex justify-center group sm:mt-8 lg:my-8 md:w-1/2"
        @click="logClick('img')"
      >
        <Component
          :is="svg"
          v-if="svg"
          class="transition-all group-hover:scale-1025 group-hover:shadow-lg shadow-md border md:border-2 border-rains-300 md:border-gray-400 md:rounded max-w-none"
        />
        <img
          v-else
          v-bind="imageSources"
          :alt="`${$t(`work.projects.${slug}.title`)} ${$t(`general.preview`)}`"
          class="transition-all group-hover:scale-1025 group-hover:shadow-lg shadow-md border md:border-2 border-rains-300 md:border-gray-400 md:rounded max-w-none"
        >
      </a>
      <div class="my-6 xl:px-6 xl:w-1/2">
        <a
          v-bind="boundUrl"
          target="_blank"
          :rel="rel"
          class="block text-rains-500 no-underline mx-6 md:px-6 mt-4 hover:underline transition-all"
          @click="logClick('heading')"
        ><h2 v-t="`work.projects.${slug}.title`" class="text-2xl font-semibold" /></a>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p class="mt-2 p-6 py-8 md:py-6 text-justify my-8 md:my-0 md:px-12" v-html="$t(`work.projects.${slug}.shortDescription`)" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
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
    },
    svg: {
      type: [Boolean, Function],
      default: false
    },
    shouldFollow: {
      type: Boolean,
      default: false
    }
  },
  setup (props, context) {
    const logClick = (eventName) => {
      context.root.$ga.event({
        eventCategory: 'click',
        eventAction: `work preview: ${props.slug} - ${eventName}`
      })
    }

    // Looks weird, but is needed to disable links if empty url is provided, because no href will be bound then
    const boundUrl = computed(() => props.url.length ? { href: `${props.url}?ref=developmint.de` } : {})

    const rel = computed(() => `noopener${props.shouldFollow ? '' : ' nofollow'}`)

    const imageSources = computed(() => ({
      src: require(`~/assets/img/work/${props.slug}.jpg`),
      srcset: `${require(`~/assets/img/work/${props.slug}@2x.jpg`)} 2x`
    }))

    return {
      logClick,
      boundUrl,
      imageSources,
      rel
    }
  }
}
</script>
