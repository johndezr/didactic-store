<script setup lang="ts">
import useProduct from '@/composables/useProduct'
import ProductCard from '@/ui/components/ProductCard.vue'

const { products, isLoading, isPending, isError, fetchMoreProducts, hasMoreProducts } = useProduct()
</script>

<template>
  <main>
    <span v-if="isPending || isLoading">Loading...</span>
    <span v-else-if="isError">Error</span>
    <section v-else class="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
      <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div class="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
        <div class="w-full text-center">
          <button
            v-if="hasMoreProducts"
            @click="fetchMoreProducts"
            type="button"
            class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Show more
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
