export type Roles = 'admin' | 'user'

export type User = {
  id: string
  email: string
  fullName: string
  isActive: boolean
  roles: Roles[]
}
