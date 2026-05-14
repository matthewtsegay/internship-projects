<template>
    <div class="min-h-screen w-full p-6 bg-gray-50 text-gray-800 transition-colors duration-500 ease-in-out">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-emerald-800 text-4xl font-extrabold mb-10 text-center tracking-tight">Admin Dashboard</h1>
        
        <SearchFilter
          :search="searchQuery"
          :source="filterSource"
          @update:search="val => searchQuery = val"
          @update:source="val => filterSource = val"
        />

        <div v-if="paginatedUsers.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8">
          <UserCard
            v-for="user in paginatedUsers"
            :key="user.id"
            :user="user"
            @delete="deleteUser"
            @block="blockUser"
          />
        </div>
        <div v-else class="text-center py-20 text-gray-500">
            <p class="text-xl">No users found matching your criteria.</p>
        </div>
  
        <Pagination
          v-if="filteredUsers.length > 0"
          :current-page="currentPage"
          :total="filteredUsers.length"
          :per-page="perPage"
          @change="page => currentPage = page"
        />
  
        <div class="flex justify-between items-center mt-12 border-t pt-8 border-gray-200">
          <SignupChart :users="users" />
          
          <button 
            @click="exportCSV(filteredUsers)"
            class="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-emerald-200/50 transform hover:-translate-y-1 transition-all duration-300 ease-in-out font-bold flex items-center gap-2"
          >
            <span>Export CSV</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import mockData from '../mockData.js'
  import SearchFilter from '../components/SearchFilter.vue'
  import UserCard from '../components/UserCard.vue'
  import Pagination from '../components/Pagination.vue'
  import SignupChart from '../components/SignupChart.vue'
  import { exportCSV } from '../utils/exportCSV.js'
  
  const users = ref(mockData)
  const searchQuery = ref('')
  const filterSource = ref('')
  const currentPage = ref(1)
  const perPage = 6
  
  const filteredUsers = computed(() => {
    return users.value.filter(user =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterSource.value === '' || user.source === filterSource.value)
    )
  })
  
  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * perPage
    return filteredUsers.value.slice(start, start + perPage)
  })
  
  function deleteUser(id) {
    if (confirm("Are you sure to delete this user?")) {
      users.value = users.value.filter(user => user.id !== id)
    }
  }
  
  function blockUser(id) {
    if (confirm("Block this user?")) {
      alert(`User ${id} blocked (mock action)`)
    }
  }
  </script>
  