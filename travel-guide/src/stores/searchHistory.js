import { defineStore } from 'pinia'
import { getItem, setItem } from '../utils/storage'

const MAX = 5

export const useSearchHistoryStore = defineStore('searchHistory', {
  state: () => ({
    items: getItem('history', [])
  }),
  actions: {
    add(keyword) {
      const kw = String(keyword || '').trim()
      if (!kw) return
      const idx = this.items.indexOf(kw)
      if (idx >= 0) this.items.splice(idx, 1)
      this.items.unshift(kw)
      if (this.items.length > MAX) this.items.length = MAX
      setItem('history', [...this.items])
    },
    remove(keyword) {
      const idx = this.items.indexOf(keyword)
      if (idx >= 0) {
        this.items.splice(idx, 1)
        setItem('history', [...this.items])
      }
    },
    clear() {
      this.items = []
      setItem('history', [])
    }
  }
})