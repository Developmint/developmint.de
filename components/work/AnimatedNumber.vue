<script>

import { tween } from 'shifty/src/tweenable'

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
      required: true
    },
    easing: {
      type: String,
      default: 'easeOutQuad'
    },
    shouldStart: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      number: null,
      state: 0
    }
  },
  watch: {
    shouldStart: {
      handler(newValue) {
        if (newValue) {
          this.start()
        }
      },
      immediate: true
    }
  },
  methods: {
    updateNumber(state) {
      this.number = Number(state.x).toLocaleString()
    },
    start() {
      if (this.state > 0) {
        return
      }
      this.state = 1
      const options = {
        from: { x: this.from, y: 0 },
        to: { x: this.to, y: 0 },
        duration: this.duration || 1,
        easing: this.easing,
        step: this.updateNumber
      }

      tween(options)
        .then(this.updateNumber)
        .then(() => {
          this.state = 0
        })
    }
  },
  render(h) {
    return h('span', this.number)
  }
}
</script>
