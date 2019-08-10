<template>
  <section class="bg-404 flex">
    <div class="text-center text-rains-lighter capitalize mt-32 container mx-auto flex flex-col items-center">
      <h1 class="my-2 mt-32">
        Nothing to see here!
      </h1>
      <p class="leading-loose mt-4">
        Looks like you took a wrong path!
      </p>
      <NuxtLink
        to="/"
        class="text-rains-lighter my-4"
      >
        Get back
      </NuxtLink>
      <img
        class="mt-8 rounded"
        src="https://thecatapi.com/api/images/get?format=src&type=gif"
      >
    </div>
    <div class="block h-screen" />
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

<style lang="postcss">
  .bg-404 {
    background-image: linear-gradient(config('colors.rains-dark'), rgba(11, 7, 35, 0.65)), url("~assets/img/bg/404.jpg");
    background-size: cover;
    background-position: center;
  }
</style>
