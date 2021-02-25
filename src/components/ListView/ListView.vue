<template>
  <Scroll
    :data="data"
    class="list-view_wrapper"
    ref="listView"
  >
    <ul>
      <li
        v-for="group in data"
        :key="group.title.slice(0,1)"
        class="list-group"
        :ref="setListGroup"
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
    <div
      class="lsist-shortcut"
      @touchstart="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li
          v-for="(shortcut, index) in shortcutList"
          :key="shortcut"
          class='item'
          :data-index="index"
        >
          {{shortcut}}
        </li>
      </ul>
    </div>
  </Scroll>
</template>

<script>
import { computed, ref } from 'vue'
import Scroll from 'components/Scroll/Scroll.vue'
import { getData } from '@/utils/dom'
const ANCHOR_HEIGHT = 18
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
  setup (props) {
    const listView = ref(null)
    const listGroup = []
    const touch = {}
    const shortcutList = computed(() => {
      return props.data.map(group => group?.title?.slice(0, 1))
    })

    const setListGroup = el => listGroup.push(el)

    const onShortcutTouchStart = (e) => {
      const anchorIndex = getData(e.target, 'index')
      const firstTouch = e.touches[0]
      const y1 = firstTouch.pageY
      touch.anchorIndex = anchorIndex
      touch.y1 = y1
      scrollToELement(anchorIndex)
    }
    const onShortcutTouchMove = (e) => {
      const y2 = e.touches[0].pageY
      touch.y2 = y2
      const diff = Math.floor((touch.y2 - touch.y1) / ANCHOR_HEIGHT)
      const anchorIndex = parseInt(touch.anchorIndex) + diff
      scrollToELement(anchorIndex)
    }
    const scrollToELement = (index) => {
      listView.value && listView.value.scrollToElement(listGroup[index], 0, false, false)
    }
    return {
      listView,
      shortcutList,
      setListGroup,
      onShortcutTouchStart,
      onShortcutTouchMove,
    }
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

  .lsist-shortcut {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    text-align: center;
    background: $color-background-d;
    font-family: Helvetica;
    .item {
      padding: 3px;
      line-height: 1;
      color: $color-text-l;
      font-size: $font-size-small;
    }
  }
}
</style>