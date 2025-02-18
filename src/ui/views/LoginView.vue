<template>
  <div>
    <LoginCard @onLogin="handleFormSubmit" />
  </div>
</template>

<script setup lang="ts">
import useAuth from '@/composables/useAuth'
import LoginCard from '@/ui/components/LoginCard.vue'
import { User } from '../../domain/models/User'
import { useToast } from 'vue-toast-notification'

const { onLogin } = useAuth()
const $toast = useToast()

const handleFormSubmit = async (formData: User) => {
  try {
    await onLogin(formData)
    $toast.success('You did it!')
  } catch (error) {
    $toast.error('Something went wrong!', { position: 'top-right' })
  }
}
</script>

<style scoped></style>
