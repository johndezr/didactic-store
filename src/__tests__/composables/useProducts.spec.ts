import { vi, describe, expect, it, beforeEach } from 'vitest'
import { useInfiniteQuery } from '@tanstack/vue-query'
import useProducts from '@/composables/useProducts'
import type { Mock } from 'vitest'
import { ref } from 'vue'

const fakeProducts = [
  {
    id: '008ea87d-a16c-4c25-9de3-8a14bae089cd',
    title: 'Men’s Chill Crew Neck Sweatshirt',
    price: 75,
    description: 'Premium sweatshirt description',
    slug: 'mens_chill_crew_neck_sweatshirt',
    stock: 7,
    sizes: ['XS', 'S', 'L', 'XL', 'XXL'],
    gender: 'men',
    tags: ['sweatshirt'],
    images: ['1740176-00-A_0_2000.jpg', '1740176-00-A_1.jpg'],
  },
  {
    id: '007777d-a16c-4c25-9de3-8a9cd',
    title: 'Girl’s Chill Crew Neck Sweatshirt',
    price: 25,
    description: 'Sweatshirt description',
    slug: 'mens_chill_crew_neck_sweatshirt',
    stock: 7,
    sizes: ['XS', 'S', 'L', 'XL', 'XXL'],
    gender: 'women',
    tags: ['sweatshirt'],
    images: ['1740176-00-A_0_2000.jpg', '1740176-00-A_1.jpg'],
  },
]

const mockFetchNextPage = vi.fn()
const mockUseInfiniteQuery = (overrides = {}) => {
  return {
    data: ref({
      pages: [
        [
          {
            ...fakeProducts[0],
            images: fakeProducts[0].images.map(
              (image: string) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
            ),
            defaultImage: `${import.meta.env.VITE_API_URL}/files/product/${fakeProducts[0].images[0]}`,
          },
        ],
      ],
    }),
    fetchNextPage: mockFetchNextPage,
    hasNextPage: ref(true),
    isLoading: ref(false),
    ...overrides,
  }
}

vi.mock('@tanstack/vue-query', () => {
  return {
    useInfiniteQuery: vi.fn(),
  }
})

describe('useProducts', () => {
  beforeEach(() => {
    ;(useInfiniteQuery as Mock).mockReturnValue(mockUseInfiniteQuery())
  })

  it('should return products', () => {
    const { pages } = useProducts()
    expect(pages.value).toEqual([
      [
        {
          ...fakeProducts[0],
          images: fakeProducts[0].images.map(
            (image: string) => `${import.meta.env.VITE_API_URL}/files/product/${image}`,
          ),
          defaultImage: `${import.meta.env.VITE_API_URL}/files/product/${fakeProducts[0].images[0]}`,
        },
      ],
    ])
  })

  it('should return hasMoreProducts as true', () => {
    const { hasMoreProducts } = useProducts()
    expect(hasMoreProducts.value).toBe(true)
  })

  it('should return isLoading as false', () => {
    const { isLoading } = useProducts()
    expect(isLoading.value).toBe(false)
  })

  it('should call fetchNextPage when fetchMoreProducts is called', () => {
    const { fetchMoreProducts } = useProducts()
    fetchMoreProducts()
    expect(mockFetchNextPage).toHaveBeenCalled()
  })

  it('should handle errors when fetchNextPage fails', async () => {
    mockFetchNextPage.mockImplementationOnce(() => {
      throw new Error('Failed to fetch next page')
    })

    const { fetchMoreProducts } = useProducts()
    expect(() => fetchMoreProducts()).toThrow('Failed to fetch next page')
  })
})
