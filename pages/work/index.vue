<template>
  <div>
    <section class="min-h-750 bg-work flex flex-col justify-center items-center">
      <h1 class="text-center text-6xl font-normal text-rains-lighter capitalize mt-32">
        {{ $t('work.index.heading') }}
      </h1>
      <h2 class="font-normal text-center text-rains-lighter text-3xl w-4/5">
        {{ $t('work.index.subheading') }}
      </h2>
    </section>
    <div class="flex flex-wrap justify-center">
      <work-preview
        v-for="({slug, url}, i) in $options.projects"
        :key="i"
        :odd="!!(i % 2)"
        :slug="slug"
        :url="url"/>
    </div>
    <div class="bg-white shadow w-full py-32 flex flex-col items-center">
      <h3 class="text-2xl text-center">{{ $t('work.appendix.heading') }}</h3>
      <p class="w-full md:w-1/2 p-8 md:p-3">{{ $t('work.appendix.subheading') }}</p>
      <div class="w-full md:w-3/4 flex flex-col lg:flex-row items-center lg:justify-around mt-16">
        <div
          v-observe-visibility="handleVisibility"
          class="my-8 lg:my-0 mx-4 text-xl">
          <animated-number
            :should-start="isVisible"
            :to="30"
            class="text-2xl font-bold"/>
          <span>+ {{ $t('work.appendix.statistics')[0] }}</span>
        </div>
        <div class="my-8 lg:my-0 mx-4 text-xl">
          <animated-number
            :should-start="isVisible"
            :duration="3500"
            :to="100000"
            class="text-2xl font-bold"/>
          <span>+ {{ $t('work.appendix.statistics')[1] }}</span>
        </div>
        <div class="my-8 lg:my-0 mx-4 text-xl">
          <animated-number
            :should-start="isVisible"
            :duration="2500"
            :to="100"
            class="text-2xl font-bold"/>
          <span>% {{ $t('work.appendix.statistics')[2] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deterministicRotate } from '~/shared/helpers'

export default {
  components: {
    WorkPreview: () => import('~/components/work/WorkPreview'),
    AnimatedNumber: () => import('~/components/work/AnimatedNumber')
  },
  data () {
    return {
      isVisible: false
    }
  },
  methods: {
    async handleVisibility (isVisible) {
      if (isVisible) {
        this.isVisible = true
      }
    }
  },
  projects: deterministicRotate([
    {
      slug: 'addism',
      url: 'https://addism.de/'
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
      slug: 'lichter-io',
      url: 'https://lichter.io/'
    },
    {
      slug: 'ostseeferien-binz',
      url: 'https://ostseeferien-binz.de/'
    },
    {
      slug: 'association-manager',
      url: ''
    }
  ]),
  head () {
    return this.$createSeo('work')
  }
}
</script>
