<template>
  <div class="singer-detail_wrapper">
    <MusicList
      :songList="songList"
      :title="title"
      :bgImage="bgImage"
    ></MusicList>
  </div>
</template>

<script>
import MusicList from 'components/MusicList/MusicList.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
export default {
  name: 'SingerDetail',
  components: {
    MusicList
  },
  setup () {
    const store = useStore()
    const router = useRouter()

    const songList = computed(() => store.getters['singer/songList'])
    const selectedSinger = computed(() => store.state.singer.selectedSinger)
    const title = computed(() => selectedSinger.value?.name)
    const bgImage = computed(() => selectedSinger.value?.avatar)
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
      songList,
      title,
      bgImage
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