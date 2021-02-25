import { getSingerList } from '@/api/singer';
import { ERR_OK } from '@/api/config';
import { types } from '../mutation-types'
import { normalizeSingerList } from '@/utils/singer'


const singer = {
  namespaced: true,
  state: {
    singerList: [],
  },
  mutations: {
    [types.UPDATE_SINGER_LIST] (state, list) {
      state.singerList = list;
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
  }
}

export { singer }