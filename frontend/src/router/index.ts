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
  {
  path: '/',
  component: () => import('@/layouts/MainLayout.vue'),
  children: [
    { 
      path: '', // La raíz ahora es la Landing
      name: 'Home', 
      component: () => import('@/pages/LandingPage.vue') 
    },
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
  routes,
})

export default router