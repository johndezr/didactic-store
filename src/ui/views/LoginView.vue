<template>
  <LoginCard :localStorageSavedInfo="localStorageSavedInfo" @onLogin="handleFormSubmit" />
</template>

<script setup lang="ts">
import useAuth from '@/composables/useAuth'
import LoginCard from '@/ui/components/LoginCard.vue'
import { User } from '@/domain/models/User'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { reactive } from 'vue'

const { onLogin } = useAuth()
const $router = useRouter()
const $toast = useToast()

const localStorageSavedInfo = reactive({
  email: localStorage.getItem('email'),
})

const handleFormSubmit = async (formData: User) => {
  try {
    await onLogin(formData)
    $router.push('/')
  } catch {
    $toast.error('Email or password is incorrect')
  }
}
</script>

<style scoped></style>
