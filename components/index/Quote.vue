<template>
  <div class="transition-all mt-3 opacity-75">
    <transition
      name="slide-fade"
      appear
      mode="out-in">
      <div class="text-center animated">
        <div class="italic text-lg md:text-xl text-center">"{{ quote }}"</div>
        <div class="text-center italic text-xs md:text-sm mt-2">— {{ person }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    quote: {
      required: true,
      type: String
    },
    person: {
      required: true,
      type: String
    }
  }
}
</script>
