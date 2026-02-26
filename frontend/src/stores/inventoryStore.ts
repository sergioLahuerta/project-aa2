import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/services/api'
import { useMedicationStore } from './medicationStore'

export interface InventoryItem {
  id: number
  medicationId: number
  batchNumber: string
  expiryDate: string
  stock: number
}

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<InventoryItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

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

  async function deleteItem(id: number) {
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
      medName:
        medStore.medications.find(m => m.id === item.medicationId)?.name ||
        'Unknown'
    }))
  })

  return {
    items,
    loading,
    error,
    fetchInventory,
    addItem,
    deleteItem,
    inventoryWithNames
  }
})