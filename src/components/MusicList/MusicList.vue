<template>
  <div class="music-lsit_wrapper">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div
      class="bg-image"
      :style="bgStyle"
      ref="bgImageRef"
    >
      <div
        class="filter"
        ref="filterRef"
      ></div>
    </div>
    <div
      class="bg-layer"
      ref='bgLayer'
    ></div>
    <Scroll
      :probeType="probeType"
      :listenScroll="listenScroll"
      @scroll="handleScroll"
      :data="songList"
      ref="listScroll"
      class="list"
    >
      <div class="song_wrapper">
        <SongList :songList="songList"></SongList>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { computed, ref, onMounted, nextTick, watch } from 'vue'
import Scroll from '../Scroll/Scroll.vue'
import SongList from '../SongList/SongList.vue'
const RESERVED_HEIGHT = 40
export default {
  components: {
    Scroll,
    SongList,
  },
  props: {
    songList: {
      type: Array,
      default: () => ([]),
    },
    title: {
      type: String,
      default: "",
    },
    bgImage: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const probeType = 3
    const listenScroll = true
    const bgImageRef = ref(null)
    const listScroll = ref(null)
    const bgLayer = ref(null)
    const filterRef = ref(null)
    const scrollY = ref(0)
    const imageHeight = ref(0)
    let minTranslateY = 0
    const bgStyle = computed(() => `background-image: url(${props.bgImage})`)

    const handleScroll = pos => {
      scrollY.value = pos.y
    }

    watch(scrollY, (newVal) => {
      const translateY = Math.max(minTranslateY, newVal)
      const percent = Math.abs(newVal / imageHeight.value)
      let zIndex = 0
      let scale = 1
      let blur = 0
      if (newVal > 0) {
        zIndex = 10
        scale = 1 + percent
      } else {
        blur = Math.min(20, 20 * percent)
      }
      bgLayer.value.style.transform = `translateY(${translateY}px)`
      filterRef.value.style.backdrop = `blur(${blur}px)`
      const bgImageStyle = bgImageRef.value.style
      if (newVal < minTranslateY) {
        zIndex = 10
        bgImageStyle.paddingTop = 0
        bgImageStyle.height = `${RESERVED_HEIGHT}px`
      } else {
        bgImageStyle.paddingTop = '70%'
        bgImageStyle.height = 0
      }
      bgImageStyle.transform = `scale(${scale})`
      bgImageStyle.zIndex = zIndex
    })
    watch(listScroll, () => nextTick(() => {
      listScroll.value?.refresh()
    }))
    onMounted(() => {
      imageHeight.value = bgImageRef.value?.clientHeight;
      minTranslateY = -imageHeight.value + RESERVED_HEIGHT
      listScroll.value && (listScroll.value.$el.style.top = `${imageHeight.value}px`)
    })

    return {
      bgStyle,
      bgImageRef,
      filterRef,
      listScroll,
      bgLayer,
      probeType,
      listenScroll,
      handleScroll
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/mixin.scss';
.music-lsit_wrapper {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    @include no-wrap;
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .song_wrapper {
      padding: 20px 30px;
    }
  }
  .bg-layer {
    position: relative;
    height: 100%;
    background: $color-background;
  }
}
</style>