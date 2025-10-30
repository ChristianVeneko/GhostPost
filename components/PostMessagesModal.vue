<template>
  <!-- Modal overlay -->
  <div 
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
    @click.self="$emit('close')"
  >
    <div class="w-full max-w-6xl my-8">
      <!-- Modal container -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Mensajes de: {{ post.title }}
            </h2>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ messages.length }} {{ messages.length === 1 ? 'mensaje' : 'mensajes' }}
            </p>
          </div>
          
          <button 
            @click="$emit('close')"
            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <!-- Loading -->
        <div v-if="loading" class="p-12 flex justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
        
        <!-- Lista de mensajes -->
        <div v-else-if="messages.length > 0" class="p-6 max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="message in messages"
              :key="message.id"
              class="relative"
            >
              <!-- Carta normal -->
              <div 
                class="card cursor-pointer hover:shadow-glow transition-all duration-300"
                @click="selectedMessage = message"
              >
                <div class="p-4">
                  <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {{ message.content }}
                  </p>
                  <div class="mt-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{{ formatDate(message.createdAt) }}</span>
                    <button 
                      @click.stop="deleteMessageHandler(message.id)"
                      class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty state -->
        <div v-else class="p-12 text-center">
          <div class="text-6xl mb-4">📭</div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Aún no hay mensajes
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Comparte tu link para empezar a recibir mensajes
          </p>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Modal de captura (screenshot) -->
  <div 
    v-if="selectedMessage"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
    @click.self="selectedMessage = null"
  >
    <div class="relative">
      <!-- Botones de acción -->
      <div class="absolute -top-16 right-0 flex gap-2">
        <button 
          @click="captureMessage"
          class="btn-primary px-4 py-2 flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Capturar
        </button>
        <button 
          @click="selectedMessage = null"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
        >
          Cerrar
        </button>
      </div>
      
      <!-- Carta para screenshot -->
      <div 
        ref="captureElement"
        class="w-[600px] min-h-[400px] relative overflow-hidden rounded-2xl shadow-2xl"
      >
        <!-- Fondo con gradiente animado -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 opacity-90"></div>
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0tNCAyYy0xLjEgMC0yLS45LTItMnMuOS0yIDItMiAyIC45IDIgMi0uOSAyLTIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        
        <!-- Contenido -->
        <div class="relative z-10 p-12 flex flex-col justify-center min-h-[400px]">
          <!-- Título del post -->
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-white mb-2">
              {{ post.title }}
            </h2>
            <p class="text-white/80 text-sm">
              @{{ post.username }} en GhostPost
            </p>
          </div>
          
          <!-- Mensaje -->
          <div class="bg-white/95 backdrop-blur-sm rounded-xl p-8 shadow-xl mb-8">
            <p class="text-gray-800 text-xl leading-relaxed whitespace-pre-wrap text-center">
              {{ selectedMessage.content }}
            </p>
          </div>
          
          <!-- Footer -->
          <div class="text-center">
            <p class="text-white/60 text-sm">
              Envía tu mensaje anónimo en
            </p>
            <p class="text-white font-bold text-lg">
              ghostpost.app
            </p>
          </div>
        </div>
      </div>
      
      <!-- Instrucciones -->
      <div class="mt-4 text-center text-white text-sm">
        💡 Toma una captura con el botón "Capturar" o con tu método preferido
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import html2canvas from 'html2canvas'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const { fetchPostMessages, deleteMessage } = useMessages()

const messages = ref([])
const loading = ref(true)
const selectedMessage = ref(null)
const captureElement = ref(null)

onMounted(async () => {
  await loadMessages()
})

const loadMessages = async () => {
  loading.value = true
  try {
    messages.value = await fetchPostMessages(props.post.id)
  } catch (err) {
    console.error('Error loading messages:', err)
  } finally {
    loading.value = false
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return ''
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffMins < 1) return 'Ahora'
  if (diffMins < 60) return `Hace ${diffMins} min`
  if (diffHours < 24) return `Hace ${diffHours} h`
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}

const deleteMessageHandler = async (messageId) => {
  if (!confirm('¿Eliminar este mensaje?')) return
  
  try {
    await deleteMessage(messageId)
    messages.value = messages.value.filter(m => m.id !== messageId)
  } catch (err) {
    console.error('Error deleting message:', err)
    alert('Error al eliminar el mensaje')
  }
}

const captureMessage = async () => {
  if (!captureElement.value) return
  
  try {
    const canvas = await html2canvas(captureElement.value, {
      backgroundColor: null,
      scale: 2,
      logging: false
    })
    
    // Convertir a blob y descargar
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `ghostpost-${Date.now()}.png`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    })
  } catch (err) {
    console.error('Error capturing message:', err)
    alert('Error al capturar. Usa la captura de pantalla de tu dispositivo.')
  }
}
</script>
