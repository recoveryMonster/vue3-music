import { getSingerList, getSingerDetail } from '@/api/singer';
import { ERR_OK } from '@/api/config';
import { types } from '../mutation-types'
import { normalizeSingerList } from '@/utils/singer'


const singer = {
  namespaced: true,
  state: {
    singerList: [],
    selectedSinger: {},
    singerDetail: []
  },
  mutations: {
    [types.UPDATE_SINGER_LIST] (state, list) {
      state.singerList = list;
    },
    [types.UPDATE_SELECTED_SINGER] (state, singer) {
      state.selectedSinger = singer;
    },
    [types.UPDATE_SINGER_DETAIL] (state, singerDetail) {
      state.singerDetail = singerDetail;
    }

  },
  actions: {
    async getSingerList ({ commit }) {
      const res = await getSingerList();
      if (res?.code === ERR_OK) {
        const list = normalizeSingerList(res.data?.list || [])
        commit(types.UPDATE_SINGER_LIST, list);
      }
    },
    async getSingerDetail ({ commit }, singerId) {
      const res = await getSingerDetail(singerId);
      if (res?.code === ERR_OK) {
        commit(types.UPDATE_SINGER_DETAIL, res.data.list)
      }
    }
  }
}

export { singer }