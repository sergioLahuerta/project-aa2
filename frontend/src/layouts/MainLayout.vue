<template>
  <v-app>
    <v-app-bar color="primary" flat>
      <v-app-bar-title>PharmaLogic Admin</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/dashboard" variant="text">Dashboard</v-btn>
      <v-btn to="/inventory" variant="text">Inventory</v-btn>
      <v-btn icon="mdi-logout" variant="text" to="/login"></v-btn>
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