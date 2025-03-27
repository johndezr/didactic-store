import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'

import TheStoreLayout from '@/ui/layout/TheStoreLayout.vue'
import TheHome from '@/ui/views/HomeView.vue'
import LoginView from '@/ui/views/LoginView.vue'
import SignupView from '@/ui/views/SignupView.vue'
import AdminView from '@/ui/views/AdminView.vue'
import AdminProductView from '@/ui/views/AdminProductView.vue'

import { useAuthStore } from '@/stores/auth'
import { AuthStatus } from '@/domain/models/Auth'
import { AuthServices } from '@/services/Auth'
import useAuth from '@/composables/useAuth'
import { authBeforeEnter } from '@/libs/authBeforeEnter'

// TODO: Move to another file
const refreshUserToken = async (store, token: string) => {
  const { logout } = useAuth()
  try {
    const { user, token: newToken } = await AuthServices.refreshToken(token)
    store.setAuthInfo({ user, token: newToken, status: AuthStatus.AUTHENTICATED })
  } catch {
    logout()
  }
}

const adminBeforeEnter = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const store = useAuthStore()
  const token = localStorage.getItem('token')

  if (!token) {
    return next({ name: 'login' })
  }

  await refreshUserToken(store, token)

  return store.status === AuthStatus.AUTHENTICATED && store.isUserAdmin
    ? next()
    : next({ name: 'login' })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'store',
      component: TheStoreLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: TheHome,
        },
        {
          beforeEnter: authBeforeEnter,
          path: '/auth/login',
          name: 'login',
          component: LoginView,
        },
        {
          beforeEnter: authBeforeEnter,
          path: '/auth/signup',
          name: 'signup',
          component: SignupView,
        },
        {
          beforeEnter: adminBeforeEnter,
          path: '/admin',
          name: 'admin',
          component: AdminView,
        },
        {
          beforeEnter: adminBeforeEnter,
          path: '/admin/product/:productId',
          name: 'admin-product-edit',
          component: AdminProductView,
        },
        {
          beforeEnter: adminBeforeEnter,
          path: '/admin/product/create',
          name: 'admin-product-create',
          component: AdminProductView,
        },
      ],
    },
  ],
})

export default router
