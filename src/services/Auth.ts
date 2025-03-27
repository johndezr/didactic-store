import enhancedFetch from '@/libs/enhacedFetch'
import type { AuthResponse } from '@/domain/models/Auth'

// TODO: implement error handling
const authPromiseResponse = (authResponse: AuthResponse): Promise<AuthResponse> => {
  if (
    authResponse &&
    authResponse.statusCode &&
    authResponse.statusCode !== 200 &&
    authResponse.statusCode !== 201
  ) {
    switch (authResponse.statusCode) {
      case 401:
        return Promise.reject(new Error('Email or password is incorrect'))
      case 500:
        return Promise.reject(new Error('Internal server error'))
      case 400:
        return Promise.reject(new Error('Bad request'))
      default:
        return Promise.reject(new Error('Unknown error'))
    }
  } else {
    return Promise.resolve(authResponse)
  }
}

const login = async (email: string, password: string) => {
  try {
    const authResponse = (await enhancedFetch('auth/login', {
      body: JSON.stringify({ email, password }),
      method: 'POST',
    })) as AuthResponse
    return authPromiseResponse(authResponse)
  } catch (error) {
    return Promise.reject(error)
  }
}

const signup = async (fullName: string, email: string, password: string) => {
  try {
    const authResponse = (await enhancedFetch('auth/register', {
      body: JSON.stringify({ fullName, email, password }),
      method: 'POST',
    })) as AuthResponse
    return authPromiseResponse(authResponse)
  } catch (error) {
    return Promise.reject(error)
  }
}

const refreshToken = async (token: string) => {
  try {
    const authResponse = (await enhancedFetch('auth/check-status', {
      token,
    })) as AuthResponse
    return authPromiseResponse(authResponse)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const AuthServices = {
  login,
  signup,
  refreshToken,
}
