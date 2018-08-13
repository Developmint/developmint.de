<template>
  <div
    v-scroll="handleScroll"
    class="fixed w-full z-10">
    <consent/>
    <nav
      :class="navClasses"
      class="w-full flex items-center justify-between flex-wrap lg:flex-no-wrap lg:p-6 pb-0 lg:pb-0 pin-t transition-all-300">
      <div
        :class="subNavClasses"
        class="container mx-2 md:mx-auto p-4 lg:px-8 flex flex-wrap justify-between items-center transition-padding">
        <nuxt-link
          :to="localePath('index')"
          class="lg:mr-8"
          @click.native="isUncollapsed = false">
          <img
            src="~/assets/img/logo.png"
            class="w-48 xl:w-64 h-auto"
            alt="Developmint Logo">
        </nuxt-link>
        <div class="block lg:hidden mt-1">
          <button
            class="flex items-center lg:items-start px-3 py-2 border rounded text-white border-white hover:text-developmint-lighter hover:border-b hover:border-developmint-lighter"
            @click="toggleVisibility">
            <svg
              class="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
        <div
          :class="{'hidden': !isUncollapsed, 'flex': isUncollapsed}"
          class="mt-2 lg:mt-0 w-full flex-col lg:flex lg:flex-row lg:w-auto lg:items-center justify-between text-white">
          <nuxt-link
            v-for="link in $options.links"
            :key="link"
            :to="localePath(link)"
            class="nav-link"
            @click.native="isUncollapsed = false">
            {{ $t(`nav.${link}`) }}
          </nuxt-link>
          <nuxt-link
            :to="'#' + $t('anchors.contact-us')"
            class="nav-link"
            @click.native="isUncollapsed = false">
            {{ $t('nav.contact-us') }}
          </nuxt-link>
          <nuxt-link
            v-for="(locale, index) in $i18n.locales"
            v-if="locale.code !== $i18n.locale"
            :key="index"
            :exact="true"
            :to="switchLocalePath(locale.code)"
            class="nav-link"
            @click.native="isUncollapsed = false">
            {{ locale.name }}
          </nuxt-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { lg } from '~/tailwind/screens'
import Consent from '~/components/Consent'

export default {
  components: { Consent },
  data () {
    return {
      isUncollapsed: false,
      scrollOffset: 0
    }
  },
  computed: {
    isUserScrolling () { return this.scrollOffset },
    navClasses () {
      return {
        'pt-2 lg:pt-2 bg-rains': this.isUserScrolling || this.isUncollapsed,
        'bg-transparent': !this.isUserScrolling
      }
    },
    subNavClasses () {
      return {
        'py-2 lg:py-2': this.isUserScrolling
      }
    }
  },
  mounted () {
    if (typeof window === 'undefined') {
      return
    }
    this.handleScroll()

    const resizeHandler = () => {
      if (this.isUncollapsed && (window.innerWidth >= Number(lg.slice(0, -2)))) {
        this.isUncollapsed = false
      }
    }

    window.addEventListener('resize', resizeHandler)
    this.$once('hook:destroyed', () => {
      window.removeEventListener('resize', resizeHandler)
    })
  },
  methods: {
    toggleVisibility () {
      this.isUncollapsed = !this.isUncollapsed
    },
    handleScroll () {
      this.scrollOffset = window.scrollY
    }
  },
  links: ['about', 'work']
}
</script>
