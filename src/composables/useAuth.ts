import { AuthUseCases } from '@/domain/usecases/Auth'
import { useAuthStore } from '@/stores/auth'
import { AuthStatus } from '@/domain/models/Auth'

const useAuth = () => {
  const { setAuthInfo } = useAuthStore()
  const onLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { user, token } = await AuthUseCases.login(email, password)
      setAuthInfo(user, token, AuthStatus.AUTHENTICATED)
    } catch (error) {
      setAuthInfo(null, '', AuthStatus.UNAUTHENTICATED)
      return Promise.reject(error)
    }
  }

  return {
    onLogin,
  }
}

export default useAuth
