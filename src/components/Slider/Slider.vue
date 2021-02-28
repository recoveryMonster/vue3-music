
<template>
  <div
    class="slider"
    ref="slider"
  >
    <div
      class="slider-group"
      ref="sliderGroup"
    >
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span
        v-for="(dot, index) in dots"
        :key="`dots${index}`"
        class="dot"
        :class="{'active': currentPageIndex === index}"
      ></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { onMounted, ref, reactive, onUnmounted, onActivated, onDeactivated } from 'vue'
import { addClass } from '@/utils/dom.js'
export default {
  name: 'Slider',
  props: {
    loop: {
      type: Boolean,
      default: true,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 4000,
    }
  },
  setup (props) {
    const sliderGroup = ref(null)
    const slider = ref(null)
    let children = reactive([]);
    let dots = ref(null)
    const currentPageIndex = ref(0)
    let scrollSlider = reactive({})
    const timer = ref(null)

    const setSliderWith = (isResize) => {
      children = sliderGroup.value.children
      let width = 0
      let sliderWidth = slider.value.clientWidth
      children?.forEach(child => {
        addClass(child, 'slide-page')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      })

      if (props.loop && !isResize) {
        width += 2 * sliderWidth
      }
      sliderGroup.value.style.width = width + 'px'
    }

    const initSlider = () => {
      scrollSlider = new BScroll(slider.value, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        slide: {
          loop: props.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      scrollSlider.on('scrollEnd', () => {
        let pageIndex = scrollSlider.getCurrentPage().pageX
        currentPageIndex.value = pageIndex

        if (props.autoPlay) {
          handlePlay()
        }
      })
    }

    const initDots = () => dots.value = new Array(children.length)

    const handlePlay = () => {
      clearTimeout(timer.value)
      timer.value = setTimeout(() => {
        scrollSlider.next()
      }, props.interval)
    }

    const handleResize = () => {
      window.addEventListener('resize', () => {
        // BScroll 还未实例化
        if (!scrollSlider.refresh) {
          return
        }
        setSliderWith(true);
        scrollSlider?.refresh()
      })
    }
    onMounted(() => {
      setSliderWith();
      initDots();
      initSlider();

      if (props.autoPlay) {
        handlePlay()
      }

      handleResize()
    })

    onActivated(() => {
      if (props.autoPlay) {
        handlePlay()
      }
    })
    onDeactivated(() => { clearTimeout(timer.value) })
    onUnmounted(() => {
      clearTimeout(timer.value)
    })
    return {
      slider,
      sliderGroup,
      dots,
      currentPageIndex,
    }
  },
}
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
  }
  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 12px;
    text-align: center;
    font-size: 0;
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>