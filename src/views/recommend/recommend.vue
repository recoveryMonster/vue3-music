<template>
  <div class="recommend">
    <div class="recommend-content">
      <div
        class="slider-wrapper"
        v-if="bannerList.length"
      >
        <div class="slider-content">
          <Slider>
            <div
              v-for="item in bannerList"
              :key="item.id"
            >
              <a :href="item.linkUrl">
                <img
                  :src="item.cover"
                  :alt="item.title"
                >
              </a>
            </div>
          </Slider>
        </div>
      </div>
      <div class="recommend-lis">
        <h1 class="list-title">热门歌单推荐</h1>

        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from 'components/Slider/Slider.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    Slider
  },
  setup () {
    const store = useStore()
    const bannerList = computed(() => store.state.recommend.bannerList)
    store.dispatch('recommend/getBannerList')
    store.dispatch('recommend/getDiscList')

    return {
      bannerList,
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  position: fixed;
  top: 88px;
  bottom: 0;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;
      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .slide-page {
          float: left;
          box-sizing: border-box;
          overflow: hidden;
          text-align: center;
          a {
            display: block;
            width: 100%;
            overflow: hidden;
            text-decoration: none;
          }
          img {
            display: block;
            width: 100%;
          }
        }
      }
    }
    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }
      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;
        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;
          .name {
            margin-bottom: 10px;
            color: $color-text;
          }
          .desc {
            color: $color-text-d;
          }
        }
      }
    }
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>