<template>
  <!-- eslint-disable vue/no-v-html -->
  <main>
    <section class="min-h-screen md:min-h-750 bg-hero flex flex-col justify-center items-center">
      <h1 class="text-center mt-16">
        <span
          :class="{'capitalize' : $i18n.locale !== 'de'}"
          class="text-lg lg:text-3xl text-rains-400 mt-8 md:mt-16 lg:mt-32"
        >
          {{ $t('index.hero.intro') }}
        </span>
        <Transition
          appear
          duration="1000"
          enter-active-class="fade-in-down"
          leave-active-class="fade-out-down"
          mode="out-in"
        >
          <span
            :key="currentSloganIndex"
            class="block text-2xl md:text-3xl lg:text-5xl xl:text-7xl text-rains-300 my-4 opacity-85 text-shadow animated capitalize"
            v-html="currentSlogan"
          />
        </Transition>
      </h1>
      <NuxtLink
        :to="'#' + $t('anchors.contact-us')"
        class="mt-8 md:mt-16 lg:mt-32 opacity-85 bg-gradient-rains-500-rains-600 hover:bg-gradient-rains-dark-rains rounded-full text-2xl md:text-3xl lg:text-4xl text-gray-400 px-24 py-2 border border-gray-600 hover:border-gray hover:opacity-100 transition-opacity transition-border-color"
        v-text="$t('index.hero.cta')"
      />
    </section>
    <div class="shadow-inner">
      <section class="container mx-auto py-16 md:px-4 md:mb-16 lg:mb-32">
        <h2 class="text-center my-8 text-xl lg:text-3xl">
          {{ $t('index.intro.heading') }}
        </h2>
        <p
          class="md:text-justify p-4 md:p-8"
          v-html="$t('index.intro.text')"
        />
      </section>
    </div>
    <div class="bg-white">
      <div class="md:py-2 rounded">
        <div class="h-screen md:h-auto container py-8 md:py-0 px-4 md:-mt-32 bg-gradient-developmint-400-rains-400-rains-300 mx-auto rounded flex flex-col md:flex-row justify-around md:justify-between items-center group shadow-lg transition-all md:hover:scale-1025">
          <div class="flex-grow-0 text-5xl md:text-10xl opacity-50 text-gray-300 group-hover:text-gray-600 select-none transition-all">
            »
          </div>
          <Quote
            :key="currentQuoteIndex"
            :person="currentQuote.person"
            :quote="currentQuote.quote"
            class="flex-shrink-0 md:flex-shrink flex-grow-0 md:flex-grow max-w-5xl"
          />
          <Quote
            v-for="({quote, person}) in quotesWithoutCurrent"
            :key="quote + person"
            :person="person"
            :quote="quote"
            class="hidden flex-shrink-0 md:flex-shrink flex-grow-0 md:flex-grow max-w-5xl"
          />
          <div class="flex-grow-0 text-5xl md:text-10xl opacity-25 text-gray-700 group-hover:text-gray-200 select-none transition-all">
            «
          </div>
        </div>
      </div>
      <section class="w-full xl:w-3/4 mx-auto mt-16 py-8 p-4 text-md">
        <h2 class="text-center mb-8 text-3xl">
          {{ $t('index.expertises.heading') }}
        </h2>
        <p class="text-center text-lg my-1">
          {{ $t('index.expertises.subheadings[0]') }}
        </p>
        <p class="text-center text-lg my-3 mb-8">
          {{ $t('index.expertises.subheadings[1]') }}
        </p>
        <div class="lg:flex justify-center items-center my-16">
          <ExpertiseCategory
            v-for="(expertise, index) in $t('index.expertises.content')"
            :key="index"
            :is-first="!index"
            :list-items="expertise.listItems"
            :title="expertise.title"
          />
        </div>
        <p
          class="text-sm text-gray-700 text-center mt-8 mb-4"
          v-html="$t('index.expertises.end')"
        />
      </section>
    </div>
    <div class="shadow-inner">
      <div class="lg:mx-8 xl:mx-16 py-4 px-0 md:px-4">
        <div v-observe-visibility="onVisibilityChange">
          <Transition name="slide-fade">
            <div class="lg:flex flex-row justify-around lg:my-8 md:p-4">
              <InformationIcon
                v-for="(data,index) in $t('index.informationIcons')"
                :key="index"
                :class="{'opacity-0': !showIcons}"
                :content="data.content"
                :title="data.title"
              >
                <Component
                  :is="data.img"
                  class="h-48 p-1 mb-8 transition-all"
                />
              </InformationIcon>
            </div>
          </Transition>
        </div>
      </div>
    </div>
    <section class="bg-cta-end shadow-over-gray-darkest text-white">
      <div class="container mx-auto p-4 py-48">
        <h2 class="text-center text-3xl text-rains-300 mb-3 uppercase text-shadow">
          {{ $t('index.end.heading') }}
        </h2>
        <p class="text-center">
          {{ $t('index.end.subheading') }}
        </p>
        <div class="flex justify-center">
          <NuxtLink
            :to="'#' + $t('anchors.contact-us')"
            class="mt-16 opacity-85 rounded-full text-xl lg:text-3xl text-gray-400 px-8 lg:px-24 py-2 border border-gray-600 hover:border-gray-500 hover:opacity-100 transition-opacity transition-border-color"
            v-text="$t('index.end.cta')"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { ref, computed } from '@vue/composition-api'
