import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useMedicationStore } from './medicationStore'
import { useAuthStore } from '@/stores/authStore'

export interface InventoryItem {
  id: string | number
  medicationId: string | number
  batchNumber: string
  expiryDate: string
  stock: number
}

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<InventoryItem[]>([])
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

  async function fetchInventory() {
    loading.value = true
    try {
      const { data } = await api.get<InventoryItem[]>('/inventory')
      items.value = data
    } catch (err: any) {
      error.value = err.message || 'Error fetching inventory'
    } finally {
      loading.value = false
    }
  }

  async function addItem(item: Omit<InventoryItem, 'id'>) {
    try {
      const { data } = await api.post<InventoryItem>('/inventory', item)
      items.value.push(data)
    } catch (err: any) {
      error.value = err.message || 'Error adding item'
    }
  }

  async function updateItem(id: string | number, updatedData: Partial<InventoryItem>) {
    try {
      const { data } = await api.put<InventoryItem>(`/inventory/${id}`, updatedData);
      const index = items.value.findIndex(i => String(i.id) === String(id));

      if (index !== -1) {
        items.value[index] = { ...items.value[index], ...data };
      }
    } catch (err: any) {
      error.value = err.message || 'Error updating item';
    }
  }

  async function deleteItem(id: string | number) {
    try {
      await api.delete(`/inventory/${id}`)
      items.value = items.value.filter(i => i.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Error deleting item'
    }
  }

  const inventoryWithNames = computed(() => {
    const medStore = useMedicationStore()
    return items.value.map(item => ({
      ...item,
      medName: medStore.medications.find(m => String(m.id) === String(item.medicationId))?.name || 'Unknown'
    }))
  })

  return {
    items,
    loading,
    error,
    fetchInventory,
    addItem,
    updateItem,
    deleteItem,
    inventoryWithNames
  }
})