import { types } from '../mutation-types'
import { playMode } from '@/utils/config'

const song = {
  namespaced: true,
  state: {
    singer: {},
    playing: false,
    fullscreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1
  },
  getters: {
    currentSong (state) {
      return state.playList[state.currentIndex] || {}
    }
  },
  mutations: {
    [types.UPDATE_SINGER] (state, singer) {
      state.singer = singer
    },
    [types.UPDATE_PLAYING_STATE] (state, flag) {
      state.playing = flag
    },
    [types.UPDATE_FULL_SCREEN] (state, flag) {
      state.fullScreen = flag
    },
    [types.UPDATE_PLAYLIST] (state, list) {
      state.playList = list
    },
    [types.UPDATE_SEQUENCE_LIST] (state, list) {
      state.sequenceList = list
    },
    [types.UPDATE_PLAY_MODE] (state, mode) {
      state.mode = mode
    },
    [types.UPDATE_CURRENT_INDEX] (state, index) {
      state.currentIndex = index
    },
  },
  actions: {
    selectPlay ({ commit }, { list, index }) {
      commit(types.UPDATE_PLAYLIST, list)
      commit(types.UPDATE_SEQUENCE_LIST, list)
      commit(types.UPDATE_CURRENT_INDEX, index)
      commit(types.UPDATE_FULL_SCREEN, true)
      commit(types.UPDATE_PLAYING_STATE, true)
    }
  }
}

export { song }