<template>
  <div class="card hover:shadow-lg transition-all duration-300 group">
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center">
        <div class="bg-primary-100 text-primary-700 rounded-full w-10 h-10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div class="ml-3">
          <div class="text-secondary-500 text-sm">Anónimo</div>
          <div class="text-secondary-400 text-xs">{{ formatDate(message.createdAt) }}</div>
        </div>
      </div>
      <div class="opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          @click="$emit('delete', message.id)" 
          class="text-secondary-400 hover:text-red-500 p-1"
          title="Eliminar mensaje"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
    <div class="text-secondary-800 whitespace-pre-wrap break-words">{{ message.content }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: Object,
    required: true
  }
})

defineEmits(['delete'])

// Función para formatear la fecha
const formatDate = (timestamp) => {
  if (!timestamp) return 'Fecha desconocida'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  
  // Formatear la fecha
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script> 