<script setup>
defineProps({
  modelValue: String,
  type: String,
  id: String,
  label: String,
  placeholder: String,
  required: Boolean,
  autocomplete: String,
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
    <div class="mb-4 flex justify-center">
      <div class="w-full max-w-md mx-auto"> 
        <label v-if="label" :for="id" class="block text-sm font-extrabold text-gray-100 mb-1">
          {{ label }}
        </label>
        <input
          :type="type"
          :id="id"
          :min="1"
          :required="required"
          :placeholder="placeholder"
          :value="modelValue"
          :autocomplete="autocomplete"
          @input="updateValue"
          class="block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
    </div>
  </template>
  