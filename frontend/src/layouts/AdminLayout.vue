<template>
  <v-app>
    <v-app-bar color="primary" flat theme="dark" class="custom-pd">
      <router-link to="/" style="text-decoration: none;">
        <div class="d-flex align-center ml-16">
          <v-img src="@/assets/logo.svg" alt="PharmaLogic Logo" width="38" height="38" contain
            style="filter: brightness(0) invert(1);"></v-img>
        </div>
      </router-link>

      <div class="text-h6 font-weight-bold ml-4" style="white-space: nowrap; min-width: max-content;">
        {{ $t(`nav.${ui.currentSection.toLowerCase()}`) }}
      </div>

      <v-breadcrumbs :items="['Admin', $t(`nav.${ui.currentSection.toLowerCase()}`)]"
        class="hidden-sm-and-down px-2 ml-8"></v-breadcrumbs>

      <v-spacer></v-spacer>

      <v-btn icon @click="changeTheme" class="mr-2">
        <v-icon>{{ authStore.isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props" prepend-icon="mdi-translate" class="mr-4 text-none">
            {{ locale === 'es' ? 'Español' : 'English' }}
          </v-btn>
        </template>

        <v-list density="compact" nav>
          <v-list-item @click="setLanguage('es')" :active="locale === 'es'">
            <template v-slot:prepend><v-icon icon="mdi-check" v-if="locale === 'es'"></v-icon></template>
            <v-list-item-title>Español</v-list-item-title>
          </v-list-item>
          <v-list-item @click="setLanguage('en')" :active="locale === 'en'">
            <template v-slot:prepend><v-icon icon="mdi-check" v-if="locale === 'en'"></v-icon></template>
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn to="/admin/medication" variant="text" class="text-none">
        {{ $t('nav.medication') }}
      </v-btn>
      <v-btn to="/admin/inventory" variant="text" class="text-none">
        {{ $t('nav.inventory') }}
      </v-btn>

      <v-btn icon="mdi-logout" variant="text" to="/auth/login"></v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app border>
      <small>{{ $t('footer.external') }}</small>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useUiStore } from '@/stores/uiStore';

import { useTheme } from 'vuetify';
import { useAuthStore } from '@/stores/authStore';

const theme = useTheme();
const authStore = useAuthStore();

theme.global.name.value = authStore.isDark ? 'dark' : 'light';

const changeTheme = () => {
  authStore.toggleTheme(theme);
};

const ui = useUiStore();
const route = useRoute();
const { locale } = useI18n();

const updateSectionName = () => {
  const path = route.path;
  if (path.includes('medication')) ui.setSection('Medication');
  else if (path.includes('inventory')) ui.setSection('Inventory');
  else ui.setSection('Home');
};

const setLanguage = (lang: 'es' | 'en') => {
  locale.value = lang;
  localStorage.setItem('user-locale', lang);
};

watch(() => route.path, () => {
  updateSectionName();
});

onMounted(() => {
  updateSectionName();
  theme.global.name.value = authStore.isDark ? 'dark' : 'light';
});
</script>