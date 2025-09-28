/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import {useAuthStore} from "@/stores/useAuthStore.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

// before each route
router.beforeEach((to, from, next) => {
  // Example: Protecting a route
  const {isAuthenticated} = useAuthStore()
  // if to go /auth when already logged in, redirect to home
  if (to.path.startsWith('/auth') && isAuthenticated) {
    return next('/')
  }
  // if go to /me or /dashboard when not logged in, redirect to /auth
  if ((to.path === '/me' || to.path === '/dashboard') && !isAuthenticated) {
    return next('/auth')
  }
  // const publicPages = ['/login', '/register', '/forgot-password']
  // const authRequired = !publicPages.includes(to.path)
  // const loggedIn = !!localStorage.getItem('token')
  //
  // if (authRequired && !loggedIn) {
  //   return next('/login')
  // }
  next()
});
export default router
