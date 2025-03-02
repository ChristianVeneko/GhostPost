<template>
  <div 
    :class="[
      'animate-pulse rounded-lg overflow-hidden',
      { 'h-full': height === 'full' }
    ]"
    :style="height !== 'full' ? { height: `${height}px` } : {}"
  >
    <div class="bg-secondary-200 h-full w-full"></div>
  </div>
</template>

<script setup>
defineProps({
  height: {
    type: [Number, String],
    default: 20
  }
})
</script> 