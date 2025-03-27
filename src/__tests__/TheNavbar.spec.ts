import TheNavbar from '@/ui/layout/TheNavbar.vue'
import { mount } from '@vue/test-utils'
import { describe, it, vi, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { AuthStatus } from '@/domain/models/Auth'

const onLogoutFn = vi.fn()
const useAuthMock = (overrides = {}) => ({
  logout: onLogoutFn,
  ...overrides,
})

vi.mock('@/composables/useAuth', () => {
  return {
    default: vi.fn(() => useAuthMock()),
  }
})

const createWrapper = (initialState = {}) => {
  return mount(TheNavbar, {
    global: {
      stubs: ['RouterLink'],
      plugins: [
        createTestingPinia({
          initialState: {
            auth: {
              user: {
                fullName: 'test',
                roles: ['admin'],
              },
              status: AuthStatus.AUTHENTICATED,
              ...initialState,
            },
          },
          createSpy: vi.fn,
        }),
      ],
    },
  })
}

describe('<TheNavbar/>', () => {
  it('should render TheNavbar component', () => {
    const wrapper = createWrapper()
    expect(wrapper.exists()).toBe(true)
  })

  it('should show admin button if isUserAdmin', () => {
    const wrapper = createWrapper()
    expect(wrapper.find('router-link-stub[data-test="admin-button-link"]').exists()).toBe(true)
  })

  it('should not show admin button if user is not admin', () => {
    const wrapper = createWrapper({
      user: {
        fullName: 'test',
        roles: ['user'],
      },
    })
    expect(wrapper.find('router-link-stub[data-test="admin-button-link"]').exists()).toBe(false)
  })

  it('should call logout when logout button is clicked', async () => {
    const wrapper = createWrapper()
    await wrapper.find('button[data-test="logout-button"]').trigger('click')
    expect(onLogoutFn).toHaveBeenCalled()
  })
})
