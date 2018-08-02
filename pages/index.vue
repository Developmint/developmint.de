<template>
  <main>
    <section class="h-screen lg:min-h-750 bg-hero flex flex-col justify-center items-center">
      <div
        :class="{'capitalize' : $i18n.locale !== 'de'}"
        class="text-center text-lg lg:text-3xl text-rains-lighter mt-8 md:mt-16 lg:mt-32">
        {{ $t('index.hero.intro') }}
      </div>
      <transition
        appear
        enter-active-class="fade-in-down"
        leave-active-class="fade-out-down"
        mode="out-in"
        duration="1000">
        <div
          :key="currentSloganIndex"
          class="block text-center text-2xl md:text-3xl lg:text-5xl xl:text-7xl text-rains-lightest my-4 opacity-85 text-shadow animated capitalize"
          v-html="currentSlogan"
        />
      </transition>
      <nuxt-link
        :to="'#' + $t('anchors.contact-us')"
        class="no-underline mt-8 md:mt-16 lg:mt-32 opacity-85 bg-gradient-rains-rains-dark hover:bg-gradient-rains-dark-rains rounded-full text-2xl md:text-3xl lg:text-4xl text-grey-light px-24 py-2 border border-grey-dark hover:border-grey hover:opacity-100 transition-opacity transition-border-color">
        {{ $t('index.hero.cta') }}
      </nuxt-link>
    </section>
    <div class="shadow-inner">
      <section class="container mx-auto py-16 md:px-4 md:mb-16 lg:mb-32">
        <h1 class="text-center my-8 text-xl lg:text-3xl font-normal">{{ $t('index.intro.heading') }}</h1>
        <p
          class="md:text-justify p-4 md:p-8"
          v-html="$t('index.intro.text')"/>
      </section>
    </div>
    <div class="bg-white">
      <div class="md:py-2 rounded">
        <div class="h-screen md:h-auto container py-8 md:py-0 px-4 md:-mt-32 bg-gradient-developmint-lighter-rains-lighter-rains-lightest mx-auto rounded flex flex-col md:flex-row justify-around md:justify-start items-center group shadow-lg transition-all md:hover:scale-1025">
          <div class="flex-no-grow text-5xl md:text-10xl opacity-50 text-grey-lighter group-hover:text-grey-dark select-none transition-all">
            »
          </div>
          <quote
            :key="currentQuoteIndex"
            :quote="currentQuote.quote"
            :person="currentQuote.person"
            class="flex-no-shrink md:flex-shrink flex-no-grow md:flex-grow"/>
          <div class="flex-no-grow text-5xl md:text-10xl opacity-25 text-grey-darker group-hover:text-grey-lightest select-none transition-all">
            «
          </div>
        </div>
      </div>
      <section class="w-full xl:w-3/4 mx-auto mt-16 py-8 p-4 text-md">
        <h1 class="text-center mb-8 text-3xl font-normal">{{ $t('index.expertises.heading') }}</h1>
        <p class="text-center text-lg my-1">{{ $t('index.expertises.subheadings[0]') }}</p>
        <p class="text-center text-lg my-3 mb-8">{{ $t('index.expertises.subheadings[1]') }}</p>
        <div class="lg:flex justify-center items-center my-16">
          <expertise-category
            v-for="(expertise, index) in $t('index.expertises.content')"
            :title="expertise.title"
            :list-items="expertise.listItems"
            :key="index"
            :is-first="!index"/>
        </div>
        <p
          class="text-sm text-grey-darker text-center mt-8 mb-4"
          v-html="$t('index.expertises.end')"/>
      </section>
    </div>
    <div class="shadow-inner">
      <div class="lg:mx-8 xl:mx-16 py-4 px-0 md:px-4">
        <div v-observe-visibility="visibilityChanged">
          <transition name="slide-fade">
            <div class="lg:flex flex-row justify-around lg:my-8 md:p-4">
              <information-icon
                v-for="(data,index) in $t('index.informationIcons')"
                :class="{'opacity-0': !showIcons}"
                :img="data.img"
                :key="index"
                :title="data.title"
                :alt="data.alt"
                :content="data.content"/>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <section class="bg-cta-end shadow-over-grey-darkest text-white">
      <div class="container mx-auto p-4 py-64">
        <h1 class="text-center font-normal text-3xl text-rains-lightest mb-3 uppercase text-shadow">
          {{ $t('index.end.heading') }}
        </h1>
        <p class="text-center">
          {{ $t('index.end.subheading') }}
        </p>
        <div class="flex justify-center">
          <nuxt-link
            :to="'#' + $t('anchors.contact-us')"
            class="no-underline mt-16 opacity-85 rounded text-xl lg:text-3xl text-grey-light px-8 lg:px-24 py-2 border border-grey-dark hover:border-grey hover:opacity-100 transition-opacity transition-border-color">
            {{ $t('index.end.cta') }}
          </nuxt-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  components: {
    InformationIcon: () => import('~/components/index/InformationIcon'),
    Quote: () => import('~/components/index/Quote'),
    ExpertiseCategory: () => import('~/components/index/ExpertiseCategory')
  },
  data () {
    return {
      currentSloganIndex: 0,
      currentQuoteIndex: 0,
      showIcons: false
    }
  },
  computed: {
    slogans () {
      return this.$t('index.hero.slogans')
    },
    currentSlogan () {
      return this.slogans[this.currentSloganIndex]
    },
    quotes () {
      return this.$t('index.quotes')
    },
    currentQuote () {
      return this.quotes[this.currentQuoteIndex]
    }
  },
  mounted () {
    setInterval(this.nextSlogan, 7.5 * 1000)
    setInterval(this.nextQuote, 7.5 * 1000)
  },
  methods: {
    nextSlogan () {
      this.currentSloganIndex = (this.currentSloganIndex + 1) % this.slogans.length
    },
    nextQuote () {
      this.currentQuoteIndex = (this.currentQuoteIndex + 1) % this.quotes.length
    },
    visibilityChanged (visible) {
      if (visible) {
        this.showIcons = true
      }
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

<style lang="scss">
  .bg-gradient-rains-rains-dark {
    background-image: linear-gradient(to right, config('colors.rains'), config('colors.rains-dark'));
  }

  .bg-hero {
    background-size: cover;
    background-image: linear-gradient(config('colors.rains-dark'), rgba(11, 7, 16, 0.65)), url("~/assets/img/bg/hero_sm.jpg");

    @screen md {
      background-image: linear-gradient(config('colors.rains-dark'), rgba(11, 7, 16, 0.65)), url("~/assets/img/bg/hero.jpg");
    }
  }

  .bg-cta-end {
    background-size: cover;
    background-image: linear-gradient(rgba(9, 0, 16, 0.25), rgba(11, 7, 16, 1)), url("~/assets/img/bg/contact_sm.jpg");

    @screen md {
      background-image: linear-gradient(rgba(9, 0, 16, 0.25), rgba(11, 7, 16, 1)), url("~/assets/img/bg/contact.jpg");
      background-position: bottom;
    }
  }

  .bg-footer {
    background-image: linear-gradient(rgba(9, 0, 16, 1), rgba(11, 7, 16, 0.97));
    background-size: cover;
  }
</style>
