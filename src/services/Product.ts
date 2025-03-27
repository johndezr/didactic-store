import type { Product } from '@/domain/models/Product'
import enhancedFetch from '@/libs/enhacedFetch'

const getProducts = async (limit: number = 8, offset: number = 0): Promise<Product[]> => {
  try {
    const products = (await enhancedFetch(
      `products?limit=${limit}&offset=${offset}`,
      {},
    )) as Product[]
    return products
  } catch (error) {
    throw error
  }
}

const getProductById = async (id: number): Promise<Product> => {
  try {
    const product = (await enhancedFetch(`products/${id}`, {})) as Product
    return product
  } catch (error) {
    throw error
  }
}

const createProduct = async (product: Partial<Product>): Promise<Product> => {
  try {
    const createdProduct = (await enhancedFetch(`products`, {
      token: localStorage.getItem('token')!,
      body: JSON.stringify(product),
      method: 'POST',
    })) as Product
    return createdProduct
  } catch (error) {
    throw error
  }
}

const updateProduct = async (id: number, product: Partial<Product>): Promise<Product> => {
  try {
    const updatedProduct = (await enhancedFetch(`products/${id}`, {
      body: JSON.stringify(product),
      token: localStorage.getItem('token')!,
      method: 'PATCH',
    })) as Product
    return updatedProduct
  } catch (error) {
    throw error
  }
}

const deleteProduct = async (id: number): Promise<void> => {
  try {
    await enhancedFetch(`products/${id}`, {
      token: localStorage.getItem('token')!,
      method: 'DELETE',
    })
  } catch (error) {
    throw error
  }
}

export const ProductsServices = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
