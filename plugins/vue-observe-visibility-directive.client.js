import Vue from 'vue'
import { ObserveVisibility } from 'vue-observe-visibility'

export default async function () {
  if (!('IntersectionObserver' in window)) {
    await import('intersection-observer')
  }
  Vue.directive('observe-visibility', ObserveVisibility)
}
