<template>
  <section class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 md:py-8">
    <div class="px-4 mx-auto max-w-screen-xl">
      <RouterLink
        class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        as="button"
        to="/admin"
        >Go back</RouterLink
      >
      <h3 class="text-2xl mt-6 mb-6 text-gray-700">
        {{ productId ? 'Update' : 'Create' }} product
      </h3>
      <ProductForm @handleSubmit="handleSubmit" :product="product" />
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductForm from '@/ui/components/ProductForm.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import useProduct from '@/composables/useProduct'

const route = useRoute()
const productId = computed(() => route.params?.productId)

const { product, createNewProduct, updateProduct } = useProduct(productId.value)
const handleSubmit = async (product) => {
  if (productId.value) {
    await updateProduct(product)
  } else {
    await createNewProduct(product)
  }
}
</script>

<style scoped></style>
