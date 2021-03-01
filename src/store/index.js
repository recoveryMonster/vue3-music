import { createStore, createLogger } from 'vuex'

import { recommend } from './modules/recommend'
import { singer } from './modules/singer'

const debug = process.env.NODE_ENV !== 'production'
const store = createStore({
  modules: {
    recommend,
    singer,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export { store }
