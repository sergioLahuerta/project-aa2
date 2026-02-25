<template>
  <v-container class="fill-height text-center">
    <v-responsive class="align-center">
      <v-img height="200" src="@/assets/logo.png" />
      <h1 class="text-h2 font-weight-bold">Welcome to PharmaLogic</h1>
      <p class="text-body-1 mt-4">The intelligent bridge between patients and clinical decisions.</p>
      <div class="mt-8">
        <v-btn color="primary" size="x-large" to="/auth/login" class="ma-2">Go to Admin Access</v-btn>
      </div>
    </v-responsive>
  </v-container>
</template>