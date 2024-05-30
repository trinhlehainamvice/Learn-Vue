import '@assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Lara from '@assets/primevue/presets/lara'
import Modals from '@plugins/modals'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

createApp(App)
  .use(PrimeVue, {
    unstyled: true,
    pt: Lara
  })
  .use(i18n)
  .use(createPinia())
  .use(router)
  .use(Modals)
  .mount('#app')
