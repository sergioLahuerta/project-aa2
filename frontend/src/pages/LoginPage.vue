<template>
  <v-container fluid class="fill-height" style="background: linear-gradient(180deg, #001f3d 0%, #000000 100%);">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4" lg="3">

        <v-card class="pa-8 elevation-12" rounded="xl" theme="dark" color="rgba(15, 23, 42, 0.8)"
          style="backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
          <div class="text-center mb-8">
            <v-avatar color="black" size="80" class="elevation-4">
              <v-img src="@/assets/logo.svg" alt="PharmaLogic Logo" contain></v-img>
            </v-avatar>

            <v-card-title class="text-h4 font-weight-bold pa-0 mb-1">
              PharmaLogic
            </v-card-title>
            <p class="text-body-2 text-grey-lighten-1">
              {{ isLogin ? 'Acceso al Panel de Administración' : 'Registro de nuevo gestor' }}
            </p>
          </div>

          <v-form @submit.prevent="onSubmit">
            <v-expand-transition>
              <v-text-field v-if="!isLogin" v-model="name" label="Nombre Completo" variant="outlined"
                prepend-inner-icon="mdi-account-outline" color="primary" class="mb-2"
                density="comfortable"></v-text-field>
            </v-expand-transition>

            <v-text-field v-model="email" label="Correo Electrónico" variant="outlined"
              prepend-inner-icon="mdi-email-outline" :error-messages="errors.email" color="primary" class="mb-2"
              placeholder="admin@pharmalogic.com" density="comfortable"></v-text-field>

            <v-text-field v-model="password" label="Contraseña" type="password" variant="outlined"
              prepend-inner-icon="mdi-lock-outline" :error-messages="errors.password" color="primary" class="mb-2"
              density="comfortable"></v-text-field>

            <v-expand-transition>
              <v-alert v-if="loginError" type="error" variant="tonal" density="compact" class="mb-4"
                title="Error de acceso" text="Credenciales incorrectas o servidor fuera de servicio." closable
                @click:close="loginError = false"></v-alert>
            </v-expand-transition>

            <v-btn color="primary" block size="x-large" type="submit" class="mt-6 font-weight-bold text-none"
              elevation="2" :loading="isSubmitting">
              {{ isLogin ? 'Iniciar Sesión' : 'Crear Cuenta' }}
            </v-btn>

            <div class="d-flex align-center my-6">
              <v-divider></v-divider>
              <span class="mx-4 text-caption text-grey">O</span>
              <v-divider></v-divider>
            </div>

            <v-btn variant="text" block color="secondary" class="text-none" @click="isLogin = !isLogin">
              {{ isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión" }}
            </v-btn>
          </v-form>

          <v-alert v-if="isLogin" type="info" variant="tonal" density="compact" class="mt-6 text-caption"
            icon="mdi-information-outline">
            Use <strong>admin@test.com</strong> / <strong>123456</strong>
          </v-alert>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/authStore';

const isLogin = ref(true);
const name = ref('');
const router = useRouter();
const authStore = useAuthStore();

const schema = yup.object({
  email: yup.string().email('Formato de email inválido').required('El email es obligatorio'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const loginError = ref(false);

const onSubmit = handleSubmit(async (values) => {
  loginError.value = false;
  
  const success = await authStore.login(values.email, values.password);
  
  if (success) {
    router.push('/admin/medication');
  } else {
    loginError.value = true;
  }
});
</script>