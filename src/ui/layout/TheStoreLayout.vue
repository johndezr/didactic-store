<template>
  <TheNavbar />
  <main class="md:py-16 py-8">
    <RouterView />
  </main>
  <TheFooter />
</template>

<script setup lang="ts">
import TheNavbar from '@/ui/layout/TheNavbar.vue'
import TheFooter from '@/ui/layout/TheFooter.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
