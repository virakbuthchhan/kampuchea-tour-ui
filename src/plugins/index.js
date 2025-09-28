/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import i18n from "@/locale";
import { VueReCaptcha } from 'vue-recaptcha-v3'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
    .use(VueReCaptcha,{
      siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
      loaderOptions: {
        autoHideBadge: true,
      },
    })
}
