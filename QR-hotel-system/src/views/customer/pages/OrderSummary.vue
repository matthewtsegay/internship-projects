<template>
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Order Summary</h1>
      <ul>
        <li v-for="item in cart" :key="item.id" class="flex justify-between">
          <span>{{ item.name }} x {{ item.quantity }}</span>
          <span>${{ item.price * item.quantity }}</span>
        </li>
      </ul>
      <div class="mt-4 font-semibold">Total: ${{ total }}</div>
      <button class="btn btn-success mt-4" @click="placeOrder">Place Order</button>
    </div>
  </template>
  
  <script setup>
  import { useMenuStore } from '@/store/menu'
  const menuStore = useMenuStore()
  
  const cart = menuStore.cart
  const total = menuStore.total
  
  function placeOrder() {
    menuStore.submitOrder()
  }
  </script>
  