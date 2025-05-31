<template>
    <qrcode-stream @decode="onDecode" />
  </template>
  
  <script setup>
  import { QrcodeStream } from 'vue-qrcode-reader'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  function onDecode(result) {
    if (result) router.push(`/menu/${result}`)
  }
  </script>