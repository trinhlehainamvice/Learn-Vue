import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { dirname, resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    VueI18nPlugin({
      /* options */
      // locale messages resource pre-compile option
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/assets/locales/**')
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@frontawesome': fileURLToPath(new URL('./src/assets/fontawesome', import.meta.url)),
      '@ui': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./src/plugins', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url))
    }
  }
})
