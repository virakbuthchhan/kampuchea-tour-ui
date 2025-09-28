// src/stores/useAuthStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {useAppStore} from "@/stores/appStore";

import api,{API_BASE,apiPath} from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const loading = ref(false)
  const error = ref(null)

  // Getters (computed)
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  // Actions
  const router = useRouter()
  const appStore = useAppStore()
  const {showSnackbar} = appStore;
  function setAuth(jwt, userData) {
    localStorage.setItem('token', jwt)
    localStorage.setItem('user', JSON.stringify(userData))

    // Update reactive refs
    token.value = jwt
    user.value = userData

    // Set default Authorization header for future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
  }


  function loginWithProvider(provider) {
    window.location.href = `${API_BASE}/auth/${provider}/redirect`;
  }

  async function handleCallback(provider,allParams) {
    try {
      const response = await api.get(`/auth/${provider}/callback`, { params: allParams });
      const { user, token } = response.data.data;

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return { user, token };
    } catch (error) {
      console.error('GitHub login failed:', error);
      throw error;
    }
  }

  // Email/Password login → triggers OTP

  // Verify OTP
  async function verifyOtp(payload) {
    const response = await api.post(`/verify-otp`, payload);
    const { user, token } = response.data;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return { user, token };
  }

  function logout() {
    return api.post(apiPath.logout).then((res) => {
      console.log('logout',res);
      setAuth(null,null);
      delete api.defaults.headers.common['Authorization'];
      showSnackbar(res.data.message, "success",3000);
      router.push('/auth/login');
    });
  }

  function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { user: JSON.parse(user), token };
    }
    return null;
  }

  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post(apiPath.login, credentials)
      const { token: jwt, user: userData } = response.data

      setAuth(jwt, userData)

      router.push('/dashboard')
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      console.error('Login error:', err)
      throw err // Optional: let component handle it too
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    error.value = null

    try {
      const response = await api.post(apiPath.register, userData)
      const { token: jwt, user: newUser } = response.data

      setAuth(jwt, newUser)

      await router.push('/dashboard')
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      console.error('Register error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchUserProfile() {
    if (!token.value) return

    try {
      appStore.setLoading(true)
      const response = await api.get(apiPath.me)
      user.value = response.data.data
      localStorage.setItem('user', JSON.stringify(response.data.data))
    } catch (err) {
      console.warn('Failed to fetch profile. Logging out...', err)
      await logout()
    }finally {
      appStore.setLoading(false)
    }
  }

  async function refreshToken() {
    try {
      const response = await api.post('/auth/refresh')
      const newToken = response.data.token
      // Keep same user, update token
      setAuth(newToken, user.value)
    } catch (err) {
      await logout()
    }
  }

  // Return public interface
  return {
    // State
    token,
    user,
    loading,
    error,

    // Getters
    isAuthenticated,
    currentUser,
    setAuth,
    // Actions
    login,
    register,
    logout,
    fetchUserProfile,
    refreshToken,
    loginWithProvider,
    handleCallback,
    verifyOtp,
    checkAuth
  }
})
