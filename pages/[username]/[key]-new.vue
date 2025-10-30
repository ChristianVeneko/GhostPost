<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center min-h-screen">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>
    
    <!-- Post no encontrado -->
    <div v-else-if="!post" class="min-h-screen flex items-center justify-center">
      <div class="card max-w-2xl mx-auto text-center py-12">
        <div class="text-6xl mb-4">😔</div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Post no encontrado
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Este post no existe o ha sido desactivado por su creador
        </p>
        <NuxtLink to="/" class="btn-primary px-8 py-3 inline-block">
          Ir al inicio
        </NuxtLink>
      </div>
    </div>
    
    <!-- Post activo -->
    <div v-else class="min-h-screen py-12 relative overflow-hidden">
      <!-- Animated background -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div class="absolute top-20 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 left-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-wave"></div>
      </div>
      
      <div class="container max-w-2xl mx-auto px-4">
        <!-- User Profile Card -->
        <div class="card mb-8 text-center">
          <div class="inline-block relative mb-6">
            <!-- Animated glow ring -->
            <div class="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            
            <!-- Avatar with photo or initial -->
            <div v-if="post.userProfile?.photoURL" class="relative w-28 h-28 rounded-full overflow-hidden shadow-glow ring-4 ring-white dark:ring-slate-800">
              <img 
                :src="post.userProfile.photoURL" 
                :alt="`Foto de perfil de ${post.username}`"
                class="w-full h-full object-cover"
              />
            </div>
            
            <!-- Fallback to gradient with initial -->
            <div v-else class="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center shadow-glow">
              <span class="text-5xl font-heading font-black text-white">
                {{ post.username[0].toUpperCase() }}
              </span>
            </div>
          </div>
          
          <h1 class="text-3xl md:text-4xl font-heading font-black gradient-text mb-3">
            {{ post.userProfile?.displayName || `@${post.username}` }}
          </h1>
          
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
            @{{ post.username }}
          </p>
          
          <div class="inline-block px-6 py-3 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-500/20 dark:to-secondary-500/20 rounded-2xl mb-6">
            <p class="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              📬 {{ post.title }}
            </p>
          </div>
          
          <p class="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Envía un mensaje anónimo. <span class="font-bold">Tu identidad permanecerá en secreto</span> 👻✨
          </p>
        </div>
        
        <!-- Message Form -->
        <div class="card">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Header -->
            <div class="flex items-center gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow animate-float">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              
              <div class="flex-1">
                <h2 class="text-xl font-heading font-bold gradient-text">
                  Escribe tu mensaje
                </h2>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  Sé amable, creativo o misterioso 🎭
                </p>
              </div>
            </div>
            
            <!-- Textarea -->
            <div class="relative">
              <textarea 
                v-model="message" 
                class="input min-h-[180px] resize-none"
                placeholder="Escribe algo interesante, gracioso o misterioso... 👀✨"
                required
                maxlength="500"
                :disabled="sending"
              ></textarea>
              
              <!-- Character counter -->
              <div class="flex justify-between items-center mt-2">
                <span class="text-xs text-slate-500 dark:text-slate-400">
                  💡 Tu mensaje es 100% anónimo
                </span>
                <span 
                  :class="[
                    'text-sm font-medium',
                    message.length < 400 ? 'text-slate-500 dark:text-slate-400' : 
                    message.length < 480 ? 'text-yellow-600 dark:text-yellow-400' : 
                    'text-red-600 dark:text-red-400'
                  ]"
                >
                  {{ message.length }}/500
                </span>
              </div>
            </div>
            
            <!-- Alertas -->
            <AlertMessage 
              v-if="error"
              type="error"
              :message="error"
              @close="error = null"
            />
            
            <AlertMessage 
              v-if="success"
              type="success"
              :message="success"
              @close="success = null"
            />
            
            <!-- Botón enviar -->
            <button 
              type="submit"
              :disabled="sending || !message.trim() || message.length > 500"
              class="w-full btn-primary py-4 text-lg font-bold"
            >
              <span v-if="sending" class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando mensaje...
              </span>
              <span v-else class="flex items-center justify-center gap-2">
                Enviar mensaje anónimo
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </form>
        </div>
        
        <!-- Info adicional -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
            ¿Quieres crear tu propio post? 
            <NuxtLink to="/" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">
              Empieza aquí gratis
            </NuxtLink>
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500">
            GhostPost - Mensajes anónimos para todos
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const { sendMessage } = useMessages()

const post = ref(null)
const loading = ref(true)
const message = ref('')
const sending = ref(false)
const error = ref(null)
const success = ref(null)

onMounted(async () => {
  await loadPost()
})

const loadPost = async () => {
  loading.value = true
  try {
    const username = route.params.username
    const key = route.params.key
    
    console.log('Loading post:', { username, key })
    
    // Usar el API endpoint en lugar del composable
    const response = await $fetch(`/api/posts/${username}/${key}`)
    
    console.log('Post loaded:', response)
    
    if (response.success) {
      post.value = response.post
    }
  } catch (err) {
    console.error('Error loading post:', err)
    post.value = null
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!message.value.trim() || !post.value) return
  
  console.log('Sending message to post:', post.value.id)
  
  sending.value = true
  error.value = null
  success.value = null
  
  try {
    await sendMessage(post.value.id, message.value)
    success.value = '¡Mensaje enviado con éxito! 🎉'
    message.value = ''
    
    // Ocultar mensaje de éxito después de 5 segundos
    setTimeout(() => {
      success.value = null
    }, 5000)
  } catch (err) {
    console.error('Error sending message:', err)
    error.value = err.message || 'Error al enviar el mensaje. Inténtalo de nuevo.'
  } finally {
    sending.value = false
  }
}

// SEO
useHead({
  title: () => post.value ? `${post.value.title} - @${post.value.username}` : 'Post - GhostPost',
  meta: [
    {
      name: 'description',
      content: () => post.value ? `Deja un mensaje anónimo para @${post.value.username}: ${post.value.title}` : 'Envía mensajes anónimos en GhostPost'
    }
  ]
})
</script>
