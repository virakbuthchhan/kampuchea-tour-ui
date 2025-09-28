// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app_store', {
  state: () => ({
    loading:false,
    snackbar:false,
    message:'ម៉ាស៊ីនកំពុងដំណើរការ...',
    color:'info',
    timeout:3000,
  }),
  actions: {
    setLoading(loading) {
      this.loading = loading
    },
    showSnackbar(message, color = 'info', timeout = 3000) {
      this.snackbar = true
      this.message = message
      this.color = color
      this.timeout = timeout
      // after timeout, close the snackbar
      setTimeout(() => {
        this.closeSnackbar()
      }, timeout)
    },
    closeSnackbar() {
      this.snackbar = false
    }
  }
})
