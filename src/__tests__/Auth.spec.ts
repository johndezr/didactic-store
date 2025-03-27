import { describe, it, vi, expect, beforeEach } from 'vitest'
import { authBeforeEnter } from '@/libs/authBeforeEnter'
import { useAuthStore } from '@/stores/auth'
import { AuthServices } from '@/services/Auth'
import { AuthStatus } from '@/domain/models/Auth'
import { nextTick } from 'vue'

const onLogout = vi.fn()
const useAuthMock = (overrides = {}) => ({
  logout: onLogout,
  ...overrides,
})

vi.mock('@/stores/auth')
vi.mock('@/services/Auth')
vi.mock('@/composables/useAuth', () => {
  return {
    default: vi.fn(() => useAuthMock()),
  }
})

describe('authBeforeEnter', () => {
  let mockStore = null
  let mockNext: vi.Mock

  beforeEach(() => {
    mockStore = {
      setAuthInfo: vi.fn(),
      status: AuthStatus.UNAUTHENTICATED,
    }
    mockNext = vi.fn()
    ;(useAuthStore as vi.Mock).mockReturnValue(mockStore)
  })

  it('should call next() if there is no token', async () => {
    localStorage.setItem('token', '')

    await authBeforeEnter({}, {}, mockNext)

    expect(mockNext).toHaveBeenCalled()
  })

  it('should refresh token and set auth info if token is valid', async () => {
    const mockToken = 'valid-token'
    const mockUser = { id: 1, name: 'John Doe' }
    localStorage.setItem('token', mockToken)
    ;(AuthServices.refreshToken as vi.Mock).mockResolvedValue({
      user: mockUser,
      token: 'new-token',
      status: AuthStatus.AUTHENTICATED,
    })
    mockStore.status = AuthStatus.AUTHENTICATED

    await authBeforeEnter({}, {}, mockNext)
    await nextTick()

    expect(mockStore.setAuthInfo).toHaveBeenCalledWith({
      user: mockUser,
      token: 'new-token',
      status: AuthStatus.AUTHENTICATED,
    })
    expect(mockNext).toHaveBeenCalledWith({ name: 'home' })
  })

  it('should call logout and next() if token is invalid', async () => {
    const mockToken = 'invalid-token'
    localStorage.setItem('token', mockToken)
    ;(AuthServices.refreshToken as vi.Mock).mockRejectedValue(new Error('Invalid token'))

    await authBeforeEnter({}, {}, mockNext)
    await nextTick()

    expect(onLogout).toHaveBeenCalled()
    expect(mockNext).toHaveBeenCalled()
  })
})
