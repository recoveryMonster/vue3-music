<template>
  <div
    class="player"
    v-show="playList.length"
  >
    <div
      class="normal-player"
      v-show="fullScreen"
    >
      全屏
    </div>
    <div
      class="mini-player"
      v-show="!fullScreen"
    >

    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup () {
    const store = useStore()

    const playList = computed(() => store.state.song.playList)
    const fullScreen = computed(() => store.state.song.fullScreen)

    return {
      playList,
      fullScreen
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-highlight-background;
  }
}
</style>