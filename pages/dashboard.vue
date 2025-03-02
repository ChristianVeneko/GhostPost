<template>
  <div>
    <!-- Pantalla de carga -->
    <div v-if="authLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
    
    <!-- Pantalla de login -->
    <div v-else-if="!isAuthenticated" class="max-w-md mx-auto">
      <div class="card">
        <h1 class="text-2xl font-bold text-center mb-6">Inicia sesión para continuar</h1>
        
        <div class="space-y-4">
          <button 
            @click="signInWithGoogle" 
            class="w-full py-3 px-4 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            :disabled="isLoading"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="w-5 h-5 mr-3" />
            <span>Continuar con Google</span>
          </button>
        </div>
        
        <div v-if="authError" class="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {{ authError }}
        </div>
      </div>
    </div>
    
    <!-- Dashboard del usuario -->
    <div v-else>
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">Tu Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-300">Bienvenido, {{ user.displayName || user.email }}</p>
      </div>
      
      <!-- Enlace único -->
      <div class="card mb-8">
        <h2 class="text-xl font-semibold mb-4">Tu enlace único</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">Comparte este enlace para recibir mensajes anónimos:</p>
        
        <div class="flex">
          <div class="flex-grow bg-gray-100 dark:bg-secondary-700 dark:text-gray-200 p-3 rounded-l-md font-mono truncate">
            {{ profileUrl }}
          </div>
          <button 
            @click="copyProfileUrl" 
            class="bg-purple-600 text-white px-4 rounded-r-md hover:bg-purple-700 transition-colors"
          >
            <span v-if="copied">¡Copiado!</span>
            <span v-else>Copiar</span>
          </button>
        </div>
        
        <div class="mt-4 flex space-x-2">
          <a 
            :href="`https://wa.me/?text=${encodeURIComponent(shareMessage)}`" 
            target="_blank"
            class="flex items-center justify-center p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </a>
          <a 
            :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`" 
            target="_blank"
            class="flex items-center justify-center p-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
          <a 
            :href="`https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent('Envíame un mensaje anónimo en GhostPost')}`" 
            target="_blank"
            class="flex items-center justify-center p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-1.97 9.269c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.952z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <!-- Mensajes recibidos -->
      <div class="card">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">Mensajes recibidos</h2>
          <button @click="refreshMessages" class="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300">
            <span v-if="messagesLoading">Cargando...</span>
            <span v-else>Actualizar</span>
          </button>
        </div>
        
        <div v-if="messagesLoading && !messages.length" class="py-8 text-center text-gray-500 dark:text-gray-400">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600 dark:border-purple-400 mx-auto mb-4"></div>
          <p>Cargando mensajes...</p>
        </div>
        
        <div v-else-if="!messages.length" class="py-8 text-center text-gray-500 dark:text-gray-400">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <p class="text-lg font-medium">No tienes mensajes aún</p>
          <p class="mt-2">Comparte tu enlace para empezar a recibir mensajes anónimos</p>
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="message in messages" :key="message.id" class="p-4 bg-gray-50 dark:bg-secondary-700 rounded-lg">
            <div class="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{{ message.message }}</div>
            <div class="mt-2 flex justify-between items-center">
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(message.createdAt) }}
              </div>
              <button 
                @click="deleteMessage(message.id)" 
                class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1.5"
                title="Eliminar mensaje"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Botón de cerrar sesión -->
      <div class="mt-8 text-center">
        <button @click="logout" class="text-gray-600 hover:text-red-600">
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Composables
const { 
  user, 
  isAuthenticated, 
  isLoading: authLoading, 
  error: authError,
  signInWithGoogle, 
  logout 
} = useAuth()

const { 
  messages, 
  isLoading: messagesLoading, 
  error: messagesError,
  fetchMessages,
  deleteMessage: deleteMessageAction
} = useMessages()

// Estado local
const copied = ref(false)

// URL del perfil
const profileUrl = computed(() => {
  if (!user.value) return ''
  const username = user.value.username || user.value.email?.split('@')[0]
  return `${window.location.origin}/@${username}`
})

// Mensaje para compartir
const shareMessage = computed(() => {
  return `Envíame un mensaje anónimo en GhostPost: ${profileUrl.value}`
})

// Copiar URL al portapapeles
const copyProfileUrl = () => {
  navigator.clipboard.writeText(profileUrl.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}

// Formatear fecha
const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleString()
}

// Eliminar mensaje
const deleteMessage = async (messageId) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este mensaje?')) return
  
  try {
    await deleteMessageAction(messageId)
  } catch (error) {
    alert('Error al eliminar el mensaje: ' + error.message)
  }
}

// Cargar mensajes cuando el usuario está autenticado
watch(user, async (newUser) => {
  if (newUser) {
    await refreshMessages()
  }
})

// Refrescar mensajes
const refreshMessages = async () => {
  if (!user.value) return
  try {
    await fetchMessages()
  } catch (error) {
    console.error('Error al cargar mensajes:', error)
  }
}

// Cargar mensajes al montar el componente si el usuario está autenticado
onMounted(async () => {
  if (isAuthenticated.value) {
    await refreshMessages()
  }
})
</script> 