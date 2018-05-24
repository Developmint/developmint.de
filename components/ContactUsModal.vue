<template>
  <div class="fixed pin-t w-full h-screen bg-rains-trans z-20 overflow-hidden md:overflow-y-scroll text-white p-4 lg:p-8 lg:pt-0 xl:p-16 text-2xl lg:text-3xl transition-all">
    <button
      class="close-button"
      @click="$emit('close')"/>
    <div class="m-4 mt-0 lg:m-16 xl:m-32 mx-auto flex flex-col items-center justify-center">
      <h2 class="text-white xl:text-5xl text-center lg:text-left capitalize font-normal mb-2 lg:mb-4 xl:mb-8">
        {{ $t('contact.heading') }}
      </h2>
      <form
        v-show="!isSubmitted"
        class=" w-5/6 lg:w-2/3 xl:w-1/3 mx-auto flex flex-col items-center text-sm"
        @submit.prevent="validate">
        <div
          :class="{'shadow-white': focusedElement === 'name', 'shadow-red': $v.name.$error}"
          class="bg-grey-lighter inline-flex rounded items-center px-4 border-white transition-all w-full my-2">
          <label
            for="name"
            class="text-developmint-darker whitespace-no-wrap">Name</label>
          <input
            id="name"
            v-model.trim="name"
            class="appearance-none bg-transparent py-4 px-2 mx-2 md:mx-0 md:px-8 w-5/6 md:w-full text-developmint-darkest"
            type="text"
            @input="$v.name.$touch()"
            @focus="focusedElement = 'name'"
            @blur="foucsedElement = ''">
        </div>
        <span
          v-show="$v.name.$error"
          class="text-sm self-start ml-2 mb-4 text-red-light">Please type a valid name</span>
        <div
          :class="{'shadow-white': focusedElement === 'email', 'shadow-red': $v.email.$error}"
          class="bg-grey-lighter inline-flex rounded items-center px-4 border-white transition-all w-full my-2">
          <label
            for="email"
            class="text-developmint-darker whitespace-no-wrap">E-Mail</label>
          <input
            id="email"
            v-model.trim="email"
            class="appearance-none bg-transparent py-4 px-2 mx-2 md:mx-0 md:px-8 w-5/6 md:w-full text-developmint-darkest"
            type="email"
            @input="$v.email.$touch()"
            @focus="focusedElement = 'email'"
            @blur="foucsedElement = ''">
        </div>
        <span
          v-show="$v.email.$error"
          class="text-sm self-start ml-2 mb-4 text-red-light">Please insert a valid E-Mail</span>
        <div
          :class="{'shadow-white': focusedElement === 'msg', 'shadow-red': $v.msg.$error}"
          class="bg-grey-lighter inline-flex flex-col rounded px-4 border-white transition-all w-full my-2">
          <label
            for="msg"
            class="py-4 text-developmint-darker">{{ $t('contact.fields.tell') }}</label>
          <textarea
            id="msg"
            v-model.trim="msg"
            class="appearance-none bg-transparent text-developmint-darkest resize-none"
            rows="6"
            @input="$v.msg.$touch()"
            @focus="focusedElement='msg'"
            @blur="foucsedElement = ''"/>
        </div>
        <span
          v-show="$v.msg.$error"
          class="text-sm self-start ml-2 mb-4 text-red-light">Please provide a valid message with at least 25 characters</span>
        <div class="flex justify-between lg:block lg:ml-auto">
          <button
            class="lg:hidden mr-4 mt-4 rounded hover:border-yellow transition-all hover:text-yellow px-6 py-3 border border-yellow-dark text-grey-light"
            @click.prevent="$emit('close')">
            {{ $t('contact.buttons.back') }}
          </button>
          <button
            :class="submitButtonClasses"
            :disabled="disableSubmission"
            type="submit">
            {{ $t('contact.buttons.submit') }}
          </button>
        </div>
      </form>
      <div
        v-show="isSubmitted"
        class="text-2xl text-developmint">
        Thanks for your submission!
      </div>
      <div
        v-if="error"
        class="text-2xl text-red-dark">
        An error occurred!
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate/src/index'
import { email, minLength, required } from 'vuelidate/src/validators'

export default {
  mixins: [validationMixin],
  data () {
    return {
      focusedElement: '',
      name: '',
      email: '',
      msg: '',
      submitting: false,
      isSubmitted: false,
      error: false
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    email: {
      required,
      email
    },
    msg: {
      required,
      minLength: minLength(25)
    }
  },
  computed: {
    empty () {
      const keys = ['name', 'email', 'msg']

      return keys.map(k => this[k]).some(v => !v)
    },
    disableSubmission () {
      return this.empty || this.$v.$error || this.submitting
    },
    submitButtonClasses () {
      const baseClasses = 'ml-4 mt-4 px-6 py-3 rounded transition-all border text-grey-light'
      const additionalClasses = this.disableSubmission
        ? 'opacity-50 cursor-not-allowed border-grey-light'
        : 'hover:bg-gradient-rains-dark-rains border-developmint-light hover:border-developmint'

      return `${baseClasses} ${additionalClasses}`
    }
  },
  mounted () {
    window.addEventListener('keyup', this.onKeyUp)
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.onKeyUp)
  },
  methods: {
    onKeyUp (event) {
      if (event.keyCode === 27) {
        this.$emit('close')
      }
    },
    validate () {
      if (this.disableSubmission) {
        return
      }
      this.submitForm()
    },
    async submitForm () {
      this.submitting = true
      this.$ga.event('submit', 'form', this.$i18n.locale)
      this.error = false
      try {
        await this.$axios.$post('', {
          name: this.name,
          email: this.email,
          msg: this.msg
        })
        this.submitting = false
        this.isSubmitted = true
        await new Promise(resolve => setTimeout(resolve, 2500))
        this.$emit('close')
      } catch (e) {
        this.submitting = false
        this.error = true
        console.error(e)
      }
    }
  }
}
</script>
