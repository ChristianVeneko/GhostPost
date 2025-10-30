<template>
  <div class="card hover:shadow-glow transition-all duration-300">
    <!-- Header con título del post -->
    <div class="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-t-lg"></div>
    
    <div class="p-6">
      <!-- Título y estado -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {{ post.title }}
          </h3>
          <div class="flex items-center gap-2">
            <span 
              :class="[
                'px-2 py-1 text-xs font-semibold rounded-full',
                post.isActive 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
              ]"
            >
              {{ post.isActive ? 'Activo' : 'Inactivo' }}
            </span>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(post.createdAt) }}
            </span>
          </div>
        </div>
        
        <!-- Contador de mensajes -->
        <div class="flex flex-col items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-lg px-4 py-2 min-w-[60px]">
          <span class="text-2xl font-bold">{{ post.messageCount || 0 }}</span>
          <span class="text-xs opacity-90">mensajes</span>
        </div>
      </div>
      
      <!-- Link único -->
      <div class="mb-4">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
          Link del post:
        </label>
        <div class="flex gap-2">
          <input 
            :value="postUrl" 
            readonly
            class="flex-1 input text-sm font-mono"
            @click="$event.target.select()"
          />
          <button 
            @click="copyLink"
            class="btn-secondary px-4 py-2 whitespace-nowrap"
          >
            <span v-if="copied">✓ Copiado</span>
            <span v-else>Copiar</span>
          </button>
        </div>
      </div>
      
      <!-- Acciones -->
      <div class="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button 
          @click="$emit('view-messages', post.id)"
          class="flex-1 btn-primary py-2"
        >
          Ver mensajes
        </button>
        
        <button 
          @click="toggleStatus"
          :class="[
            'px-4 py-2 rounded-lg font-medium transition-all duration-300',
            post.isActive
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
          ]"
        >
          {{ post.isActive ? 'Pausar' : 'Activar' }}
        </button>
        
        <button 
          @click="confirmDelete"
          class="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-status', 'delete', 'view-messages'])

const copied = ref(false)

const postUrl = computed(() => {
  const baseUrl = window.location.origin
  return `${baseUrl}/${props.post.username}/${props.post.key}`
})

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(postUrl.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error copying link:', err)
  }
}

const toggleStatus = () => {
  emit('toggle-status', props.post.id)
}

const confirmDelete = () => {
  if (confirm(`¿Estás seguro de eliminar el post "${props.post.title}"? Esto también eliminará todos sus mensajes.`)) {
    emit('delete', props.post.id)
  }
}
</script>
