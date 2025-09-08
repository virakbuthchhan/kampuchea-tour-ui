// Utilities
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    open: false,
    query: '',
    results: [],
    loading: false,
  }),
  actions: {
    setOpen(value) {
      this.open = value
    },
    setQuery(value) {
      this.query = value
    },
    setResults(value) {
      this.results = value
    },
    setLoading(value) {
      this.loading = value
    },
    clear() {
      this.query = ''
      this.results = []
      this.loading = false
    }
  }
})
