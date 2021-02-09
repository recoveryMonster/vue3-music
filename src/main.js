import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

import fastclick from 'fastclick'

import '@/assets/styles/index.scss'
// 点击事件没有300ms延迟
fastclick.attach(document.body)

const app = createApp(App)
app.use(router)
app.mount('#app')
