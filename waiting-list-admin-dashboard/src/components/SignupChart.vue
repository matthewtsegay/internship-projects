<template>
    <div class="bg-emerald-50 rounded-2xl p-6 shadow-sm border border-gray-100 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4 text-gray-800 tracking-tight">Signups by Source</h2>
      <div class="space-y-3">
        <div
          v-for="(count, source) in counts"
          :key="source"
          class="flex items-center justify-between p-3 rounded-xl transition-all duration-200
                 bg-gray-50 hover:bg-emerald-50 group"
        >
          <div class="flex items-center space-x-4">
            <div class="p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-200">
                <template v-if="source === 'Facebook'">
                <FacebookIcon class="w-5 h-5 text-blue-600" />
                </template>
                <template v-else-if="source === 'Instagram'">
                <InstagramIcon class="w-5 h-5 text-pink-600" />
                </template>
                <template v-else-if="source === 'Google'">
                <GoogleIcon class="w-5 h-5 text-red-600" />
                </template>
                <template v-else>
                    <div class="w-5 h-5 bg-gray-200 rounded-full"></div>
                </template>
            </div>
            <span class="text-gray-700 font-medium">{{ source }}</span>
          </div>
          <span class="text-gray-900 font-extrabold text-lg group-hover:text-emerald-600 transition-colors">{{ count }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { Facebook as FacebookIcon, Instagram as InstagramIcon, Chrome as GoogleIcon } from 'lucide-vue-next'
  
  const props = defineProps(['users'])
  
  const counts = computed(() => {
    const result = {}
    props.users.forEach(user => {
      result[user.source] = (result[user.source] || 0) + 1
    })
    return result
  })
  </script>
  