<template>
  <v-card width="400" class="pa-8" elevation="10">
    <v-card-title class="text-h5 text-center mb-4">PharmaLogic Access</v-card-title>
    
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="email"
        label="Email"
        :error-messages="errors.email"
        variant="outlined"
        density="compact"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        :error-messages="errors.password"
        variant="outlined"
        density="compact"
        class="mt-2"
      ></v-text-field>

      <v-btn color="primary" block size="large" type="submit" class="mt-4" :loading="isSubmitting">
        Login
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';

const router = useRouter();

// Esquema de validación obligatorio (Yup)
const schema = yup.object({
  email: yup.string().email('Must be a valid email').required('Required'),
  password: yup.string().min(6, 'Min 6 characters').required('Required'),
});

const { handleSubmit, errors, isSubmitting } = useForm({ validationSchema: schema });
const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit(values => {
  // Aquí iría la lógica contra el backend después
  router.push('/dashboard');
});
</script>