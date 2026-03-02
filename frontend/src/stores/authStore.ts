import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // Estado inicial recuperado de localStorage
  const token = ref(localStorage.getItem('token') || '');
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

  // Propiedad computada para verificar si hay sesión
  const isLoggedIn = computed(() => !!token.value);

  async function login(email: string, password: string) {
    try {
      const response = await fetch('http://localhost:5126/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) return false;

      const data = await response.json();
      
      // Actualizar estado reactivo
      token.value = data.token;
      user.value = { email: data.email, name: data.name };
      
      // Persistir en el navegador
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(user.value));
      
      return true;
    } catch (error) {
      console.error("Error conectando con el backend:", error);
      return false;
    }
  }

  function logout() {
    token.value = '';
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // IMPORTANTE: Devolver todo lo que necesitas usar en los componentes
  return { 
    token, 
    user, 
    isLoggedIn, 
    login, 
    logout 
  };
});