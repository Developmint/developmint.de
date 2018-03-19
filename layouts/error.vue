<template>
  <section class="bg-404 flex">
    <div class="text-center text-rains-lighter capitalize mt-32 container mx-auto flex flex-col items-center">
      <h1 class="my-2 mt-32">Nothing to see here!</h1>
      <p class="leading-loose mt-4">Looks like you took a wrong path!</p>
      <nuxt-link
        to="/"
        class="text-rains-lighter my-4">
        Get back
      </nuxt-link>
      <img
        class="mt-8 rounded"
        src="https://thecatapi.com/api/images/get?format=src&type=gif">
    </div>
    <div class="block h-screen"/>
  </section>
</template>

<script>
export default {
  head () {
    return {
      title: '404 - There is no software here!'
    }
  }
}
</script>
