// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia' // Asegúrate de tenerlo
import App from './App.vue'
import vuetify from './plugins/vuetify' // O la ruta que uses
import router from './router'
import i18n from './i18n/vue-i18n' // Tu archivo de configuración

const app = createApp(App)

app.use(createPinia()) // Obligatorio para los stores
app.use(router)
app.use(vuetify)
app.use(i18n) // Activa las traducciones globales

app.mount('#app')