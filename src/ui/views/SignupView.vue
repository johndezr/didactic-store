<template>
  <SignupCard @onSignup="handleFormSubmit" />
</template>

<script setup lang="ts">
import SignupCard from '@/ui/components/SignupCard.vue'
import { useToast } from 'vue-toast-notification'
import { useRouter } from 'vue-router'
import { User } from '@/domain/models/User'
import useAuth from '@/composables/useAuth'

const { onSignup } = useAuth()
const $router = useRouter()
const $toast = useToast()

const handleFormSubmit = async (formData: User) => {
  try {
    await onSignup(formData)
    $router.push('/')
  } catch {
    $toast.error('Something went wrong!', { position: 'top-right' })
  }
}
</script>

<style scoped></style>
