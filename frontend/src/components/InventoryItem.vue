<template>
  <v-card border class="mb-3 pa-4" variant="flat">
    <v-row align="center">
      <v-col cols="4">
        <span class="text-overline d-block">Batch Number</span>
        <span class="font-weight-bold">{{ item.batchNumber }}</span>
      </v-col>
      <v-col cols="4" class="text-center">
        <v-chip :color="item.stock < 100 ? 'warning' : 'success'" size="small">
          {{ item.stock }} Units
        </v-chip>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn icon="mdi-delete" variant="plain" color="error" @click="$emit('delete', item.id)"></v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ item: any }>();
defineEmits(['edit', 'delete']);

const isExpired = computed(() => new Date(props.item.expiryDate) < new Date());
</script>