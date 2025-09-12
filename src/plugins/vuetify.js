/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// Lab
import { VFileUpload } from 'vuetify/labs/VFileUpload'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VFileUpload
  },
  theme: {
    defaultTheme: localStorage.getItem('theme') || 'light',
  },
})
