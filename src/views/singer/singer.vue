<template>
  <div>
    硌手页面
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
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
</style>