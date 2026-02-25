<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h2 class="text-h4">Stock Management</h2>
      <v-btn color="primary" prepend-icon="mdi-plus">Add Batch</v-btn>
    </div>

    <v-divider class="mb-6"></v-divider>

    <v-progress-circular v-if="store.loading" indeterminate color="primary"></v-progress-circular>

    <div v-else>
      <InventoryItem 
        v-for="batch in store.items" 
        :key="batch.id" 
        :item="batch"
        @delete="handleDelete"
        @edit="handleEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUiStore } from '@/stores/uiStore';
import { useInventoryStore } from '@/stores/inventoryStore';
import InventoryItem from '@/components/InventoryItem.vue';

const ui = useUiStore();
const store = useInventoryStore();

onMounted(() => {
  ui.setSection('Inventory');
  store.fetchInventory();
});

const handleDelete = async (id: number) => {
  if (confirm('Are you sure?')) {
    await store.deleteItem(id);
  }
};

const handleEdit = (item: any) => {
  console.log('Edit item:', item);
};
</script>