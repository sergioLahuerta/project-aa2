<template>
  <v-card variant="outlined" class="mb-3">
    <v-card-item>
      <v-card-title>{{ medication.name }}</v-card-title>
      <v-card-subtitle>{{ medication.activeIngredient }} - {{ medication.dosage }}</v-card-subtitle>
    </v-card-item>
    <v-card-actions>
      <v-btn icon="mdi-pencil" color="blue" @click="$emit('edit', medication)"></v-btn>
      <v-btn icon="mdi-delete" color="red" @click="$emit('delete', medication.id)"></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{ medication: any }>();
defineEmits(['edit', 'delete']);
</script>