<template>
  <div class="singer-detail_wrapper">
    <MusicList
      :songList="canPlayList"
      :title="title"
      :bgImage="bgImage"
    ></MusicList>
  </div>
</template>

<script>
import { processSongsUrl } from '@/utils/song'
import MusicList from 'components/MusicList/MusicList.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
export default {
  name: 'SingerDetail',
  components: {
    MusicList
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    let canPlayList = ref([])

    const songList = computed(() => store.getters['singer/songList'])
    const selectedSinger = computed(() => store.state.singer.selectedSinger)
    const title = computed(() => selectedSinger.value?.name)
    const bgImage = computed(() => selectedSinger.value?.avatar)

    watch(songList, (newList) => {
      processSongsUrl(newList)
        .then(res => canPlayList.value = res)
        .catch(err => console.log(err))
    })
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
      canPlayList,
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