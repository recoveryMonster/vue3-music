<template>
  <div
    class="player"
    v-show="playList.length"
  >
    <transition
      name="normal"
      @enter="transitionEnter"
      @after-enter="transitionAfterEnter"
      @leave="transitionLeave"
      @after-leave="transitionAfterLeave"
    >
      <div
        class="normal-player"
        v-show="fullScreen"
      >
        <div class="background">
          <img
            alt="bg-image"
            :src="currentSong.image"
          >
        </div>
        <div class="top">
          <div
            class="back"
            @click="changeFullScreen(false)"
          >
            <i class="icon-back"></i>
          </div>
          <h1
            class="title"
            v-html="currentSong.name"
          ></h1>
          <h2
            class="subtitle"
            v-html="currentSong.singer"
          ></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div
              class="cd-wrapper"
              ref="cdWrapper"
            >
              <div class="cd">
                <img
                  :src="currentSong.image"
                  class="image"
                  :class="cdCls"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i class="icon-sequence"></i>
            </div>
            <div class="icon i-left">
              <i class="icon-prev"></i>
            </div>
            <div
              class="icon i-center"
              @click="handleTogglePlay"
            >
              <i :class="playIcon"></i>
            </div>
            <div class="icon i-right">
              <i class="icon-next"></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">

      <div
        class="mini-player"
        v-show="!fullScreen"
        @click="changeFullScreen(true)"
      >
        <div class="icon">
          <img
            swidth="40"
            height="40"
            :src="currentSong.image"
            :class="cdCls"
          >
        </div>
        <div class="text">
          <h2
            class="name"
            v-html="currentSong.name"
          ></h2>
          <p
            class="desc"
            v-html="currentSong.singer"
          ></p>
        </div>
        <div class="control">
          <i
            @click.stop="handleTogglePlay"
            :class="playIcon + '-mini'"
            class="icon-mini"
          ></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio
      ref="audioRef"
      :src="currentSong.url"
    ></audio>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, nextTick, ref, watch } from 'vue'
import { types } from '@/store/mutation-types'
import animations from 'create-keyframe-animation'
import { prefixStyle } from '@/utils/dom'
const transform = prefixStyle('transform')
export default {
  name: 'player',
  setup () {
    const store = useStore()
    const cdWrapper = ref(null)
    const audioRef = ref(null)

    const currentSong = computed(() => store.getters['song/currentSong'])
    const playList = computed(() => store.state.song.playList)
    const fullScreen = computed(() => store.state.song.fullScreen)
    const playingState = computed(() => store.state.song.playing)
    const playIcon = computed(() => !playingState.value ? 'icon-play' : 'icon-pause')
    const cdCls = computed(() => playingState.value ? 'play' : 'play pause')

    const changeFullScreen = (isFull) => store.commit(`song/${types.UPDATE_FULL_SCREEN}`, isFull)
    const changePlayingState = () => store.commit(`song/${types.UPDATE_PLAYING_STATE}`, !playingState.value)
    const transitionEnter = (el, done) => {
      const { x, y, scale } = getPosAndScale()
      const animation = {
        // 0%的时候，图片先缩小 显示在左下角
        0: {
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        },
        // 60% 的时候，回到原位 图片放大
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      // 注册动画
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
          easing: 'linear'
        }
      })
      // 运行动画
      animations.runAnimation(cdWrapper.value, 'move', done)
    }
    const transitionAfterEnter = () => {
      animations.unregisterAnimation('move')
      if (cdWrapper.value) {
        cdWrapper.value.style.animation = ''
      }
    }
    const transitionLeave = (el, done) => {
      if (cdWrapper.value) {
        cdWrapper.value.style.transition = 'all 0.4s'
        const { x, y, scale } = getPosAndScale()
        cdWrapper.value.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
        cdWrapper.value.addEventListener('transitionend', done)
      }
    }
    const transitionAfterLeave = () => {
      if (cdWrapper.value) {
        cdWrapper.value.style.animation = ''
        cdWrapper.value.style[transform] = ''
      }
    }
    const getPosAndScale = () => {
      const paddingBottom = 30
      const paddingTop = 80
      const paddingLeft = 40
      const targetWidth = 40
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingBottom - paddingTop - width / 2
      return {
        x,
        y,
        scale
      }
    }
    const handleTogglePlay = () => {
      changePlayingState()
      nextTick(() => {
        const audio = audioRef.value
        playingState.value ? audio.play() : audio.pause()
      })
    }

    watch(currentSong, () => {
      nextTick(() => audioRef.value && audioRef.value.play())
    })
    return {
      playList,
      fullScreen,
      currentSong,
      cdWrapper,
      audioRef,
      changeFullScreen,
      transitionEnter,
      transitionLeave,
      transitionAfterEnter,
      transitionAfterLeave,
      handleTogglePlay,
      playingState,
      playIcon,
      cdCls
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/mixin.scss';
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
        .icon-back {
          display: block;
          padding: 9px;
          font-size: $font-size-large-x;
          color: $color-theme;
          transform: rotate(-90deg);
        }
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap;
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            .play {
              animation: rotate 20s linear infinite;
            }
            .pause {
              animation-play-state: paused;
            }
            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              box-sizing: border-box;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
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
    .icon {
      flex: 0 0 40px;
      width: 40px;
      padding: 0 10px 0 20px;
      img {
        border-radius: 50%;
        &.play {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        @include no-wrap;
        font-size: $font-size-medium;
        color: $color-text;
      }
      .desc {
        @include no-wrap;
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      .icon-play-mini,
      .icon-pause-mini,
      .icon-playlist {
        font-size: 30px;
        color: $color-theme-d;
      }
      .icon-mini {
        font-size: 32px;
      }
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>