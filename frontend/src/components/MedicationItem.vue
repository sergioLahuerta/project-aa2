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
const props = defineProps({
  medication: {
    type: Object,
    required: true
  }
});

const getCategoryIcon = (category: string) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('antibiotic')) return 'mdi-bacteria-outline';
  if (cat.includes('analgesic') || cat.includes('inflammatory')) return 'mdi-medication';
  if (cat.includes('antacid') || cat.includes('statin')) return 'mdi-stomach';
  if (cat.includes('antihistamine')) return 'mdi-flower-pollen';
  if (cat.includes('bronchodilator')) return 'mdi-lungs';
  if (cat.includes('antidepressant') || cat.includes('anxiolytic')) return 'mdi-brain';
  if (cat.includes('diuretic') || cat.includes('urological')) return 'mdi-water-outline';
  if (cat.includes('dermatological')) return 'mdi-hand-wash';
  if (cat.includes('antidiabetic')) return 'mdi-needle';
  return 'mdi-pill'; 
};

const getCategoryColor = (category: string) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('antibiotic')) return 'deep-purple';
  if (cat.includes('analgesic')) return 'red';
  if (cat.includes('antihistamine')) return 'orange';
  if (cat.includes('antidiabetic')) return 'teal';
  if (cat.includes('bronchodilator')) return 'blue';
  if (cat.includes('anti-inflammatory')) return 'cyan';
  if (cat.includes('statin')) return 'indigo';
  if (cat.includes('antacid')) return 'lime';
  if (cat.includes('antidepressant')) return 'pink';
  if (cat.includes('anxiolytic')) return 'purple';
  if (cat.includes('antiplatelet')) return 'amber';
  if (cat.includes('antihypertensive')) return 'green';
  if (cat.includes('diuretic')) return 'light-blue';
  if (cat.includes('corticosteroid')) return 'brown';
  if (cat.includes('anticonvulsant')) return 'deep-orange';
  if (cat.includes('beta-blocker')) return 'blue-grey';
  if (cat.includes('hypnotic')) return 'grey';
  if (cat.includes('muscle relaxant')) return 'yellow-darken-2';
  if (cat.includes('antiemetic')) return 'cyan-darken-2';
  if (cat.includes('antigout')) return 'light-green';
  if (cat.includes('supplement')) return 'green-accent-3';
  if (cat.includes('osteoporosis')) return 'pink-darken-2';
  if (cat.includes('antimigraine')) return 'purple-darken-2';
  if (cat.includes('urological')) return 'indigo-darken-2';
  if (cat.includes('dermatological')) return 'brown-lighten-1';
  if (cat.includes('antifungal')) return 'deep-purple-accent-2';
  if (cat.includes('antiviral')) return 'blue-darken-2';
  if (cat.includes('hormone')) return 'red-lighten-2';
  return 'primary'; 
};

defineEmits(['edit', 'delete']);
</script>