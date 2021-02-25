<template>
  <Scroll
    :data="data"
    class="list-view_wrapper"
  >
    <ul>
      <li
        v-for="group in data"
        :key="group.title.slice(0,1)"
        class="list-group"
      >
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li
            v-for="singer in group.list"
            :key="singer.id"
            class="list-group-item"
          >
            <img
              class="avatar"
              v-lazy="singer.avatar"
              alt="avatar"
            >
            <span class="name">{{singer.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Scroll>
</template>

<script>
import Scroll from 'components/Scroll/Scroll.vue';
export default {
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  setup () {

    return {}
  }
}
</script>

<style lang="scss" scoped>
.list-view_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: $color-background;
  .list-group {
    padding-bottom: 30px;
    .list-group-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background-color: $color-highlight-background;
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: $color-text-l;
        font-size: $font-size-medium;
      }
    }
  }
}
</style>