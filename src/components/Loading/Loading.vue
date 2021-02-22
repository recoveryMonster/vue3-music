<template>
  <div class="loading">
    <img
      width="24"
      height="24"
      :src="require('assets/image/loading.gif')"
    >
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "努力加载中...",
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  text-align: center;
  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $color-text-l;
  }
}
</style>