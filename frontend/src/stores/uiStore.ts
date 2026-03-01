import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    loading: false,
    currentSection: 'Home'
  }),
  actions: {
    setSection(name: string) { this.currentSection = name }
  }
})