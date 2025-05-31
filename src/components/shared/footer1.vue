<template>
   <footer class="bg-gray-600 text-white py-4 mt-10">
     <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
       
       <div>
         <h2 class="text-2xl font-bold text-white">Blog website</h2>
         <p class="mt-2 text-gray-400">&copy; {{ year }} VueBlog. All rights reserved.</p>
       </div>
 
       <div>
         <h3 class="text-lg font-semibold mb-3 text-white">Follow Us</h3>
         <div class="flex justify-center md:justify-start flex-wrap gap-3 text-gray-300">
           <a href="https://facebook.com" class="hover:text-blue-400">Facebook</a>
           <a href="https://instagram.com" class="hover:text-pink-400">Instagram</a>
           <a href="https://x.com" class="hover:text-blue-300">X (Twitter)</a>
           <a href="https://telegram.com" class="hover:text-blue-400">Telegram</a>
           <a href="https://youtube.com" class="hover:text-red-500">YouTube</a>
         </div>
       </div>
 
       <div>
         <h3 class="text-lg font-semibold mb-3 text-white">Contact</h3>
         <p class="text-gray-300">blog@gmail.com</p>
         <p class="text-gray-300">+25198766565</p>
       </div>
     </div>
     <div class="border-t border-gray-700 mt-8 pt-4 text-lg italic text-center text-gray-100">
       
     </div>
   </footer>
 </template>
 
 <script setup>
 import { ref } from 'vue'
 
 const year = ref(new Date().getFullYear())
 </script>
 