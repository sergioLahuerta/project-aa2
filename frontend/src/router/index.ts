import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      { 
        path: 'login', 
        name: 'Login', 
        component: () => import('@/pages/LoginPage.vue') 
      }
    ]
  },
  // Grupo 2: Rutas de la Aplicación (Con Header/Footer)
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/dashboard', // Si entran a "/", los mandamos al dashboard
    children: [
      { 
        path: 'dashboard', 
        name: 'Dashboard', 
        component: () => import('@/pages/DashboardPage.vue') 
      },
      { 
        path: 'inventory', 
        name: 'Inventory', 
        component: () => import('@/pages/InventoryPage.vue') 
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // Aquí es donde le pasamos el array de rutas que definimos arriba
})

export default router