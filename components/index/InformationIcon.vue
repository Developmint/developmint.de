<template>
  <div class="flex flex-col flex-1 my-8 lg:mx-2 xl:mx-8 group transition-all p-4 md:p-8 rounded lg:hover:scale-1025">
    <slot />
    <h3 class="mt-3 text-lg text-center mb-4 group-hover:text-black transition-all" v-text="title" />

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="text-justify group-hover:text-black transition-all text-gray-800" v-html="content" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    content: {
      required: true,
      type: String
    }
  }
}
</script>
