<template>
  <Scroll
    :data="data"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="handleScroll"
    class="list-view_wrapper"
    ref="listView"
  >
    <ul>
      <li
        v-for="(group, idx) in data"
        :key="group.title.slice(0,1)"
        class="list-group"
        :ref="el => listGroup[idx] = el"
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
      @touchstart.stop.prevent="onShortcutTouchStart"
      @touchmove.stop.prevent="onShortcutTouchMove"
    >
      <ul>
        <li
          v-for="(shortcut, index) in shortcutList"
          :key="shortcut"
          class='item'
          :class="{'current': currentIndex === index}"
          :data-index="index"
        >
          {{shortcut}}
        </li>
      </ul>
    </div>
    <div
      class="list-fixed"
      ref="listFixed"
      v-show="fixedTitle"
    >
      <div class="fixed-title">{{fixedTitle}}</div>
    </div>
    <div
      class="loading-wrapper"
      v-if="!data.length"
    >
      <Loading></Loading>
    </div>
  </Scroll>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import Scroll from 'components/Scroll/Scroll.vue'
import Loading from 'components/Loading/Loading.vue'
import { getData } from '@/utils/dom'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
export default {
  name: 'ListView',
  components: {
    Scroll,
    Loading
  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  setup (props) {
    let fixedTop = null;
    const listenScroll = true
    const probeType = 3
    const touch = {}
    const listView = ref(null)
    const listFixed = ref(null)
    const listGroup = ref([])
    const scrollY = ref(0)
    const currentIndex = ref(0)
    const diff = ref(0)
    const shortcutList = computed(() => {
      return props.data.map(group => group?.title?.slice(0, 1))
    })

    const listHeight = computed(() => {
      const heights = []
      let height = 0
      heights.push(height)
      listGroup.value.forEach(list => {
        height += list.offsetHeight
        heights.push(height)
      })
      return heights
    })

    const fixedTitle = computed(() => {
      if (scrollY.value > 0) return ''
      return props.data[currentIndex.value]?.title || ''
    })

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
      if (!index && index !== 0) return;
      if (index < 0) {
        index = 0
      } else if (index > listHeight.value.length - 2) {
        index = listHeight.value.length - 2
      }
      listView.value && listView.value.scrollToElement(listGroup.value[index], 0, false, false)
    }

    const handleScroll = posY => {
      scrollY.value = posY
    }

    const getCurrentIndex = (posY) => {
      // 滚动到顶部
      if (posY > 0) {
        currentIndex.value = 0
        return
      }
      // 在中间滚动，listheight的长度比列表长度多1
      for (let i = 0; i < listHeight.value.length - 1; i++) {
        const height1 = listHeight.value[i]
        const height2 = listHeight.value[i + 1]
        if (-posY >= height1 && -posY < height2) {
          diff.value = height2 + posY
          currentIndex.value = i
          return
        }
      }
      // 滚动到底部
      currentIndex.value = listHeight.value.length - 2
    }

    watch(scrollY, (newVal) => {
      getCurrentIndex(newVal)
    })

    watch(diff, (newDiff) => {
      let offsetTop = newDiff > 0 && newDiff < TITLE_HEIGHT ? newDiff - TITLE_HEIGHT : 0
      if (fixedTop === offsetTop) {
        return
      }
      fixedTop = offsetTop
      if (listFixed.value) {
        listFixed.value.style.transform = `translate3d(0, ${offsetTop}px, 0)`;
      }
    })
    watch(listView, () => {
      nextTick(() => listView.value && listView.value.refresh())
    })
    return {
      listenScroll,
      listView,
      listFixed,
      shortcutList,
      onShortcutTouchStart,
      onShortcutTouchMove,
      handleScroll,
      probeType,
      currentIndex,
      listGroup,
      fixedTitle,
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
      &.current {
        color: $color-theme;
      }
    }
  }

  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background-color: $color-highlight-background;
    }
  }

  .loading-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>