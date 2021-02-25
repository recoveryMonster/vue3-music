<template>
  <div class="singer-page">
    <ListView :data="singerList"></ListView>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import ListView from 'components/ListView/ListView.vue'
export default {
  components: {
    ListView
  },
  setup () {
    const store = useStore()
    store.dispatch('singer/getSingerList')

    const singerList = computed(() => store.state.singer.singerList)

    return {
      singerList
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
</style>