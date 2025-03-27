import { ProductsServices } from '@/services/Product'
import type { Product } from '@/domain/models/Product'

export const ProductsUseCases = {
  getProducts: (limit: number, offset: number) => ProductsServices.getProducts(limit, offset),
  getProduct: (id: number) => ProductsServices.getProductById(id),
  createProduct: (product: Partial<Product>) => ProductsServices.createProduct(product),
  updateProduct: (id: number, product: Partial<Product>) =>
    ProductsServices.updateProduct(id, product),
  deleteProduct: (id: number) => ProductsServices.deleteProduct(id),
}
