<template>
  <v-card variant="outlined" class="mb-3" border>
    <v-card-item>
      <v-row align="center">
        <v-col cols="3">
          <div class="text-overline">Batch Number</div>
          <div class="text-h6">{{ item.batchNumber }}</div>
        </v-col>
        <v-col cols="3">
          <div class="text-overline">Expiry Date</div>
          <div class="text-body-1" :class="isExpired ? 'text-error font-weight-bold' : ''">
            {{ item.expiryDate }}
          </div>
        </v-col>
        <v-col cols="2">
          <div class="text-overline">Stock</div>
          <v-chip :color="item.stock < 20 ? 'warning' : 'success'">
            {{ item.stock }} units
          </v-chip>
        </v-col>
        <v-col cols="4" class="text-right">
          <v-btn icon="mdi-pencil" variant="text" color="info" @click="$emit('edit', item)"></v-btn>
          <v-btn icon="mdi-delete" variant="text" color="error" @click="$emit('delete', item.id)"></v-btn>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ item: any }>();
defineEmits(['edit', 'delete']);

const isExpired = computed(() => new Date(props.item.expiryDate) < new Date());
</script>