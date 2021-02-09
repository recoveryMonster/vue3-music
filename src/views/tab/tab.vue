<template>
  <div class="tab">
    <router-link
      v-for="info in linkInfo"
      :key="info.to"
      :to="info.to"
      class="tab-item"
    >
      <span class="tab-link">{{info.text}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  setup () {
    const linkInfo = [
      {
        text: '推荐',
        to: '/recommend'
      },
      {
        text: '歌手',
        to: '/singer'
      },
      {
        text: '排行',
        to: 'rank'
      },
      {
        text: '搜索',
        to: 'search'
      }
    ]

    return {
      linkInfo
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  height: 44px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: $font-size-medium;
  .tab-link {
    padding-bottom: 5px;
    color: $color-text-l;
  }
  .router-link-active {
    .tab-link {
      color: $color-theme;
      border-bottom: 2px solid $color-theme;
    }
  }
}
</style>