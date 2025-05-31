<!-- src/components/FormButton.vue -->
<template>
  <button
    :type="type"
    :class="['w-full', 'py-2', 'rounded-lg', 'transition', buttonClasses]"
    @click="handleClick"
  >
    <slot>Submit</slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';


const props = defineProps({
  type: { type: String, default: 'button' }, 
  variant: { type: String, default: 'primary' },
});

const buttonClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-blue-600 text-white hover:bg-blue-700';
    case 'secondary':
      return 'bg-gray-600 text-white hover:bg-gray-700';
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700';
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700';
  }
});


function handleClick(event) {
  console.log('Button clicked!');
}
</script>

<style scoped>
</style>
