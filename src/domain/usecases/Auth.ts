import { AuthServices } from '@/services/Auth'

export const AuthUseCases = {
  login: (email: string, password: string) => AuthServices.login(email, password),
  signup: (fullName: string, email: string, password: string) =>
    AuthServices.signup(fullName, email, password),
}
