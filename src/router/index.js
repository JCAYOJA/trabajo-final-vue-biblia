import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { 
    path: '/dashboard', 
    component: DashboardView,
    meta: { requiresAuth: true } // Protegemos esta ruta
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard de navegación para verificar la autenticación obligatoria
router.beforeEach((to, from, next) => {
  const requiereAutenticacion = to.matched.some(record => record.meta.requiresAuth)
  const estaAutenticado = localStorage.getItem('user_token')

  if (requiereAutenticacion && !estaAutenticado) {
    next('/login') // Si no está autenticado, va al login
  } else if (to.path === '/login' && estaAutenticado) {
    next('/dashboard') // Si ya está logueado y va al login, lo mandamos al panel
  } else {
    next()
  }
})

export default router
