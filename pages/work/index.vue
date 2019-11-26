<template>
  <div>
    <section class="min-h-screen md:min-h-750 bg-work flex flex-col justify-center items-center">
      <h1 class="text-center text-4xl md:text-6xl text-rains-400 capitalize mt-16 md:mt-32 mb-4 md:mb-0">
        {{ $t('work.index.heading') }}
      </h1>
      <h2 class="text-center text-rains-300 text-xl md:text-3xl w-4/5">
        {{ $t('work.index.subheading') }}
      </h2>
    </section>
    <div class="flex flex-wrap justify-center">
      <WorkPreview
        v-for="(info, i) in projects"
        :key="i"
        :odd="Boolean(i % 2)"
        v-bind="info"
      />
    </div>
    <div class="bg-white shadow w-full py-32 flex flex-col items-center">
      <h3 class="text-3xl pb-4 text-center">
        {{ $t('work.appendix.heading') }}
      </h3>
      <p class="w-full md:w-1/2 p-8 md:p-3">
        {{ $t('work.appendix.subheading') }}
      </p>
      <div class="w-full md:w-3/4 flex flex-col lg:flex-row items-center lg:justify-around mt-4 md:mt-16">
        <div
          v-for="({duration, to, prefix, precision}, i) in numbers"
          :key="i"
          v-observe-visibility="{ callback: !i ? handleVisibility : () => {}, once: true }"
          class="my-6 md:my-8 lg:my-0 mx-4 text-xl text-center md:w-1/3"
        >
          <AnimatedNumber
            :duration="duration"
            :precision="precision"
            :should-start="isVisible"
            :to="to"
            class="text-2xl font-bold pl-4"
            style="font-variant-numeric: tabular-nums"
          />
          <span>{{ prefix }} {{ $t('work.appendix.statistics')[i] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import WorkPreview from '~/components/work/WorkPreview'

const projects = [
  {
    slug: 'nuxt',
    url: 'https://nuxtjs.org/',
    svg: () => import('~/assets/img/work/nuxt.svg')
  },
  {
    slug: 'itexia',
    url: 'https://itexia.com/'
  },
  {
    slug: 'hid',
    url: 'https://hochschulinitiative-deutschland.de/'
  },
  {
    slug: 'addism',
    url: 'https://addism.de/',
    shouldFollow: true
  },
  {
    slug: 'lichter-io',
    url: 'https://lichter.io/',
    shouldFollow: true
  },
  {
    slug: 'ostseeferien-binz',
    url: 'https://ostseeferien-binz.de/'
  },
  {
    slug: 'association-manager',
    url: ''
  }
]
const numbers = [
  {
    duration: 1000,
    to: 50,
    precision: 0,
    prefix: '+'
  },
  {
    duration: 3500,
    to: 500000,
    precision: 0,
    prefix: '+'
  },
  {
    duration: 2500,
    to: 100,
    precision: 2,
    prefix: '%'
  }
]

export default {
  scrollToTop: true,
  components: {
    WorkPreview,
    AnimatedNumber: () => import('~/components/work/AnimatedNumber')
  },
  setup () {
    const isVisible = ref(false)
    const handleVisibility = (visibilityState) => {
      if (visibilityState) {
        isVisible.value = true
      }
    }

    return {
      isVisible,
      handleVisibility,
      numbers,
      projects
    }
  },
  head () {
    return this.$createSeo('work')
  }
}
</script>

<style lang="postcss">
  .bg-work {
    background-size: cover;
    background-image: linear-gradient(theme('colors.rains.600'), rgba(11, 7, 16, 0.6)), url("~assets/img/bg/work_sm.jpg");
    background-position: bottom;
    @screen md {
      background-image: linear-gradient(theme('colors.rains.600'), rgba(11, 7, 16, 0.6)), url("~assets/img/bg/work.jpg");
      background-position: center;
    }
  }
</style>
