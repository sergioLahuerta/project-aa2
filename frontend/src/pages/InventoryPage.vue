<template>
  <div>
    <h2 class="text-h4 mb-6">Inventory Management</h2>
    
    <InventoryCard 
      v-for="batch in store.items" 
      :key="batch.id" 
      :data="batch"
      @delete="store.deleteItem"
    />
    
    <v-progress-circular v-if="store.loading" indeterminate></v-progress-circular>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useInventoryStore } from '@/stores/inventoryStore';
import { useUiStore } from '@/stores/uiStore';
import InventoryCard from '@/components/InventoryCard.vue';

const store = useInventoryStore();
const ui = useUiStore();

onMounted(() => {
  ui.setSection('Inventory');
  store.fetchInventory();
});
</script>