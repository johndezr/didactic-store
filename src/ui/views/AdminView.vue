<template>
  <span v-if="isPending || isLoading">Loading...</span>
  <span v-else-if="isError">Error</span>
  <section v-else class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 md:py-8">
    <div class="px-4 mx-auto max-w-screen-xl">
      <div class="flex justify-between items-baseline">
        <h1 class="text-2xl mt-6 mb-10 text-gray-700">Products list</h1>
        <RouterLink
          to="/admin/product/create"
          as="button"
          type="button"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          New product
        </RouterLink>
      </div>
      <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-4 py-3">Product</th>
                <th scope="col" class="px-4 py-3">Sizes</th>
                <th scope="col" class="px-4 py-3">Stock</th>
                <th scope="col" class="px-4 py-3">Price</th>
                <th scope="col" class="px-4 py-3">Gender</th>
                <th scope="col" class="px-4 py-3">Tags</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="products in pages">
                <tr
                  v-for="product in products"
                  :key="product.id"
                  class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <RouterLink
                    :to="`/admin/product/${product.id}?action=edit`"
                    as="td"
                    scope="row"
                    class="flex hover:underline items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img :src="product.defaultImage" :alt="product.title" class="w-auto h-8 mr-3" />
                    {{ product.title }}
                  </RouterLink>
                  <td class="px-4 py-2">
                    <span
                      v-for="(size, index) in product.sizes"
                      :key="index"
                      class="bg-primary-100 text-primary-800 text-xs font-medium px-2 mx-0.5 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"
                      >{{ size }}</span
                    >
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div class="flex items-center">
                      <div class="inline-block w-4 h-4 mr-2 bg-green-500 rounded-full"></div>
                      {{ product.stock }}
                    </div>
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    €{{ product.price }}
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ product.gender }}
                  </td>
                  <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span class="mx-0.5" v-for="(tag, index) in product.tags" :key="index">
                      {{ tag }}
                    </span>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="w-full text-center my-4">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import useProducts from '@/composables/useProducts'
const { pages, isLoading, isPending, isError, fetchMoreProducts, hasMoreProducts } = useProducts()
</script>

<style scoped></style>
