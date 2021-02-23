import { createStore } from 'vuex'

import { recommend } from './modules/recommend'
import { singer } from './modules/singer'

const store = createStore({
  modules: {
    recommend,
    singer,
  }
})

export { store }
