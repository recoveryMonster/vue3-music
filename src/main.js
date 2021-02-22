import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'
import lazyPlugin from 'vue3-lazy'

import fastclick from 'fastclick'

import '@/assets/styles/index.scss'
// 点击事件没有300ms延迟
fastclick.attach(document.body)

const app = createApp(App)
app.use(router)
app.use(store)
app.use(lazyPlugin, {
  loading: require('assets/image/default.png')
})
app.mount('#app')
