import '@assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import Lara from '@assets/primevue/presets/lara'
import Modals from '@plugins/modals'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Modals)
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara
})

app.mount('#app')
