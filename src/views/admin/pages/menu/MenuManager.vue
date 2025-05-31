<template>
    <navbar />
    <div class="p-4 mb-100">
      <div class="bg-gray-100 px-4 py-2 sm:px-6 rounded-xl mb-6 shadow">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
          <h1 class="text-2xl font-semibold text-gray-800">menu page</h1>
          <div class="relative flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-1/2">
            <label for="search" class="block text-md font-semibold text-gray-700">Search</label>
            <div class="relative w-full">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-opacity duration-200"
                :class="{ 'opacity-0': searchTerm }">🔍</span>
              <input
                id="search"
                v-model="searchTerm"
                type="text"
                placeholder="Enter keyword..."
                class="w-full pl-10 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                @input="debounceSearch"
              />
            </div>
          </div>
          <button
            @click="AddMenu"
            class="bg-gray-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow w-full md:w-auto"
          >
          ✚ Add menu
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-xl shadow text-sm">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="text-left py-3 px-4 bg-gray-100">#</th>
              <th class="text-left py-3 px-4 bg-gray-300">Title</th>
              <th class="text-left py-3 px-4 bg-gray-300">Category</th>
              <th class="text-left py-3 px-4 bg-gray-300">Content</th>
              <th class="text-left py-3 px-4 bg-gray-300">price</th>
              <th class="text-left py-3 px-4 bg-gray-300">date</th>
              <th class="text-left py-3 px-4 bg-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(menu, index) in filteredmenus"
              :key="menu.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-3 px-4 bg-gray-300 text-white">{{ index + 1 }}</td>
              <td class="py-3 px-4 bg-gray-100 font-medium">{{ menu.name }}</td>
              <td class="py-3 px-4 bg-gray-200 text-gray-500">{{ menu.category }}</td>
              <td class="py-3 px-4 bg-gray-200 text-gray-500">{{ menu.content }}</td>
              <td class="py-3 px-4 bg-gray-200 text-gray-500">{{ menu.price }}</td>
              <td class="py-3 px-4 bg-gray-100 text-gray-500">{{ formatDate(menu.created_at) }}</td>
              
              <td class="py-3 px-4 bg-gray-100 space-x-2">
                <button
                  @click="editmenu(menu.id)"
                  class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                🖉 Edit
                </button>
                <button
                  @click="deletemenuById(menu.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                🗑️ Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import navbar from '../../../../components/shared/navbar.vue'
  //import footer1 from '../../components/shared/footer1.vue'
  import { getAllmenu, deletemenu } from '../../api/adminApi.js'
  
  const menus = ref([])
  const searchTerm = ref('')
  const router = useRouter()
  const debounceTimeout = ref(null)
  
  const fetchmenus = async () => {
    menus.value = await getAllmenu()
  }
  
  const deletemenuById = async (id) => {
    await deletemenu(id)
    fetchmenus()
  }
  
  const AddMenu = () => {
    console.log("hi,i am working...")
    router.push({ name: 'AddMenu' })
  }
  
  const editmenu = (id) => {
    const menuToEdit = menus.value.find(menu => menu.id === id)
    if (menuToEdit) {
      localStorage.setItem('editmenu', JSON.stringify(menuToEdit))
      localStorage.setItem('editmenuId', menuToEdit.id)
      router.push({ name: 'EditMenu', params: { id } })
    }
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  
  const filteredmenus = computed(() => {
    if (!searchTerm.value) return menus.value
    return menus.value.filter(
      menu =>
        menu.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        menu.content.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })
  
  const debounceSearch = () => {
    clearTimeout(debounceTimeout.value)
    debounceTimeout.value = setTimeout(() => {}, 500)
  }
  
  onMounted(() => {
    fetchmenus()
  })
  </script>
  