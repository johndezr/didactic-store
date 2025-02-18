import type { Product } from '@/domain/models/Product'
import { useQuery } from '@tanstack/vue-query'
import { ProductsUseCases } from '@/domain/usecases/Product'
import { computed, ref, watch } from 'vue'

const useProduct = () => {
  const limit = ref(8)
  const offset = ref(0)
  const products = ref<Product[]>([])

  const { isPending, isError, data, error, isLoading } = useQuery({
    queryKey: ['products', limit, offset],
    queryFn: () => ProductsUseCases.getProducts(limit.value, offset.value),
  })

  // TODO: Move to a utility function
  const parseUrlImages = (product: Product) => {
    const images = product.images.map(
      (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
    )
    return {
      ...product,
      images,
      defaultImage: images[0],
    }
  }

  watch(data, (newProducts) => {
    const parsedProducts = newProducts!.map(parseUrlImages)
    products.value = [...products.value, ...parsedProducts]
  })

  const fetchMoreProducts = () => {
    offset.value += limit.value
  }

  const hasMoreProducts = computed(() => {
    return data.value && data.value.length >= limit.value
  })

  const err = computed(() => {
    return error
  })
  console.log(err.value)

  return {
    products,
    hasMoreProducts,
    isLoading,
    isError,
    error,
    isPending,
    fetchMoreProducts,
  }
}

export default useProduct
