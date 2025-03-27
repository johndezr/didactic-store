<template>
  <nav
    class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
  >
    <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-8">
          <div class="shrink-0">
            <RouterLink to="/">
              <img
                class="block w-auto h-8 dark:hidden"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg"
                alt=""
              />
              <img
                class="hidden w-auto h-8 dark:block"
                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg"
                alt=""
              />
            </RouterLink>
          </div>

          <ul
            class="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center"
          >
            <li>
              <a
                href="#"
                title=""
                class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                Home
              </a>
            </li>
            <li class="shrink-0">
              <a
                href="#"
                title=""
                class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                Best Sellers
              </a>
            </li>
            <li class="shrink-0">
              <a
                href="#"
                title=""
                class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                Gift Ideas
              </a>
            </li>
            <li class="shrink-0">
              <a
                href="#"
                title=""
                class="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                Today's Deals
              </a>
            </li>
            <li class="shrink-0">
              <a
                href="#"
                title=""
                class="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
              >
                Sell
              </a>
            </li>
          </ul>
        </div>

        <div class="flex items-center lg:space-x-2">
          <template v-if="store.isUserAuthenticated">
            <RouterLink
              v-if="store.isUserAdmin"
              as="button"
              to="/admin"
              type="button"
              data-test="admin-button-link"
              class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >Admin panel</RouterLink
            >
            <button
              type="button"
              @click="logout"
              data-test="logout-button"
              class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </template>
          <RouterLink
            v-else
            to="/auth/login"
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Login / Signup
          </RouterLink>

          <div
            id="userDropdown1"
            class="hidden z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700"
          >
            <ul class="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
              <li>
                <a
                  href="#"
                  title=""
                  class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title=""
                  class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  My Orders
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title=""
                  class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title=""
                  class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Favourites
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title=""
                  class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Delivery Addresses
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title=""
                  class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Billing Data
                </a>
              </li>
            </ul>

            <div class="p-2 text-sm font-medium text-gray-900 dark:text-white">
              <a
                href="#"
                title=""
                class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Sign Out
              </a>
            </div>
          </div>

          <button
            type="button"
            data-collapse-toggle="ecommerce-navbar-menu-1"
            aria-controls="ecommerce-navbar-menu-1"
            aria-expanded="false"
            class="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white"
          >
            <span class="sr-only"> Open Menu </span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="ecommerce-navbar-menu-1"
        class="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 hidden px-4 mt-4"
      >
        <ul class="text-gray-900 dark:text-white text-sm font-medium space-y-3">
          <li>
            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Home</a>
          </li>
          <li>
            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Best Sellers</a>
          </li>
          <li>
            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Gift Ideas</a>
          </li>
          <li>
            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Games</a>
          </li>
          <li>
            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Electronics</a>
          </li>
          <li>
            <a href="#" class="hover:text-primary-700 dark:hover:text-primary-500">Home & Garden</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import useAuth from '@/composables/useAuth'

const store = useAuthStore()
const { logout } = useAuth()
</script>

<style scoped></style>
