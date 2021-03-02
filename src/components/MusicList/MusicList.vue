<template>
  <div class="music-lsit_wrapper">
    <div class="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div
      class="bg-image"
      :style="bgStyle"
    >

    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
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
    const bgStyle = computed(() => `background-image: url(${props.bgImage})`)

    return {
      bgStyle
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
}
</style>