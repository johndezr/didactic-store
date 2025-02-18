import type { User } from './User'

export type AuthResponse = {
  user: User
  token: string
  statusCode?: number
}

export enum AuthStatus {
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}
