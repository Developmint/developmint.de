<template>
  <nav class="py-4 pin-b z-10 bg-footer text-xs text-grey-light border-t-2 border-rains">
    <div class="flex flex-col lg:flex-row justify-between items-center lg:items-start p-2 mx-8">
      <div class="flex flex-col lg:flex-row items-center">
        <div class="text-center leading-loose lg:text-left lg:leading-normal">
          <span>&copy; 2015 - {{ $options.currentYear }}
            <a
              href="/"
              class="no-underline text-developmint hover:text-developmint-light">Developmint GbR</a>
          </span>
          <span class="block md:inline"><span class="hidden lg:inline"> &bull;</span> Alexander Lichter & Max Langer</span>
          <span><span class="hidden lg:inline"> &bull;</span> Corotweg 15, 04289 Leipzig</span>
          <span class="hidden lg:inline"> &bull;&nbsp;</span>
        </div>
        <a
          class="flex items-center font-hairline mr-2 text-grey-light no-underline hover:text-white"
          href="https://github.com/Developmint/developmint.de"
          target="_blank"
          rel="noopener">
          <div>v{{ $options.version }}</div>
          <GitHubIcon class="block w-4 h-4 ml-1 fill-current"/>
        </a>
      </div>
      <div class="py-4 lg:hidden"/>
      <div class="flex items-center lg:inline">
        <nuxt-link
          v-for="link in $options.links"
          :key="link"
          :to="localePath(link)"
          class="text-grey-light no-underline hover:text-white ml-2 lg:ml-3">
          {{ $t(`footer.${link}`) }}
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>
<script>
import { version } from '~/package.json'

export default {
  components: {
    GitHubIcon: () => import('~/assets/img/icons/github.svg')
  },
  links: ['legal', 'privacy', 'disclaimer'],
  version,
  currentYear: (new Date()).getFullYear()
}
</script>
