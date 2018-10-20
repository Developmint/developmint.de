<template>
  <div class="flex flex-col flex-1 my-8 lg:mx-2 xl:mx-8 group transition-all p-4 md:p-8 rounded lg:hover:scale-1025">
    <slot/>
    <h2 class="mt-3 text-lg text-center mb-4 group-hover:text-black transition-all">
      {{ title }}
    </h2>
    <div
      class="text-justify group-hover:text-black transition-all text-grey-darkest"
      v-html="content"/>
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
