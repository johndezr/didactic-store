<template>
  <TheNavbar />
  <RouterView />
  <TheFooter />
</template>

<script setup lang="ts">
import TheNavbar from '@/ui/layout/TheNavbar.vue'
import TheFooter from '@/ui/layout/TheFooter.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped></style>
