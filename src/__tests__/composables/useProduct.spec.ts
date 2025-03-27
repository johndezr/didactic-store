import { describe, it, vi, expect, beforeEach } from 'vitest'
import { useQuery, useMutation } from '@tanstack/vue-query'
import useProduct from '@/composables/useProduct'
import { ProductsUseCases } from '@/domain/usecases/Product'
import { ref } from 'vue'
import type { Mock } from 'vitest'

vi.mock('@tanstack/vue-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
}))

vi.mock('@/domain/usecases/Product', () => ({
  ProductsUseCases: {
    getProduct: vi.fn(),
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
  },
}))

describe('useProduct', () => {
  const mockProduct = {
    id: '123',
    title: 'Test Product',
    images: ['image1.jpg', 'image2.jpg'],
    description: 'A test product',
    price: 100,
    stock: 10,
    user: { id: 'user1' },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch a product by ID', async () => {
    const id = '123'
    const transformedProduct = {
      ...mockProduct,
      images: mockProduct.images.map(
        (image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
      ),
      defaultImage: `${import.meta.env.VITE_API_URL}/files/product/${mockProduct.images[0]}`,
    }
    const mockMutate = vi.fn()

    ;(useMutation as Mock).mockReturnValue({
      mutate: mockMutate,
    })
    ;(useQuery as Mock).mockReturnValue({
      data: ref(transformedProduct),
      isPending: ref(false),
      isError: ref(false),
      error: ref(null),
    })

    const { product } = useProduct(id)
    expect(product.value).toEqual(transformedProduct)
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['product', id],
      queryFn: expect.any(Function),
      enabled: !!id,
      select: expect.any(Function),
    })
  })

  it('should create a new product', async () => {
    const newProduct = { title: 'New Product', price: 50 }
    const mockMutate = ProductsUseCases.createProduct

    ;(useMutation as Mock).mockReturnValue({
      mutate: mockMutate,
    })

    const { createNewProduct } = useProduct(null)
    createNewProduct(newProduct)

    expect(mockMutate).toHaveBeenCalledWith(newProduct)
    expect(ProductsUseCases.createProduct).toHaveBeenCalledWith(newProduct)
  })

  it('should update an existing product', async () => {
    const id = '123'
    const updatedProduct = {
      ...mockProduct,
      title: 'Updated Product',
      images: [`image1.jpg`, `image2.jpg`],
    }
    const mockMutate = ProductsUseCases.updateProduct

    ;(useMutation as Mock).mockReturnValue({
      mutate: mockMutate,
    })

    const { updateProduct } = useProduct(id)
    updateProduct(updatedProduct)

    expect(mockMutate).toHaveBeenCalledWith(updatedProduct)
    expect(ProductsUseCases.updateProduct).toHaveBeenCalledWith({
      ...updatedProduct,
      images: updatedProduct.images.map((image) => image.split('/').pop()),
    })
  })

  it('should handle errors when fetching a product', async () => {
    const id = '123'
    const error = new Error('Failed to fetch product')

    ;(useQuery as Mock).mockReturnValue({
      data: ref(null),
      isPending: ref(false),
      isError: ref(true),
      error: ref(error),
    })

    const { product, isError } = useProduct(id)
    expect(product.value).toBeNull()
    expect(isError.value).toBe(true)
    expect(useQuery).toHaveBeenCalledWith({
      queryKey: ['product', id],
      queryFn: expect.any(Function),
      enabled: !!id,
      select: expect.any(Function),
    })
  })
})
