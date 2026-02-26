<template>
  <v-dialog v-model="show" max-width="600px" persistent>
    <v-card class="pa-4">
      <v-card-title class="text-h5 pb-4">
        {{ isEditing ? 'Edit Medication' : 'Add New Medication' }}
      </v-card-title>
      
      <v-divider class="mb-6"></v-divider>

      <v-form @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              label="Medicine Name"
              :error-messages="errors.name"
              variant="outlined"
            ></v-text-field>
          </v-col>
          
          <v-col cols="12" md="6">
            <v-text-field
              v-model="brand"
              label="Laboratory/Brand"
              :error-messages="errors.brand"
              variant="outlined"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-select
              v-model="category"
              label="Category"
              :items="['Antibiotic', 'Analgesic', 'Anti-inflammatory', 'Statin', 'Other']"
              :error-messages="errors.category"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="activeIngredient"
              label="Active Ingredient"
              :error-messages="errors.activeIngredient"
              variant="outlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-card-actions class="pt-6">
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="close">Cancel</v-btn>
          <v-btn color="primary" type="submit" variant="elevated" class="px-6">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps<{
  modelValue: boolean;
  initialData?: any;
}>();

const emit = defineEmits(['update:modelValue', 'save']);

const show = ref(props.modelValue);
const isEditing = ref(false);

watch(() => props.modelValue, (val) => show.value = val);
watch(show, (val) => emit('update:modelValue', val));

const schema = yup.object({
  name: yup.string().required('Name is required').min(3, 'Too short'),
  brand: yup.string().required('Brand is required'),
  category: yup.string().required('Select a category'),
  activeIngredient: yup.string().required('Active ingredient is required'),
});

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
});

const { value: name } = useField<string>('name');
const { value: brand } = useField<string>('brand');
const { value: category } = useField<string>('category');
const { value: activeIngredient } = useField<string>('activeIngredient');

const onSubmit = handleSubmit(values => {
  emit('save', values);
  close();
});

const close = () => {
  show.value = false;
  resetForm();
};
</script>