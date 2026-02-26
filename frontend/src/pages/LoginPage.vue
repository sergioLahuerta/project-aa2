<template>
  <v-card width="450" class="pa-8 mx-auto" elevation="4">
    <v-card-title class="text-h5 text-center mb-6">
      {{ isLogin ? 'PharmaLogic Admin Access' : 'Create Account' }}
    </v-card-title>
    
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-if="!isLogin"
        v-model="name"
        label="Full Name"
        variant="outlined"
        class="mb-2"
      ></v-text-field>

      <v-text-field v-model="email" label="Email" variant="outlined" :error-messages="errors.email"></v-text-field>
      <v-text-field v-model="password" label="Password" type="password" variant="outlined" :error-messages="errors.password"></v-text-field>

      <v-btn color="primary" block size="large" type="submit" class="mt-4">
        {{ isLogin ? 'Login' : 'Sign Up' }}
      </v-btn>

      <v-btn variant="text" block class="mt-2" @click="isLogin = !isLogin">
        {{ isLogin ? "Don't have an account? Register" : "Already have an account? Login" }}
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const isLogin = ref(true);
const name = ref('');

const router = useRouter();

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const onSubmit = handleSubmit(values => {
  console.log('Credenciales intentadas:', values);
  
  router.push('/dashboard');
});
</script>