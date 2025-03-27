import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '@/ui/views/LoginView.vue'
import HomeView from '@/ui/views/HomeView.vue'
import LoginCard from '@/ui/components/LoginCard.vue'
import { createRouter, createWebHistory } from 'vue-router'
import SingupView from '@/ui/views/SignupView.vue'
import { beforeEach } from 'vitest'

const onLoginFn = vi.fn()
const useAuthMock = (overrides = {}) => ({
  onLogin: onLoginFn,
  ...overrides,
})

vi.mock('@/composables/useAuth', () => {
  return {
    default: vi.fn(() => useAuthMock()),
  }
})

const onToastError = vi.fn()
vi.mock('vue-toast-notification', async (original) => {
  const originalImpl = await original()
  return {
    ...(originalImpl as any),
    useToast: () => ({
      error: onToastError,
    }),
  }
})

const onPushRouter = vi.fn()
vi.mock('vue-router', async (original) => {
  const originalImpl = await original()
  return {
    ...(originalImpl as any),
    useRouter: () => ({
      push: onPushRouter,
    }),
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: SingupView,
    },
  ],
})

describe('<LoginView/>', () => {
  let wrapper = null
  const defaultCredentials = {
    email: 'test@example.com',
    password: 'test',
    rememberMe: false,
  }

  beforeEach(() => {
    wrapper = mount(LoginView, {
      props: {
        localStorageSavedInfo: {
          email: false,
        },
      },
      global: {
        plugins: [router],
      },
    })
    onLoginFn.mockClear()
    onToastError.mockClear()
    onPushRouter.mockClear()
  })

  it('render properly', async () => {
    expect(wrapper.findComponent(LoginCard).exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.exists()).toBe(true)
  })

  it('redirect home if login is ok', async () => {
    await wrapper.find('input[type="email"]').setValue(defaultCredentials.email)
    await wrapper.find('input[type="password"]').setValue(defaultCredentials.password)
    await wrapper.find('form').trigger('submit.prevent')

    expect(onLoginFn).toHaveBeenCalledWith(defaultCredentials)
    expect(onPushRouter).toHaveBeenCalledWith('/')
  })

  it('show error if login is not ok', async () => {
    const errorMessage = 'Email or password is incorrect'
    onLoginFn.mockRejectedValue(new Error(errorMessage))

    await (wrapper.vm as any).handleFormSubmit(defaultCredentials)

    expect(onToastError).toHaveBeenCalledWith(errorMessage)
  })
})
