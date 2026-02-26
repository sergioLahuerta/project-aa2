<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="8" class="text-center">
        <v-icon size="100" color="primary" class="mb-4">mdi-hospital-building</v-icon>
        <h1 class="text-h2 font-weight-bold mb-4">PharmaLogic System</h1>
        <p class="text-h5 text-medium-emphasis mb-8">
          The most advanced solution for medical stock management and pharmaceutical control.
        </p>
        
        <v-btn color="primary" size="x-large" to="/auth/login" class="px-8" elevation="2">
          Access Admin Panel
        </v-btn>
        
        <v-row class="mt-12">
          <v-col cols="12" md="4">
            <v-icon color="secondary">mdi-shield-check</v-icon>
            <h3 class="text-h6">Secure</h3>
          </v-col>
          <v-col cols="12" md="4">
            <v-icon color="secondary">mdi-chart-areaspline</v-icon>
            <h3 class="text-h6">Real-time Analytics</h3>
          </v-col>
          <v-col cols="12" md="4">
            <v-icon color="secondary">mdi-database</v-icon>
            <h3 class="text-h6">Full Inventory</h3>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>