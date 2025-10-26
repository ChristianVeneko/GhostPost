<template>
  <div 
    class="card group relative overflow-hidden"
    :class="{ 'border-l-4 border-l-secondary-400': !message.isRead }"
  >
    <!-- Gradient accent bar (top) -->
    <div 
      class="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style="background: linear-gradient(90deg, #7c3aed 0%, #06b6d4 50%, #fb7185 100%);"
    ></div>
    
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 space-y-4">
        <!-- Header -->
        <div class="flex items-center gap-3 flex-wrap">
          <!-- Icon with gradient background -->
          <div class="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500 shadow-glow">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          
          <div class="flex-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-sm font-bold text-slate-700 dark:text-slate-300">
                {{ message.isAnonymous ? '👻 Anónimo' : `✍️ ${message.signature}` }}
              </span>
              
              <span v-if="!message.isRead" class="badge-coral px-2.5 py-1 text-[10px] font-black">
                NUEVO
              </span>
            </div>
            
            <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {{ formatDate(message.createdAt) }}
            </div>
          </div>
        </div>
        
        <!-- Content -->
        <p class="text-slate-800 dark:text-slate-100 leading-relaxed text-base whitespace-pre-wrap break-words">
          {{ message.content }}
        </p>
      </div>
      
      <!-- Delete button -->
      <button 
        @click="$emit('delete', message.id)" 
        class="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2.5 rounded-2xl hover:bg-accent-100 dark:hover:bg-accent-900/20 text-slate-400 hover:text-accent-600 dark:hover:text-accent-400"
        title="Eliminar mensaje"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
    
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 -z-10 opacity-5 dark:opacity-10" style="background-image: radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0); background-size: 32px 32px;"></div>
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
  
  // Formatear la fecha de forma más amigable
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)
  
  if (diffMins < 1) return 'Hace un momento'
  if (diffMins < 60) return `Hace ${diffMins} min${diffMins > 1 ? 's' : ''}`
  if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`
  if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`
  
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script> 