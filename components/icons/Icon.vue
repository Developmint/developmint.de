<template>
  <svg
    :viewBox="viewBox"
    xmlns="http://www.w3.org/2000/svg">
    <path :d="path"/>
  </svg>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },
    viewBox: {
      type: String,
      default: '0 100 1792 1792'
    }
  }
}
</script>
