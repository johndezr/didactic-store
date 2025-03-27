import { useQuery, useMutation } from '@tanstack/vue-query'
import { computed } from 'vue'
import { ProductsUseCases } from '@/domain/usecases/Product'
import type { Product } from '@/domain/models/Product'

const useProduct = (id) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductsUseCases.getProduct(id),
    enabled: !!id,
    select: (data) => {
      return {
        ...data,
        images: data.images.map(
          (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
        ),
        defaultImage: `${import.meta.env.VITE_API_URL}/files/product/${data.images[0]}`,
      }
    },
  })

  const { mutate: createNewProduct } = useMutation({
    mutationFn: (product: Partial<Product>) => ProductsUseCases.createProduct(product),
  })
  const { mutate: updateProduct } = useMutation({
    mutationFn: (product: Partial<Product>) => {
      delete product.defaultImage
      delete product.id
      delete product.user

      product.images = product.images ? product.images.map((image) => image.split('/').pop()!) : []
      return ProductsUseCases.updateProduct(id, product)
    },
  })
  const { mutate: deleteProduct } = useMutation({
    mutationFn: () => ProductsUseCases.deleteProduct(id),
  })

  return {
    product: data,
    createNewProduct,
    updateProduct,
    deleteProduct,
    isError: computed(() => isError.value),
  }
}

export default useProduct
