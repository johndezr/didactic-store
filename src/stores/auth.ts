import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/domain/models/User'
import { AuthStatus } from '@/domain/models/Auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>()
  const token = ref('')
  const status = ref<AuthStatus>(AuthStatus.UNAUTHENTICATED)

  const userFullName = computed(() => user.value?.fullName)
  const isUserAdmin = computed(() => user.value?.roles.includes('admin'))
  const isUserAuthenticated = computed(() => status.value === AuthStatus.AUTHENTICATED)

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }
  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }
  const setStatus = (authStatus: AuthStatus) => {
    status.value = authStatus
  }
  const handleRememberMe = (rememberMe: boolean, email: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    rememberMe ? localStorage.setItem('email', email) : localStorage.removeItem('email')
  }
  const setAuthInfo = ({
    user,
    token,
    status,
  }: {
    user: User | null
    token: string
    status: AuthStatus
  }) => {
    setUser(user)
    setToken(token)
    setStatus(status)
  }

  return {
    user,
    status,
    token,
    userFullName,
    isUserAdmin,
    isUserAuthenticated,
    setAuthInfo,
    setUser,
    setToken,
    setStatus,
    handleRememberMe,
  }
})
