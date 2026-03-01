<template>
  <v-dialog v-model="show" max-width="500px" persistent>
    <v-card class="pa-4">
      <v-card-title class="text-h5 pb-4">
        {{ isEditing ? 'Edit Batch' : 'Add New Inventory Batch' }}
      </v-card-title>
      
      <v-form @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="batchNumber"
              label="Batch Number (e.g. BAT-001)"
              :error-messages="errors.batchNumber"
              variant="outlined"
            ></v-text-field>
          </v-col>
          
          <v-col cols="12">
            <v-text-field
              v-model="stock"
              label="Current Stock Units"
              type="number"
              :error-messages="errors.stock"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="expiryDate"
              label="Expiry Date (YYYY-MM-DD)"
              type="date"
              :error-messages="errors.expiryDate"
              variant="outlined"
              persistent-placeholder
            ></v-text-field>
          </v-col>
        </v-row>

        <v-card-actions class="pt-6">
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="close">Cancel</v-btn>
          <v-btn color="primary" type="submit" variant="elevated">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps<{ modelValue: boolean; initialData?: any }>();
const emit = defineEmits(['update:modelValue', 'save']);

const show = ref(props.modelValue);
const isEditing = ref(false);

const schema = yup.object({
  batchNumber: yup.string().required('Required').min(5, 'Too short'),
  stock: yup.number().required('Required').min(0, 'Must be positive'),
  expiryDate: yup.string().required('Required'),
});

const { handleSubmit, errors, resetForm, setValues } = useForm({ validationSchema: schema });

const { value: batchNumber } = useField<string>('batchNumber');
const { value: stock } = useField<number>('stock');
const { value: expiryDate } = useField<string>('expiryDate');

watch(() => props.modelValue, (isOpen) => {
  show.value = isOpen;
  if (isOpen && props.initialData) {
    isEditing.value = true;
    setValues(props.initialData);
  } else if (isOpen) {
    isEditing.value = false;
    resetForm();
  }
});

watch(show, (val) => emit('update:modelValue', val));

const onSubmit = handleSubmit(values => {
  emit('save', values);
  close();
});

const close = () => {
  show.value = false;
  resetForm();
};
</script>