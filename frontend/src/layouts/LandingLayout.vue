<template>
  <v-app theme="dark" style="background-color: #0f1114;">
    <v-app-bar flat color="transparent" class="px-md-16 pt-4">
      <div class="d-flex align-center">
        <v-avatar color="black" size="50" class="mr-4 elevation-4">
          <v-img src="@/assets/logo.svg" contain></v-img>
        </v-avatar>
        <h2 class="text-h5 font-weight-bold">PharmaLogic</h2>
      </div>

      <v-spacer></v-spacer>

      <div class="d-none d-sm-flex align-center">
        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              v-bind="props"
              prepend-icon="mdi-translate"
              class="mr-4 text-none"
            >
              {{ locale === 'es' ? 'Español' : 'English' }}
            </v-btn>
          </template>
          <v-list density="compact" nav>
            <v-list-item @click="setLanguage('es')" :active="locale === 'es'">
              <template v-slot:prepend>
                <v-icon :icon="locale === 'es' ? 'mdi-check' : 'mdi-alphabetical-variant'"></v-icon>
              </template>
              <v-list-item-title>Español</v-list-item-title>
            </v-list-item>
            <v-list-item @click="setLanguage('en')" :active="locale === 'en'">
              <template v-slot:prepend>
                <v-icon :icon="locale === 'en' ? 'mdi-check' : 'mdi-alphabetical-variant'"></v-icon>
              </template>
              <v-list-item-title>English</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <template v-if="!authStore.isLoggedIn">
          <v-btn variant="text" to="/auth/login" class="mr-2 text-none">
            {{ $t('auth.login') }}
          </v-btn>
          <v-btn color="primary" variant="elevated" to="/auth/login" class="text-none">
            {{ $t('auth.adminAccess') }}
          </v-btn>
        </template>

        <template v-else>
          <v-btn 
            color="primary" 
            variant="tonal" 
            to="/admin/medication" 
            prepend-icon="mdi-view-dashboard" 
            class="mr-2 text-none"
          >
            {{ $t('nav.dashboard') }}
          </v-btn>
          <v-btn 
            variant="outlined" 
            color="error" 
            @click="logout" 
            icon="mdi-logout"
            size="small"
          ></v-btn>
        </template>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer class="bg-transparent text-center d-flex flex-column py-10">
      <v-divider class="w-100 mb-6 border-opacity-25"></v-divider>
      <div class="text-grey-darken-1">
        <strong>PharmaLogic</strong> — {{ $t('footer.subtitle') }}
      </div>
      <small class="text-grey-darken-2 mt-2">
        © {{ new Date().getFullYear() }} {{ $t('footer.rights') }}
      </small>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const authStore = useAuthStore();
const router = useRouter();
const { locale } = useI18n(); // Usamos el hook de i18n para controlar el idioma

/**
 * Cambia el idioma global de la aplicación y lo persiste
 */
const setLanguage = (lang: 'es' | 'en') => {
  locale.value = lang;
  localStorage.setItem('user-locale', lang);
};

/**
 * Cierra la sesión y redirige al inicio
 */
const logout = () => {
  authStore.logout();
  router.push('/');
};
</script>

<style scoped>
/* Ajustes de espaciado para que el layout sea responsive */
@media (max-width: 600px) {
  .v-app-bar {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
}

/* Transición suave para el fondo */
.v-application {
  transition: background-color 0.3s ease;
}
</style>