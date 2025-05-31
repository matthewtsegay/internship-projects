<template>
    <div class="p-4">
      <h1 class="text-xl font-bold mb-4">Payment</h1>
      <div>
        <label><input type="radio" value="cash" v-model="paymentMethod" /> Cash</label>
        <label class="ml-4"><input type="radio" value="online" v-model="paymentMethod" /> Online</label>
      </div>
      <div class="mt-4">
        <button class="btn btn-primary" @click="handlePayment">Confirm Payment</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const paymentMethod = ref('cash')
  
  function handlePayment() {
    if (paymentMethod.value === 'online') {
      window.location.href = 'https://telebirr.com/payment' 
      window.location.href = 'https://cbebirr.com/payment'
      window.location.href = 'https://arifpay.com/payment'//  // // placeholder
    } else {
      alert('Cashier notified. Please wait...')
    }
  }
  </script>