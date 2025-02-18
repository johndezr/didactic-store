import { ProductsServices } from '@/services/Product'

export const ProductsUseCases = {
  getProducts: (limit: number, offset: number) => ProductsServices.getProducts(limit, offset),
}
