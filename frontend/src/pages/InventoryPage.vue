<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h2 class="text-h4">{{ $t('admin.inventoryTitle') }}</h2>
      
      <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreate">
        {{ $t('admin.newBatch') }}
      </v-btn>
    </div>

    <v-row align="center">
      <v-col cols="12" md="4">
        <v-card border color="secondary" variant="tonal" class="pa-4">
          <v-card-item :title="$t('admin.totalBatches')"></v-card-item>
          <v-card-text class="text-h2 font-weight-bold">
            {{ store.items.length }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="12" md="6" class="d-flex justify-end pt-8">
        <v-pagination v-model="currentPage" :length="totalPages" :total-visible="5" density="comfortable"
          @update:model-value="updateUrl($event); scrollToTop()"></v-pagination>
      </v-col>
    </v-row>

    <v-progress-linear v-if="store.loading" indeterminate color="primary" class="my-4"></v-progress-linear>

    <div v-else class="mt-6">
      <InventoryCard v-for="batch in pagedInventory" :key="batch.id" :data="batch" @edit="handleEdit"
        @delete="handleDelete" />

      <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7" prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right" class="my-8"
        @update:model-value="updateUrl($event); scrollToTop()"></v-pagination>
    </div>

    <InventoryForm v-model="showForm" :initial-data="selectedItem" @save="onSave" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useInventoryStore } from '@/stores/inventoryStore'
import { useUiStore } from '@/stores/uiStore'
import InventoryCard from '@/components/InventoryItem.vue'
import InventoryForm from '@/components/InventoryForm.vue'

const store = useInventoryStore()
const ui = useUiStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const showForm = ref(false)
const selectedItem = ref<any>(null)

const itemsPerPage = 10
const currentPage = ref(Number(route.query.page) || 1)

const pagedInventory = computed(() => {
  if (!store.items) return []
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return store.items.slice(start, end)
})

const totalPages = computed(() => {
  const total = store.items.length || 0
  return Math.ceil(total / itemsPerPage) || 1
})

const updateUrl = (page: number) => {
  router.push({ query: { ...route.query, page: page.toString() } })
}

watch(() => route.query.page, (newPage) => {
  currentPage.value = Number(newPage) || 1
})

onMounted(async () => {
  ui.setSection('Inventory')
  await store.fetchInventory()
})

const openCreate = () => {
  selectedItem.value = null
  showForm.value = true
}

const handleEdit = (item: any) => {
  selectedItem.value = null
  selectedItem.value = { ...item }
  showForm.value = true
}

const onSave = async (formData: any) => {
  if (selectedItem.value && selectedItem.value.id) {
    await store.updateItem(selectedItem.value.id, formData)
  } else {
    await store.addItem({ ...formData, medicationId: 1 })
  }
  selectedItem.value = null
}

const handleDelete = async (id: number) => {
  if (confirm(t('admin.confirmDeleteBatch'))) {
    await store.deleteItem(id)
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>