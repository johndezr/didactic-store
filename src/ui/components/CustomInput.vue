<template>
  <div>
    <label :for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{
      label
    }}</label>
    <input
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
      v-model="value"
      :type="type"
      :class="[
        errors.length
          ? 'border-red-500 dark:focus:border-red-500 focus:ring-red-500 focus-visible:border-red-500'
          : 'focus:border-primary-600 dark:focus:border-primary-500 focus:ring-primary-600',
      ]"
      :name="name"
    />
    <ul v-if="errors.length">
      <li v-for="(error, index) in errors" :key="index">
        <ErrorMessage :name="name" class="my-2 text-red-500">{{ error }}</ErrorMessage>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useField, ErrorMessage } from 'vee-validate'

const props = withDefaults(
  defineProps<
    {
      name: string
      type?: string
      label: string
    },
    {
      value: string
      errors: string[]
    }
  >(),
  {
    type: 'text',
  },
)

const { value, errors } = useField(() => props.name)
</script>
