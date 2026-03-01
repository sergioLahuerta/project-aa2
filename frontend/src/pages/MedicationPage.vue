<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4">{{ $t('admin.medicationTitle') }}</h1>
      <v-btn color="primary" prepend-icon="mdi-plus" @click="showForm = true">
        {{ $t('admin.newMedication') }}
      </v-btn>
    </div>

    <v-row align="center">
      <v-col cols="12" md="4">
        <v-card border color="primary" variant="tonal" class="pa-4">
          <v-card-item :title="$t('admin.totalMedications')"></v-card-item>
          <v-card-text class="text-h2 font-weight-bold">
            {{ store.totalMedications }}
          </v-card-text>
        </v-card>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="12" md="6" class="d-flex justify-end pt-8">
        <v-pagination 
          v-model="currentPage" 
          :length="totalPages" 
          :total-visible="5"
          density="comfortable"
          @update:model-value="updateUrl($event); scrollToTop()"
        ></v-pagination>
      </v-col>
    </v-row>

    <v-progress-linear v-if="store.loading" indeterminate color="primary" class="my-4"></v-progress-linear>
    <div v-if="store.loading" class="text-center text-caption text-grey">{{ $t('admin.loading') }}</div>

    <div v-else class="mt-6">
      <MedicationItem 
        v-for="med in pagedMedications" 
        :key="med.id" 
        :medication="med" 
        @delete="handleDelete"
        @edit="handleEdit" 
      />

      <v-pagination 
        v-model="currentPage" 
        :length="totalPages" 
        :total-visible="7" 
        prev-icon="mdi-chevron-left" 
        next-icon="mdi-chevron-right" 
        class="my-8" 
        @update:model-value="updateUrl($event); scrollToTop()"
      ></v-pagination>
    </div>

    <MedicationForm v-model="showForm" :initial-data="editingItem" @save="handleSave" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMedicationStore } from '@/stores/medicationStore'
import { useUiStore } from '@/stores/uiStore'
import MedicationItem from '@/components/MedicationItem.vue'
import MedicationForm from '@/components/MedicationForm.vue'

const store = useMedicationStore()
const ui = useUiStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

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
  ui.setSection('Medication')
  await store.fetchMedications()
})

const handleEdit = (item: any) => {
  editingItem.value = null;
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
  if (confirm(t('admin.confirmDeleteMed'))) {
    await store.deleteMedication(id);
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>