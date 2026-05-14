<template>
  <div class="mt-10 flex justify-center items-center space-x-2 py-4">
    <!-- Prev Button -->
    <button
      :disabled="currentPage <= 1"
      @click="$emit('change', currentPage - 1)"
      class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
    >
      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      Previous
    </button>

    <!-- Page Numbers -->
    <div class="flex space-x-1">
        <button
        v-for="page in pages"
        :key="page"
        @click="$emit('change', page)"
        :class="[
            'w-10 h-10 rounded-lg text-sm font-semibold transition-all duration-200',
            currentPage === page
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
            : 'text-gray-600 hover:bg-gray-100'
        ]"
        >
        {{ page }}
        </button>
    </div>

    <!-- Next Button -->
    <button
      :disabled="currentPage >= pages.length"
      @click="$emit('change', currentPage + 1)"
      class="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-600 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
    >
      Next
      <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: Number,
  total: Number,
  perPage: Number
})

const pages = computed(() => {
  const totalPages = Math.ceil((props.total || 1) / (props.perPage || 1))
  return Array.from({ length: totalPages }, (_, i) => i + 1)
})
</script>
