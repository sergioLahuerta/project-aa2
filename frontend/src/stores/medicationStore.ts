import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { Medication } from '@/interfaces/Medication'
import { useAuthStore } from '@/stores/authStore'

export const useMedicationStore = defineStore('medication', () => {
  const medications = ref<Medication[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const authStore = useAuthStore()

  const api = axios.create({
    baseURL: 'http://localhost:5126/api'
  })

  api.interceptors.request.use((config) => {
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  })

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
      const response = await api.get('/medication')
      medications.value = response.data
    } catch (err) {
      error.value = 'Error fetching medications'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function addMedication(newMed: any) {
    try {
      const response = await api.post('/medication', newMed)
      medications.value.push(response.data)
    } catch (err) {
      console.error("Error al guardar:", err)
    }
  }

  async function updateMedication(id: string | number, updatedMed: any) {
    try {
      await api.put(`/medication/${id}`, updatedMed)
      const index = medications.value.findIndex(m => m.id === id)
      if (index !== -1) medications.value[index] = { ...updatedMed, id }
    } catch (err) {
      console.error('Error updating medication:', err)
    }
  }

  async function deleteMedication(id: string | number) {
    try {
      await api.delete(`/medication/${id}`)
      medications.value = medications.value.filter(m => m.id !== id)
    } catch (err) {
      console.error('Error deleting medication:', err)
    }
  }

  return {
    medications,
    loading,
    error,
    totalMedications,
    categoriesCount,
    fetchMedications,
    addMedication,
    updateMedication,
    deleteMedication
  }
})