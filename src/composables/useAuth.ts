import { AuthUseCases } from '@/domain/usecases/Auth'
import { useAuthStore } from '@/stores/auth'
import { AuthStatus } from '@/domain/models/Auth'
import type { User } from '@/domain/models/User'
import { useRouter } from 'vue-router'

type LoginAuthParams = Partial<User> & {
  rememberMe: boolean
  password: string
}

type SingupAuthParams = Partial<User> & {
  password: string
}

const useAuth = () => {
  const { setAuthInfo, handleRememberMe } = useAuthStore()
  const $router = useRouter()

  const onLogin = async ({ email, password, rememberMe }: LoginAuthParams) => {
    try {
      const { user, token } = await AuthUseCases.login(email!, password)
      setAuthInfo({ user, token, status: AuthStatus.AUTHENTICATED })
      handleRememberMe(rememberMe, email!)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  const onSignup = async ({ fullName, email, password }: SingupAuthParams) => {
    try {
      const { user, token } = await AuthUseCases.signup(fullName!, email!, password)
      setAuthInfo({ user, token, status: AuthStatus.AUTHENTICATED })
    } catch (error) {
      return Promise.reject(error)
    }
  }
  const logout = () => {
    setAuthInfo({
      user: null,
      token: '',
      status: AuthStatus.UNAUTHENTICATED,
    })
    localStorage.removeItem('token')
    $router.push({ name: 'login' })
  }

  return {
    onLogin,
    onSignup,
    logout,
  }
}

export default useAuth
