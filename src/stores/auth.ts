import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/domain/models/User'
import { AuthStatus } from '@/domain/models/Auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>()
  const token = ref('')
  const status = ref<AuthStatus>(AuthStatus.UNAUTHENTICATED)

  const setAuthInfo = (newUser: User | null, newToken: string, authStatus: AuthStatus) => {
    user.value = newUser
    token.value = newToken
    status.value = authStatus
  }

  const getUserFullName = computed(() => user.value?.fullName)
  const isUserAdmin = computed(() => user.value?.roles.includes('admin'))

  return {
    user,
    token,
    setAuthInfo,
    getUserFullName,
    isUserAdmin,
  }
})
