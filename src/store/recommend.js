import { getRecommend, getDiscList } from '@/api/recommend';
import { ERR_OK } from '@/api/config';
import { types } from './mutation-types'


const recommend = {
  namespaced: true,
  state: {
    bannerList: [],
    dicsList: [],
  },
  mutations: {
    [types.UPDATE_BANNER_LIST] (state, list) {
      state.bannerList = list;
    },
    [types.UPDATE_DICS_LIST] (state, list) {
      state.dicsList = list;
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
        commit(types.UPDATE_BANNER_LIST, list)
      }
    },
    async getDiscList ({ commit }) {
      const res = await getDiscList();
      const { code, data = [] } = res || {};
      if (code === ERR_OK) {
        commit(types.UPDATE_DICS_LIST, data.list)
      }
    }
  }
}

export { recommend }