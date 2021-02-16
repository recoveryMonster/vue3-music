import { getRecommend } from '@/api/recommend';
import { ERR_OK } from '@/api/config';


const recommend = {
  state: {
    bannerList: [],
    songList: [],
  },
  mutations: {
    updateBannerList (state, list) {
      state.bannerList = list;
    },
    updateSongList (state, list) {
      state.songList = list;
    }
  },
  actions: {
    async getBannerList ({ commit }) {
      const { focus: focusInfo = {} } = await getRecommend();
      if (focusInfo?.code === ERR_OK) {
        const rawBannerList = focusInfo?.data?.shelf?.v_niche?.[0]?.v_card;
        const list = rawBannerList.map(banner => {
          return {
            ...banner,
            linkUrl: banner.id.includes('html') ? banner.id : `https://y.qq.com/n/yqq/album/${banner.subid}.html`
          }
        })
        commit('updateBannerList', list)
      }
    },
  }
}

export { recommend }