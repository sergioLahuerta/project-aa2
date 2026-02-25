<template>
  <v-app>
    <v-app-bar color="primary" flat>
      <v-app-bar-title>{{ ui.currentSection }}</v-app-bar-title>
      
      <v-breadcrumbs 
        :items="['Admin', ui.currentSection]" 
        class="hidden-sm-and-down"
      ></v-breadcrumbs>

      <v-spacer></v-spacer>

      <v-btn to="/dashboard" variant="text">Dashboard</v-btn>
      <v-btn to="/inventory" variant="text">Inventory</v-btn>
      <v-btn icon="mdi-logout" variant="text" to="/auth/login"></v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app border>
      <small>2026 PharmaLogic - External Medical API System</small>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { useUiStore } from '@/stores/uiStore';

const ui = useUiStore();
</script>