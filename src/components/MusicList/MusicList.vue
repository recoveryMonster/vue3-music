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
    </div>
    <Scroll
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
    const bgImageRef = ref(null)
    const listScroll = ref(null)
    const bgStyle = computed(() => `background-image: url(${props.bgImage})`)

    watch(listScroll, () => nextTick(() => {
      listScroll.value?.refresh()
    }))
    onMounted(() => {
      const imgHeight = bgImageRef.value?.clientHeight;
      listScroll.value && (listScroll.value.$el.style.top = `${imgHeight}px`)
    })

    return {
      bgStyle,
      bgImageRef,
      listScroll
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
  }
  .list {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: $color-background;
    overflow: hidden;
    .song_wrapper {
      padding: 20px 30px;
    }
  }
}
</style>