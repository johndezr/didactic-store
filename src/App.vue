<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from '@/stores/auth'
import { AuthServices } from '@/services/Auth'
import { AuthStatus } from '@/domain/models/Auth'
import { useRoute, useRouter } from 'vue-router'

const store = useAuthStore()
const route = useRoute()
const router = useRouter()

store.$subscribe(
  async (mutations, state) => {
    const token = localStorage.getItem('token')
    const authStatus = state.status

    if (token && authStatus === AuthStatus.UNAUTHENTICATED) {
      try {
        const { user, token: newToken } = await AuthServices.refreshToken(token)
        store.setAuthInfo({ user, token: newToken, status: AuthStatus.AUTHENTICATED })
      } catch (err) {
        console.log('Error refreshing token', err)
        // store.logout()
      }
    }

    if (route.path.includes('/auth') && authStatus === AuthStatus.AUTHENTICATED) {
      router.push('/')
    }
  },
  { immediate: true },
)
</script>

<template>
  <RouterView />
  <VueQueryDevtools />
</template>

<style scoped></style>
