<template>
  <div>
    <section class="min-h-750 bg-about-us flex flex-col justify-center items-center">
      <h1 class="text-center text-6xl font-normal text-rains-lighter capitalize mt-32">
        {{ $t('about.heading') }}
      </h1>
      <h2 class="font-normal text-center text-rains-lighter text-3xl w-4/5">
        {{ $t('about.subheading') }}
      </h2>
    </section>
    <section class="w-4/5 mx-auto my-24 bg-rains-light lg:flex">
      <team-member
        v-for="(member, i) in $options.members"
        :key="i"
        :slug="member.slug"
        :name="member.name"
        :links="member.links"
        :odd="!!(i%2)"/>
    </section>
  </div>
</template>

<script>
import { deterministicRotate, seoCreator } from '~/shared/helpers'

export default {
  components: {
    TeamMember: () => import('~/components/about-us/TeamMember')
  },
  members: deterministicRotate([
    {
      slug: 'alex',
      name: 'Alexander Lichter',
      links: {
        web: 'https://lichter.io/',
        twitter: 'https://twitter.com/TheAlexLichter',
        github: 'https://github.com/manniL/',
        linkedin: 'https://www.linkedin.com/in/alexanderlichter'
      }
    },
    {
      slug: 'max',
      name: 'Max Langer',
      links: {
        twitter: 'https://twitter.com/mangerlahn',
        github: 'https://github.com/mangerlahn/',
        linkedin: 'https://www.linkedin.com/in/max-langer-17b133136/'
      }
    }
  ]),
  head () {
    return seoCreator('about', this, [{
      name: 'og:image',
      content: require('~/assets/img/bg/about-us.jpg')
    }])
  }
}
</script>
