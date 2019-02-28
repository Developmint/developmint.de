<template>
  <div>
    <section class="min-h-screen md:min-h-750 bg-about-us flex flex-col justify-center items-center">
      <h1 class="text-center text-4xl md:text-6xl font-normal text-rains-lighter capitalize mt-16 md:mt-32 mb-4 md:mb-0">
        {{ $t('about.heading') }}
      </h1>
      <h2 class="font-normal text-center text-rains-lighter text-xl md:text-3xl w-4/5">
        {{ $t('about.subheading') }}
      </h2>
    </section>
    <section class="md:mx-16 my-24 bg-rains-light xl:flex">
      <TeamMember
        v-for="member in $options.members"
        :key="member.slug"
        v-bind="member"
        :odd="!!(i%2)"
      />
    </section>
  </div>
</template>

<script>
import { deterministicRotate } from '~/shared/helpers'
import TeamMember from '~/components/about-us/TeamMember'

export default {
  scrollToTop: true,
  components: {
    TeamMember
  },
  computed: {
    members() {
      return deterministicRotate([
        {
          slug: 'alex',
          name: 'Alexander Lichter',
          links: {
            web: 'https://lichter.io/?ref=developmint.de',
            twitter: 'https://twitter.com/TheAlexLichter',
            github: 'https://github.com/manniL/',
            linkedin: 'https://www.linkedin.com/in/alexanderlichter'
          }
        },
        {
          slug: 'max',
          name: 'Max Langer',
          links: {
            web: 'https://max.codes/?ref=developmint.de',
            twitter: 'https://twitter.com/mangerlahn',
            github: 'https://github.com/mangerlahn/',
            linkedin: 'https://www.linkedin.com/in/max-langer-17b133136/'
          }
        }
      ])
    },
    head() {
      return this.$createSeo('about', [{
        name: 'og:image',
        content: require('~/assets/img/bg/about-us.jpg')
      }])
    }
  }
}
</script>

<style lang="pcss">
  .bg-about-us {
    background-image: linear-gradient(rgba(11, 7, 16, 0.6), config('colors.rains-dark')), url("~assets/img/bg/about-us_sm.jpg");
    background-size: cover;
    background-position: top;

    @screen md {
      background-image: linear-gradient(rgba(11, 7, 16, .6), rgba(11, 7, 16, .6) 80%, config('colors.rains-dark')), url("~assets/img/bg/about-us.jpg");
      background-position: top;
    }
  }
</style>
