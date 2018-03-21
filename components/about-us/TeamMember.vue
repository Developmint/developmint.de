<template>
  <div class="flex flex-col items-center my-24 mx-2 lg:m-8 lg:my-16 xl:my-0 lg:mx-16">
    <div class="w-full flex flex-col lg:flex-row items-center mb-4">
      <div class="my-4 flex-no-shrink">
        <img
          :src="require(`~/assets/img/about/${slug}.jpg`)"
          :srcset="`${require(`~/assets/img/about/${slug}@2x.jpg`)} 2x`"
          :alt="name"
          class="rounded-full border-4 border-solid border-grey-light shadow-lg"
          width="192"
          height="192">
      </div>
      <div class="w-full lg:ml-8">
        <h2
          class="text-3xl py-3 border-b border-developmint text-center lg:text-left font-normal"
          v-text="name"/>
        <div class="flex justify-around lg:justify-start mt-4">
          <a
            v-if="links.web"
            :href="links.web"
            class="no-underline group"
            @click="logClick('web')">
            <GlobeIcon class="block w-6 h-6 mx-3 text-grey-darker group-hover:text-developmint transition-all fill-current"/>
          </a>
          <a
            v-if="links.github"
            :href="links.github"
            class="no-underline group"
            @click="logClick('github')">
            <GitHubIcon class="block w-6 h-6 mx-3 text-grey-darker group-hover:text-black transition-all fill-current"/>
          </a>
          <a
            v-if="links.twitter"
            :href="links.twitter"
            class="no-underline group"
            @click="logClick('twitter')">
            <TwitterIcon class="block w-6 h-6 mx-3 text-grey-darker group-hover:text-blue-light transition-all fill-current"/>
          </a>
          <a
            v-if="links.linkedin"
            :href="links.linkedin"
            class="no-underline group"
            @click="logClick('linkedin')">
            <LinkedInIcon class="block w-6 h-6 mx-3 text-grey-darker group-hover:text-blue-dark transition-all fill-current"/>
          </a>
        </div>
      </div>
    </div>
    <div
      class="flex-grow text-justify leading-normal px-2"
      v-html="$t(`about.${slug}`)"/>
  </div>
</template>

<script>
import GitHubIcon from '../icons/GitHubIcon'
import GlobeIcon from '../icons/GlobeIcon'
import TwitterIcon from '../icons/TwitterIcon'
import LinkedInIcon from '../icons/LinkedInIcon'

export default {
  components: {
    LinkedInIcon,
    TwitterIcon,
    GlobeIcon,
    GitHubIcon
  },
  props: {
    slug: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    links: {
      type: Object,
      default: () => ({})
    },
    odd: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    logClick (icon) {
      this.$ga.event({
        eventCategory: 'click',
        eventAction: `${this.name} - ${icon}`
      })
    }
  }
}
</script>
