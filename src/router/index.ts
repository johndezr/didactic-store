import { createRouter, createWebHistory } from 'vue-router'
import TheStoreLayout from '@/ui/layout/TheStoreLayout.vue'
import TheHome from '@/ui/views/HomeView.vue'
import LoginView from '@/ui/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'store',
      component: TheStoreLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: TheHome,
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView,
        }
      ],
    },
  ],
})

export default router
