<template>
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Menu</h1>
      <div class="flex justify-between items-center mb-2">
        <input v-model="search" type="text" placeholder="Search..." class="input input-bordered w-full max-w-xs" />
      </div>
      <div v-for="category in filteredCategories" :key="category.name">
        <h2 class="text-lg font-semibold mt-4">{{ category.name }}</h2>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="item in category.items" :key="item.id" class="card">
            <img :src="item.image" alt="item.name" class="rounded-md" />
            <div>
              <h3 class="font-bold">{{ item.name }}</h3>
              <p>{{ item.description }}</p>
              <p class="text-sm text-gray-600">${{ item.price }}</p>
              <button class="btn btn-primary mt-2" @click="addToCart(item)">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useMenuStore } from '../store/'
  
  const menuStore = useMenuStore()
  const search = ref('')
  
  onMounted(() => menuStore.fetchMenu())
  
  const filteredCategories = computed(() => {
    return menuStore.menu.map(category => ({
      ...category,
      items: category.items.filter(item => item.name.toLowerCase().includes(search.value.toLowerCase()))
    }))
  })
  
  function addToCart(item) {
    menuStore.addToCart(item)
  }
  </script>
  
  
  