<template>
  <div class="singer-detail_wrapper">
    {{JSON.stringify(songList)}}
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
export default {
  name: 'SingerDetail',
  setup () {
    const store = useStore()
    const router = useRouter()

    const songList = computed(() => store.getters['singer/songList'])
    const selectedSinger = computed(() => store.state.singer.selectedSinger)
    onMounted(() => {
      const singerId = selectedSinger.value?.id
      if (!singerId) {
        router.push('/singer')
        return
      }
      store.dispatch('singer/getSingerDetail', singerId)
    })
    return {
      selectedSinger,
      songList
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-detail_wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-background;
}
</style>