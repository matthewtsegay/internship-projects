<template>
  <div
    class="group w-full h-auto p-6 bg-emerald-50 border border-gray-100 rounded-2xl flex flex-col justify-between 
           shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 hover:-translate-y-1 transition-all duration-300 ease-out"
  >
    <div class="space-y-3">
      <div class="flex justify-between items-start">
          <div class="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold text-lg">
              {{ user.name.charAt(0).toUpperCase() }}
          </div>
          <span class="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
              {{ user.source }}
          </span>
      </div>
      
      <div>
        <h2 class="text-xl font-bold text-gray-800 tracking-tight group-hover:text-emerald-700 transition-colors">{{ user.name }}</h2>
        <p class="text-gray-500 text-sm font-medium mt-1 truncate">{{ user.email }}</p>
        <p class="text-gray-400 text-xs mt-2">{{ new Date(user.date).toLocaleDateString() }}</p>
      </div>
    </div>

    <div class="mt-6 flex gap-3 pt-4 border-t border-gray-50 opacity-80 group-hover:opacity-100 transition-opacity">
      <button
        class="flex-1 bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:border-red-300 text-sm px-4 py-2 rounded-lg font-semibold transition-all duration-200"
        @click="$emit('delete', user.id)"
      >
        Delete
      </button>
      <button
        class="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md font-semibold transition-all duration-200"
        @click="$emit('block', user.id)"
      >
        Block
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['user'])
</script>
