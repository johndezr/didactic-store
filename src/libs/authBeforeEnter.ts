import { type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import useAuth from '@/composables/useAuth'
import { AuthServices } from '@/services/Auth'
import { AuthStatus } from '@/domain/models/Auth'

const refreshUserToken = async (store, token: string) => {
  const { logout } = useAuth()
  try {
    const { user, token: newToken } = await AuthServices.refreshToken(token)
    store.setAuthInfo({ user, token: newToken, status: AuthStatus.AUTHENTICATED })
  } catch {
    logout()
  }
}

export const authBeforeEnter = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const store = useAuthStore()
  const token = localStorage.getItem('token')

  if (!token) {
    return next()
  }

  await refreshUserToken(store, token)

  return store.status === AuthStatus.AUTHENTICATED ? next({ name: 'home' }) : next()
}
