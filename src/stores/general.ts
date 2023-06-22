import { defineStore } from 'pinia'

export const useGeneralStore = defineStore({
  id: 'general',
  state: () => ({
    fullPageLoading: false
  }),
  actions: {
    setFullPageLoading(loading: boolean) {
      this.fullPageLoading = loading
    }
  }
})
