import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

// Definimos la interfaz para cumplir con Typescript en componentes
interface InventoryItem {
  id: number;
  medicationId: number;
  batchNumber: string;
  expiryDate: string;
  stock: number;
}

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<InventoryItem[]>([]);
  const loading = ref(false);

  async function fetchInventory() {
    loading.value = true;
    try {
      const response = await axios.get('http://localhost:3000/inventory');
      items.value = response.data;
    } finally {
      loading.value = false;
    }
  }

  async function addItem(item: Omit<InventoryItem, 'id'>) {
    await axios.post('http://localhost:3000/inventory', item);
    await fetchInventory();
  }

  async function deleteItem(id: number) {
    await axios.delete(`http://localhost:3000/inventory/${id}`);
    items.value = items.value.filter(i => i.id !== id);
  }

  return { items, loading, fetchInventory, addItem, deleteItem };
});