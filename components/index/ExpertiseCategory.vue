<template>
  <div
    :class="{'lg:border-l pt-4 lg:pt-0 border-t border-developmint':!isFirst}"
    class="lg:mx-6 lg:w-1/3 leading-tight lg:border-t-0"
  >
    <div class="lg:ml-8 p-4">
      <h2 class="my-2 text-center font-normal" v-text="title" />
      <div class="lg:flex justify-center">
        <ul class="list-reset">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <li v-for="(item, index) in listItems" :key="index" class="my-4 text-center" v-html="item" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isFirst: {
      type: Boolean,
      default: false
    },
    title: {
      required: true,
      type: String
    },
    listItems: {
      required: true,
      type: Array
    }
  }
}
</script>
