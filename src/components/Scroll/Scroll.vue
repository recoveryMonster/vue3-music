<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const wrapper = ref(null);
    const scroll = ref(null);

    const initScroll = () => {
      if (!wrapper.value) {
        return
      }
      scroll.value = new BScroll(wrapper.value, {
        probeType: props.probeType,
        click: props.click,
        bounce: true,
        mouseWheel: true,
      })
      if (props.listenScroll) {
        scroll.value.on('scroll', pos => {
          emit('scroll', pos.y)
        })
      }
    }
    const disable = () => {
      scroll.value && scroll.value.disable()
    }
    const enable = () => {
      scroll.value && scroll.value.enable()
    }
    const refresh = () => {
      scroll.value && scroll.value.refresh()
    }
    const scrollTo = () => {
      scroll.value && scroll.value.scrollTo.apply(scroll.value, arguments)
    }
    const scrollToElement = function () {
      scroll.value && scroll.value.scrollToElement.apply(scroll.value, arguments)
    }

    onMounted(() => {
      initScroll()
    })

    watchEffect(() => {
      if (props.data && scroll.value) {
        refresh()
      }
    })
    return {
      disable,
      enable,
      refresh,
      scroll,
      wrapper,
      scrollTo,
      scrollToElement
    }
  }
}
</script>

<style lang="scss" scoped>
</style>