import { createStore } from 'vuex'

import { recommend } from './recommend'

const store = createStore({
  modules: {
    recommend
  }
})

export { store }
