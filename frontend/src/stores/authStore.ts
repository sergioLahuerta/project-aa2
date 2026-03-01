import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

  async function login(email: string, password: string) {
    try {
      const response = await fetch('http://localhost:5126/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) return false;

      const data = await response.json();
      
      token.value = data.token;
      user.value = { email: data.email, name: data.name };
      
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

  return { token, user, login, logout };
});