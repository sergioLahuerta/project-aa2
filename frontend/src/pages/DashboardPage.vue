<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4">Dashboard</h1>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="showForm = true">
        New Medication
      </v-btn>
    </div>

    <v-row>
      <v-col cols="12" md="4">
        <v-card border color="primary" variant="tonal" class="pa-4">
          <v-card-item title="Total Medications"></v-card-item>
          <v-card-text class="text-h2 font-weight-bold">
            {{ store.totalMedications }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-progress-linear v-if="store.loading" indeterminate color="primary" class="my-4"></v-progress-linear>

    <div v-else class="mt-6">
      <MedicationItem v-for="med in pagedMedications" :key="med.id" :medication="med" @delete="handleDelete"
        @edit="handleEdit" />

      <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7" prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right" class="my-8" @update:model-value="updateUrl"></v-pagination>
    </div>

    <MedicationForm v-model="showForm" :initial-data="editingItem" @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMedicationStore } from '@/stores/medicationStore'
import { useUiStore } from '@/stores/uiStore'
import MedicationItem from '@/components/MedicationItem.vue'
import MedicationForm from '@/components/MedicationForm.vue'

const store = useMedicationStore()
const ui = useUiStore()
const route = useRoute()
const router = useRouter()

const showForm = ref(false)
const editingItem = ref<any>(null)

const itemsPerPage = 10
const currentPage = ref(Number(route.query.page) || 1)

const pagedMedications = computed(() => {
  if (!store.medications || !Array.isArray(store.medications)) return []
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return store.medications.slice(start, end)
})

const totalPages = computed(() => {
  const total = store.totalMedications || 0
  return Math.ceil(total / itemsPerPage) || 1
})

const updateUrl = (page: number) => {
  router.push({ query: { ...route.query, page: page.toString() } })
}

watch(() => route.query.page, (newPage) => {
  currentPage.value = Number(newPage) || 1
})

onMounted(async () => {
  ui.setSection('Dashboard')
  await store.fetchMedications()
})

const handleEdit = (item: any) => {
  editingItem.value = { ...item };
  showForm.value = true;
};

const handleSave = async (data: any) => {
  if (editingItem.value && editingItem.value.id) {
    await store.updateMedication(editingItem.value.id, data);
  } else {
    await store.addMedication(data);
  }
  editingItem.value = null;
};

const handleDelete = async (id: number) => {
  if (confirm('¿Seguro que quieres eliminar este medicamento?')) {
    await store.deleteMedication(id);
  }
}
</script>