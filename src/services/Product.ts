import type { Product } from '@/domain/models/Product'
import enhancedFetch from '@/libs/enhacedFetch'

const getProducts = async (limit: number = 8, offset: number = 0): Promise<Product[]> => {
  try {
    const products = (await enhancedFetch(`products?limit=${limit}&offset=${offset}`)) as Product[]
    return products
  } catch (error) {
    throw error
  }
}

export const ProductsServices = {
  getProducts,
}
