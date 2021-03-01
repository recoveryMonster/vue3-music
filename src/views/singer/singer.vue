<template>
  <div class="singer-page">
    <ListView
      :data="singerList"
      @selectedSinger="selectedSinger"
    ></ListView>
    <router-view v-slot="{ Component }">
      <transition name="slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ListView from 'components/ListView/ListView.vue'
export default {
  components: {
    ListView
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    store.dispatch('singer/getSingerList')

    const singerList = computed(() => store.state.singer.singerList)

    const selectedSinger = (singer) => router.push({ path: `/singer/${singer.id}` })

    return {
      singerList,
      selectedSinger,
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-page {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>