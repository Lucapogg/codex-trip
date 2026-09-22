import { defineStore } from 'pinia'
import { getItem, setItem } from '../utils/storage'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    ids: getItem('favorites', [])
  }),
  getters: {
    count: (state) => state.ids.length,
    has: (state) => (id) => state.ids.includes(Number(id))
  },
  actions: {
    toggle(id) {
      const numId = Number(id)
      const idx = this.ids.indexOf(numId)
      if (idx >= 0) {
        this.ids.splice(idx, 1)
      } else {
        this.ids.push(numId)
      }
      setItem('favorites', [...this.ids])
    },
    add(id) {
      const numId = Number(id)
      if (!this.ids.includes(numId)) {
        this.ids.push(numId)
        setItem('favorites', [...this.ids])
      }
    },
    remove(id) {
      const numId = Number(id)
      const idx = this.ids.indexOf(numId)
      if (idx >= 0) {
        this.ids.splice(idx, 1)
        setItem('favorites', [...this.ids])
      }
    },
    clear() {
      this.ids = []
      setItem('favorites', [])
    }
  }
})