import { useInterval } from '@/compositions/useInterval'

const nextItem = (arrayRef, indexRef) => () => { indexRef.value = (indexRef.value + 1) % arrayRef.value.length }

export default {
  components: {
    InformationIcon: () => import('~/components/index/InformationIcon'),
    DevicesIcon: () => import('~/assets/img/icons/index/devices.svg'),
    DataIcon: () => import('~/assets/img/icons/index/data.svg'),
    AnalyticsIcon: () => import('~/assets/img/icons/index/analytics.svg'),
    Quote: () => import('~/components/index/Quote'),
    ExpertiseCategory: () => import('~/components/index/ExpertiseCategory')
  },
  setup (props, context) {
    // Workaround to get i18n working - https://github.com/kazupon/vue-i18n/issues/693
    const slogans = computed(() => context.root.$i18n.t('index.hero.slogans'))
    const currentSloganIndex = ref(0)
    const currentSlogan = computed(() => slogans.value[currentSloganIndex.value])
    const nextSlogan = nextItem(slogans, currentSloganIndex)
    const slogansWithoutCurrent = computed(() => slogans.value.slice().splice(currentSloganIndex.value))
    useInterval(7.5, nextSlogan)

    const quotes = computed(() => context.root.$i18n.t('index.quotes'))
    const currentQuoteIndex = ref(0)
    const currentQuote = computed(() => quotes.value[currentQuoteIndex.value])
    const nextQuote = nextItem(quotes, currentQuoteIndex)
    const quotesWithoutCurrent = computed(() => quotes.value.slice().splice(currentQuoteIndex.value))
    useInterval(7.5, nextQuote)

    const showIcons = ref(false)
    const onVisibilityChange = (isVisible) => {
      if (isVisible) {
        showIcons.value = true
      }
    }

    return {
      // Slogans
      slogans,
      currentSloganIndex,
      currentSlogan,
      slogansWithoutCurrent,
      // Quotes
      quotes,
      currentQuoteIndex,
      currentQuote,
      quotesWithoutCurrent,
      // Icon-related stuff
      showIcons,
      onVisibilityChange
    }
  },
  head () {
    return {
      title: '',
      ...this.$createSeo('index')
    }
  }
}
</script>

<style lang="postcss">
  .bg-gradient-developmint-400-rains-400-rains-300 {
    background-image: linear-gradient(23deg, theme('colors.developmint.400'), theme('colors.rains.400'), theme('colors.rains.300'));
  }

  .bg-gradient-rains-500-rains-600 {
    background-image: linear-gradient(to right, theme('colors.rains.500'), theme('colors.rains.600'));
  }

  .bg-hero {
    background-size: cover;
    background-image: linear-gradient(theme('colors.rains.600'), rgba(11, 7, 16, 0.65)), url("~assets/img/bg/hero_sm.jpg");

    @screen md {
      background-image: linear-gradient(theme('colors.rains.600'), rgba(11, 7, 16, 0.65)), url("~assets/img/bg/hero.jpg");
    }
  }

  .bg-cta-end {
    background-size: cover;
    background-image: linear-gradient(rgba(9, 0, 16, 0.25), rgba(11, 7, 16, 1)), url("~assets/img/bg/contact_sm.jpg");

    @screen md {
      background-image: linear-gradient(rgba(9, 0, 16, 0.25), rgba(11, 7, 16, 1)), url("~assets/img/bg/contact.jpg");
      background-position: bottom;
    }
  }
</style>
