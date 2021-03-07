<template>
  <div id="music-app">
    <template v-if="routes.name!=='404'">
      <MHeader></MHeader>
      <Tab></Tab>
    </template>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <Player></Player>
  </div>
</template>

<script>
import MHeader from 'components/MHeader/index.vue'
import Tab from 'views/tab/tab'
import Player from 'views/player/player.vue'
import { useRoute } from 'vue-router'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab,
    Player
  },
  setup () {
    const routes = useRoute()
    return {
      routes
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  background-color: $color-background;
}
</style>
