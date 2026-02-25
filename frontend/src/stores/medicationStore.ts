import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { Medication } from '@/interfaces/Medication'

export const useMedicationStore = defineStore('medication', () => {
  const medications = ref<Medication[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Para las kpis
  const totalMedications = computed(() => medications.value.length)
  const categoriesCount = computed(() => {
    const counts: Record<string, number> = {}
    medications.value.forEach(m => {
      counts[m.category] = (counts[m.category] || 0) + 1
    })
    return counts
  })

  async function fetchMedications() {
    loading.value = true
    try {
      const response = await axios.get('http://localhost:3000/medications')
      medications.value = response.data
    } catch (err) {
      error.value = 'Error fetching medications'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return { 
    medications, 
    loading, 
    error, 
    totalMedications, 
    categoriesCount, 
    fetchMedications 
  }
})