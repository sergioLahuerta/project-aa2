<template>
  <div>
    <h1 class="text-h4 mb-4">Dashboard</h1>
    
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

    <v-progress-linear v-if="store.loading" indeterminate color="primary"></v-progress-linear>

    <v-list v-else class="mt-6">
      <v-list-item
        v-for="med in store.medications"
        :key="med.id"
        :title="med.name"
        :subtitle="med.activeIngredient"
      ></v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMedicationStore } from '@/stores/medicationStore'

const store = useMedicationStore()

onMounted(() => {
  store.fetchMedications()
})
</script>