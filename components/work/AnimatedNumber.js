import { tween } from 'shifty/src/tweenable'
import { ref, watch, createElement as h } from '@vue/composition-api'

export default {
  props: {
    from: {
      type: Number,
      default: 0
    },
    to: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true,
      validator: value => value > 0
    },
    easing: {
      type: String,
      default: 'easeOutQuad'
    },
    precision: {
      type: Number,
      default: 3
    },
    shouldStart: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    const number = ref('0')
    const isRunning = ref(false)
    const updateNumber = (tweenState) => {
      number.value = Number(tweenState.x).toFixed(props.precision).toLocaleString()
    }

    const startAnimation = async () => {
      if (isRunning.value) {
        return
      }

      isRunning.value = true

      const options = {
        from: { x: props.from, y: 0 },
        to: { x: props.to, y: 0 },
        duration: props.duration,
        easing: props.easing,
        step: updateNumber
      }

      await tween(options)

      number.value = Number(number.value).toLocaleString()
      isRunning.value = false
    }

    watch(() => props.shouldStart,
      () => {
        if (!props.shouldStart) {
          return
        }
        startAnimation()
      })

    return () => h('span', number.value)
  }
}
