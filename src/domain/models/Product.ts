import type { User } from '@/domain/models/User'

export type Product = {
  id: number
  title: string
  price: number
  images: string[]
  description: string
  stock: number
  slug: string
  createdAt: string
  updatedAt: string
  gender: string
  sizes: string[]
  tags: string[]
  user: User
  defaultImage?: string
}
