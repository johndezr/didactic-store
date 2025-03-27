import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SingupView from '@/ui/views/SignupView.vue'
import SignupCard from '@/ui/components/SignupCard.vue'

const onSignupFn = vi.fn()
const useAuthMock = (overrides = {}) => ({
  onSignup: onSignupFn,
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
const mockRouter = {
  push: onPushRouter,
}

vi.mock('vue-router', async (original) => {
  const originalImpl = await original()
  return {
    ...(originalImpl as any),
    useRouter: () => ({
      push: onPushRouter,
    }),
  }
})

describe('<SignupView/>', () => {
  const defaultCredentials = {
    name: 'test',
    email: 'test@example.com',
    password: 'test',
  }
  const wrapper = mount(SingupView, {
    props: {
      onSignup: onSignupFn,
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
      stubs: ['router-link'],
    },
  })
  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.findComponent(SignupCard).exists()).toBe(true)
  })

  it('redirect home if singup is ok', async () => {
    await (wrapper.vm as any).handleFormSubmit(defaultCredentials)

    expect(onSignupFn).toHaveBeenCalledWith(defaultCredentials)
    expect(mockRouter.push).toHaveBeenCalledWith('/')
  })
  it('show error toast if singup is not ok', async () => {
    const errorMessage = `Something went wrong!`
    onSignupFn.mockRejectedValue(new Error(errorMessage))

    await (wrapper.vm as any).handleFormSubmit(defaultCredentials)

    expect(onToastError).toHaveBeenCalledWith(errorMessage, {
      position: 'top-right',
    })
    expect(onToastError).toHaveBeenCalledTimes(1)
  })
})
