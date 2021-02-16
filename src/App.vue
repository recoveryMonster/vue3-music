<template>
  <div id="music-app">
    <template v-if="routes.name!=='404'">
      <MHeader></MHeader>
      <Tab></Tab>
    </template>
    <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'components/MHeader/index.vue'
import Tab from 'views/tab/tab'
import { useRoute } from 'vue-router'
export default {
  name: 'App',
  components: {
    MHeader,
    Tab
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
