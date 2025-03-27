<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-4 sm:grid-cols-2">
      <CustomInput label="Title" name="title" />
      <CustomInput label="Slug" name="slug" />
      <CustomInput label="Stock" name="stock" type="number" />
      <CustomInput label="Price" name="price" type="number" />
      <div>
        <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Sizes</h3>
        <ul
          class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <li
            class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            v-for="(defaultSize, index) in defSizes"
            :key="index"
          >
            <div class="flex items-center ps-3">
              <label
                :for="`checkbox-list-${index}`"
                class="w-6 py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >{{ defaultSize }}</label
              >
              <Field
                :id="`checkbox-list-${index}`"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                name="sizes"
                type="checkbox"
                :value="defaultSize"
              />
            </div>
          </li>
        </ul>
        <ErrorMessage name="sizes" class="text-red-500" v-if="errors.sizes">{{
          errors.sizes
        }}</ErrorMessage>
      </div>
      <div>
        <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Gender</label
        >
        <Field
          as="select"
          id="gender"
          name="gender"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option disabled value="">Please select one</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
          <option value="unisex">Unisex</option>
        </Field>
        <ErrorMessage name="gender" class="text-red-500" v-if="errors.gender">{{
          errors.gender
        }}</ErrorMessage>
      </div>
      <div class="sm:col-span-2">
        <label
          for="description"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Description</label
        >
        <Field
          type="textarea"
          id="description"
          rows="5"
          name="description"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Write a description..."
        ></Field>
        <ErrorMessage name="description" class="text-red-500" v-if="errors.description">{{
          errors.description
        }}</ErrorMessage>
      </div>
    </div>

    <template v-if="product">
      <p class="mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</p>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="(url, index) in product.images" :key="index">
          <img class="h-auto max-w-full rounded-lg" :src="url" />
        </div>
      </div>
    </template>
    <div class="flex items-center space-x-4">
      <button
        type="submit"
        class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm, handleSubmit as formSubmit, ErrorMessage, Field } from 'vee-validate'
import { defineProps, defineEmits, ref, watch } from 'vue'
import Product from '@/domain/models/Product'
import CustomInput from '@/ui/components/CustomInput.vue'
import * as yup from 'yup'

const emit = defineEmits(['handleSubmit'])
const props = defineProps<{
  product: Product
}>()

const defSizes = ref(['XS', 'S', 'M', 'L', 'XL', 'XXL'])

const {
  handleSubmit: formSubmit,
  resetForm,
  errors,
} = useForm({
  validationSchema: yup.object({
    title: yup.string().required().min(3),
    slug: yup.string().required(),
    stock: yup.number().required().min(1),
    price: yup.number().required(),
    sizes: yup.array().required().min(1),
    description: yup.string().required(),
    gender: yup.string().required().oneOf(['men', 'women', 'kid', 'unisex']),
    // images: yup.array().of(
    //   yup.object({
    //     url: yup.string().required(),
    //   }),
    // ),
  }),
})

const onSubmit = formSubmit((values) => {
  emit('handleSubmit', values)
})

watch(
  () => props.product,
  async (product) => {
    resetForm({ values: product })
  },
)
</script>

<style scoped></style>
