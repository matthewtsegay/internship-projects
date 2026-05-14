<template>
  <div class="flex gap-4 items-center">
    <button
      @click="handleLikeClick"
      :class="[
        'flex items-center gap-1',
        localReaction === 'like' ? 'text-green-600 font-bold' : 'text-gray-600'
      ]"
    >
      👍 {{ likeCount }}
    </button>

    <button
      @click="handleDislikeClick"
      :class="[
        'flex items-center gap-1',
        localReaction === 'dislike' ? 'text-red-600 font-bold' : 'text-gray-600'
      ]"
    >
      👎 {{ dislikeCount }}
    </button>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  // incoming userReaction: 'like', 'dislike', or null
  userReaction: { type: String, default: null },
})

const emit = defineEmits(['like', 'dislike'])

// Local copy of the reaction
const localReaction = ref(props.userReaction)

// Keep localReaction in sync whenever parent prop changes
watch(
  () => props.userReaction,
  (newVal) => {
    localReaction.value = newVal
  }
)

// Computed counts: either 1 or 0
const likeCount = computed(() => (localReaction.value === 'like' ? 1 : 0))
const dislikeCount = computed(() => (localReaction.value === 'dislike' ? 1 : 0))

// Toggle functions emit the new state but do not alter any backend logic
function handleLikeClick() {
  localReaction.value = localReaction.value === 'like' ? null : 'like'
  emit('like', localReaction.value)
}

function handleDislikeClick() {
  localReaction.value = localReaction.value === 'dislike' ? null : 'dislike'
  emit('dislike', localReaction.value)
}
</script>

<style scoped>
/* nothing extra needed */
</style>
