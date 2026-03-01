import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

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
    component: () => import('@/layouts/LandingLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/LandingPage.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true }, 
    children: [
      {
        path: 'medication',
        name: 'Medication',
        component: () => import('@/pages/MedicationPage.vue')
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthRequired = to.matched.some(record => record.meta.requiresAuth);

  if (isAuthRequired && !authStore.token) {
    next({ name: 'Login' });
  } 
  else if (to.name === 'Login' && authStore.token) {
    next({ name: 'Medication' });
  }
  else {
    next();
  }
});

export default router