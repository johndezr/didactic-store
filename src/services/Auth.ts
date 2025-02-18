import enhancedFetch from '@/libs/enhacedFetch'
import type { AuthResponse } from '@/domain/models/Auth'

const login = async (email: string, password: string) => {
  try {
    const authData = (await enhancedFetch('auth/login', { email, password })) as AuthResponse
    // TODO: Handle error
    if (authData.statusCode !== 200) {
      return Promise.reject(new Error('Bad Request'))
    }
    console.log(authData.statusCode)
    return authData
  } catch (error) {
    return Promise.reject(error)
  }
}

export const AuthServices = {
  login,
}
