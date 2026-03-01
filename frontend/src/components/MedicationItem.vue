<template>
  <v-card border class="mb-4" variant="outlined" v-if="medication">
    <v-card-text class="d-flex align-center pa-4">
      <v-avatar :color="getCategoryColor(medication.category)" variant="tonal" class="mr-4">
        <v-icon>{{ getCategoryIcon(medication.category) }}</v-icon>
      </v-avatar>

      <div class="flex-grow-1">
        <div class="text-h6 mb-3 font-weight-bold">
          {{ medication.name || 'Medicamento sin nombre' }}
          <span v-if="medication.dosage" class="text-subtitle-1 text-medium-emphasis ml-1">
            ({{ medication.dosage }})
          </span>
        </div>
        
        <div class="text-body-2 text-medium-emphasis">
          <v-icon size="small" class="mr-1">mdi-flask-outline</v-icon>
          <span class="mr-6">{{ medication.activeIngredient || 'N/A' }}</span>
          <v-chip size="default" label :color="getCategoryColor(medication.category)" variant="flat">
            {{ medication.category || 'General' }}
          </v-chip>
        </div>
      </div>

      <div class="d-flex flex-column flex-sm-row">
        <v-btn icon="mdi-pencil" color="info" variant="text" @click="$emit('edit', medication)"></v-btn>
        <v-btn icon="mdi-delete" color="error" variant="text" @click="$emit('delete', medication.id)"></v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { getCategoryColor, getCategoryIcon } from '@/utils/medicationStyles';
const props = defineProps({
  medication: {
    type: Object,
    required: true
  }
});

defineEmits(['edit', 'delete']);
</script>