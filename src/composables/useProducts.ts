import type { Product } from '@/domain/models/Product'
import { useInfiniteQuery } from '@tanstack/vue-query'
import { ProductsUseCases } from '@/domain/usecases/Product'
import { computed, ref } from 'vue'

const useProducts = () => {
  const limit = ref(8)
  const offset = ref(0)

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: () => ProductsUseCases.getProducts(limit.value, offset.value),
    getNextPageParam: (products: Product[]) => {
      return products && products.length >= limit.value ? offset.value : undefined
    },
    select: (data) => {
      return {
        pages: data.pages.map((page) => {
          // TODO: Move to a utility function
          return page.map((product: Product) => {
            return {
              ...product,
              images: product.images.map(
                (image: string) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
              ),
              defaultImage: `${import.meta.env.VITE_API_URL}/files/product/${product.images[0]}`,
            }
          })
        }),
        pageParams: data.pageParams,
      }
    },
    initialPageParam: 0,
  })

  const fetchMoreProducts = () => {
    offset.value += limit.value
    fetchNextPage()
  }
  const hasMoreProducts = computed(() => {
    return hasNextPage.value
  })

  return {
    pages: computed(() => data.value?.pages),
    hasMoreProducts,
    isLoading,
    fetchMoreProducts,
  }
}

export default useProducts
