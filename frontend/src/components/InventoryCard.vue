<template>
  <v-card variant="outlined" class="mb-3 pa-4" border>
    <v-row align="center">
      <v-col cols="4">
        <div class="text-overline">Batch</div>
        <div class="text-h6">{{ data.batchNumber }}</div>
      </v-col>
      <v-col cols="4">
        <div class="text-overline">Stock</div>
        <v-chip :color="data.stock < 15 ? 'error' : 'success'">
          {{ data.stock }} units
        </v-chip>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn icon="mdi-delete" variant="text" color="error" @click="$emit('delete', data.id)"></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{ data: any }>();
defineEmits(['delete']);
</script>