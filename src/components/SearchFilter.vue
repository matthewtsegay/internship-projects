<template>
  <div class="flex flex-col sm:flex-row gap-4 mb-8 relative p-1">
    <!-- Search Input -->
    <div class="relative flex-grow group">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
        </svg>
      </div>
      <input
        :value="search"
        @input="$emit('update:search', $event.target.value)"
        placeholder="Search users by name..."
        @focus="isSearchFocused = true"
        @blur="isSearchFocused = false"
        :class="[
          'w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none text-gray-700 placeholder-gray-400',
          isSearchFocused ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'border-gray-200 bg-emerald-50 hover:border-emerald-300',
          'transition-all duration-300 ease-in-out']"
      />
    </div>

    <!-- Custom Dropdown -->
    <div class="relative w-full sm:w-56">
      <button
        @click="toggleDropdown"
        @blur="closeDropdown"
        :class="[
          'w-full border-2 px-4 py-3 rounded-xl bg-emerald-50 text-left flex justify-between items-center text-gray-700 font-medium',
          isOpen ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'border-gray-200 hover:border-emerald-300',
          'transition-all duration-300 ease-in-out']"
      >
        <span class="truncate">{{ selectedLabel }}</span>
        <svg class="w-5 h-5 text-gray-400 transition-transform duration-300"
             :class="{'rotate-180 text-emerald-500': isOpen}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ul
          v-if="isOpen"
          class="absolute w-full mt-2 border border-gray-100 rounded-xl bg-emerald-50 shadow-xl z-20 overflow-hidden py-1"
        >
          <li
            v-for="(label, value) in options"
            :key="value"
            @mousedown.prevent="selectOption(value)"
            class="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-gray-700 hover:text-emerald-700 transition-colors duration-200 flex items-center justify-between"
          >
            {{ label }}
            <span v-if="source === value" class="text-emerald-500">✓</span>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps(['search', 'source'])
const emit = defineEmits(['update:search', 'update:source'])

const isOpen = ref(false)
const isSearchFocused = ref(false)

const options = {
  '': 'All Sources',
  Facebook: 'Facebook',
  Instagram: 'Instagram',
  Google: 'Google',
  Website: 'Website',
}

const selectedLabel = computed(() => options[props.source] ?? 'All Sources')

function selectOption(value) {
  emit('update:source', value)
  isOpen.value = false
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  // Delay to allow click event to register before closing
  setTimeout(() => (isOpen.value = false), 150)
}
</script>
