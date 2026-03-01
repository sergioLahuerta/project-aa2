<template>
  <v-container class="fill-height py-16">
    <v-row align="center" justify="center">
      <v-col cols="12" class="d-flex flex-column align-start">
        <v-chip color="primary" variant="tonal" class="mb-4" label>
          {{ $t('home.badge') }}
        </v-chip>

        <h1 class="text-h2 font-weight-black mb-6" style="line-height: 1.1;">
          {{ $t('home.title') }} <br>
          <span class="text-primary">{{ $t('home.subtitle') }}</span>
        </h1>

        <p class="text-h6 text-grey-darken-1 mb-10 pr-md-10" style="max-width: 600px;">
          {{ $t('home.description') }}
        </p>

        <div class="d-flex flex-wrap gap-4">
          <v-btn 
            color="primary" 
            size="x-large" 
            elevation="8" 
            :to="isLoggedIn ? '/admin/medication' : '/auth/login'"
            class="px-10 mr-4 text-none"
          >
            {{ isLoggedIn ? $t('home.btnPanel') : $t('home.btnExplore') }}
          </v-btn>
          
          <v-btn variant="outlined" size="x-large" href="https://github.com/sergioLahuerta/project-aa2"
            target="_blank" class="text-none">
            <v-icon start>mdi-github</v-icon> {{$t('home.repository')}}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-container id="explore-section" class="py-16">
      <v-divider class="mb-16 border-opacity-25"></v-divider>

      <div class="mb-12">
        <div class="d-flex align-center mb-2">
          <v-icon color="primary" class="mr-2">mdi-library-shelves</v-icon>
          <span class="text-overline text-primary font-weight-bold">{{ $t('home.exploreBadge') }}</span>
        </div>
        <h2 class="text-h3 font-weight-black">{{ $t('home.exploreTitle') }} <span class="text-primary">{{ $t('home.exploreTitleAccent') }}</span></h2>
        <p class="text-grey-lighten-1 mt-2" style="max-width: 700px;">
          {{ $t('home.exploreDesc') }}
        </p>
      </div>

      <v-row>
        <v-col v-for="med in landingMeds" :key="med.name" cols="12" md="6" lg="4">
          <v-card variant="outlined" class="pa-4 h-100 bg-transparent border-opacity-50" rounded="lg"
            style="border-color: rgba(255, 255, 255, 0.12) !important;">
            <div class="d-flex align-center mb-4">
              <v-avatar :color="getCategoryColor(med.category)" size="48" variant="tonal" class="mr-4">
                <v-icon :icon="getCategoryIcon(med.category)" size="24"></v-icon>
              </v-avatar>

              <div>
                <div class="text-h6 font-weight-bold">
                  {{ med.name }} <span class="text-body-2 text-grey">({{ med.dose }})</span>
                </div>
                <div class="d-flex align-center mt-1">
                  <v-icon size="14" color="grey" class="mr-1">mdi-dna</v-icon>
                  <span class="text-caption text-grey text-uppercase font-weight-medium">{{ med.compound }}</span>
                </div>
              </div>
            </div>

            <v-chip :color="getCategoryColor(med.category)" size="small" label class="font-weight-bold text-uppercase px-3 mb-4">
              {{ med.category }}
            </v-chip>

            <v-divider class="mb-4 border-opacity-25"></v-divider>

            <v-card-actions class="pa-0">
              <v-btn block variant="flat" color="primary" prepend-icon="mdi-wikipedia"
                :href="`https://es.wikipedia.org/wiki/${med.name}`" target="_blank"
                class="text-none font-weight-bold">
                {{ $t('home.cardMore') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" class="mt-12">
        <v-btn :to="isLoggedIn ? '/admin/medication' : '/auth/login'" variant="text" color="primary" size="large" append-icon="mdi-chevron-right" class="text-none">
          {{ $t('home.infoBottom') }}
        </v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getCategoryColor, getCategoryIcon } from '@/utils/medicationStyles';
import { useAuthStore } from '@/stores/authStore'; 

const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

const landingMeds = [
  { name: 'Amoxicilina', dose: '500mg', compound: 'Amoxicillin', category: 'Antibiotic' },
  { name: 'Ibuprofeno', dose: '600mg', compound: 'Ibuprofen', category: 'Analgesic' },
  { name: 'Metformina', dose: '850mg', compound: 'Metformin', category: 'Antidiabetic' },
  { name: 'Atorvastatina', dose: '20mg', compound: 'Atorvastatin', category: 'Statin' },
  { name: 'Ventolin', dose: '100mcg', compound: 'Salbutamol', category: 'Bronchodilator' },
  { name: 'Omeprazol', dose: '20mg', compound: 'Omeprazole', category: 'Antacid' },
  { name: 'Cetirizina', dose: '10mg', compound: 'Cetirizine', category: 'Antihistamine' },
  { name: 'Nolotil', dose: '575mg', compound: 'Metamizole', category: 'Analgesic' },
  { name: 'Lexapro', dose: '10mg', compound: 'Escitalopram', category: 'Antidepressant' },
];

const scrollToExplore = () => {
  const el = document.getElementById('explore-section');
  el?.scrollIntoView({ behavior: 'smooth' });
};
</script>