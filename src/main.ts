import './assets/out.css'
import './assets/base.css'
import 'vue-toast-notification/dist/theme-default.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import ToastPlugin from 'vue-toast-notification'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(ToastPlugin, {
  position: 'top',
})

app.mount('#app')
