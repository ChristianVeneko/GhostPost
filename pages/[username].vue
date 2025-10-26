<template>
  <div class="min-h-screen py-12 relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
      <div class="absolute top-20 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-20 left-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-wave"></div>
    </div>
    
    <div class="container max-w-2xl mx-auto">
      <!-- User Profile Card -->
      <div class="card mb-8 text-center">
        <div class="inline-block relative mb-6">
          <!-- Animated glow ring -->
          <div class="absolute inset-0 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          
          <!-- Avatar -->
          <div class="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center shadow-glow">
            <span class="text-5xl font-heading font-black text-white">
              {{ firstLetter }}
            </span>
          </div>
        </div>
        
        <h1 class="text-3xl md:text-4xl font-heading font-black gradient-text mb-3">
          @{{ username }}
        </h1>
        
        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Envía un mensaje anónimo a este usuario. <span class="font-bold">Tu identidad permanecerá en secreto</span> 👻✨
        </p>
      </div>
      
      <!-- Message Form -->
      <div class="card">
        <form @submit.prevent="sendMessage" class="space-y-6">
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
              :disabled="isLoading"
            ></textarea>
            
            <!-- Character counter -->
            <div 
              class="absolute bottom-3 right-3 text-xs font-bold rounded-full px-3 py-1.5"
              :class="message.length > 450 ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'"
            >
              {{ message.length }}/500
            </div>
          </div>
          
          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            :disabled="isLoading || !message.trim()"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-3">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Enviando mensaje...</span>
            </span>
            
            <span v-else class="flex items-center justify-center gap-2">
              <span>Enviar mensaje anónimo</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </form>
        
        <!-- Success Message -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 transform scale-95"
          enter-to-class="opacity-100 transform scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 transform scale-100"
          leave-to-class="opacity-0 transform scale-95"
        >
          <div 
            v-if="success" 
            class="mt-6 p-6 rounded-3xl bg-gradient-to-r from-secondary-100 to-secondary-50 dark:from-secondary-900/30 dark:to-secondary-800/30 border-2 border-secondary-300 dark:border-secondary-700"
          >
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-secondary-500 flex items-center justify-center flex-shrink-0 animate-wave">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div class="flex-1">
                <p class="font-bold text-lg text-secondary-800 dark:text-secondary-200">
                  ¡Mensaje enviado con éxito!
                </p>
                <p class="text-secondary-600 dark:text-secondary-400 mt-1">
                  Tu mensaje anónimo ha sido enviado a <span class="font-bold">@{{ username }}</span> 🎉
                </p>
              </div>
            </div>
          </div>
        </transition>
        
        <!-- Error Message -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 transform scale-95"
          enter-to-class="opacity-100 transform scale-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 transform scale-100"
          leave-to-class="opacity-0 transform scale-95"
        >
          <div 
            v-if="error" 
            class="mt-6 p-6 rounded-3xl bg-gradient-to-r from-accent-100 to-accent-50 dark:from-accent-900/30 dark:to-accent-800/30 border-2 border-accent-300 dark:border-accent-700"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-accent-500 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div class="flex-1">
                <p class="font-bold text-accent-800 dark:text-accent-200">
                  {{ error }}
                </p>
              </div>
              
              <button 
                @click="error = null" 
                class="text-accent-600 hover:text-accent-800 dark:text-accent-400 dark:hover:text-accent-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </transition>
      </div>
      
      <!-- CTA Card -->
      <div class="card mt-8 text-center">
        <div class="text-5xl mb-4 animate-wave">🚀</div>
        <h3 class="text-xl font-heading font-bold gradient-text mb-3">
          ¿Quieres recibir mensajes anónimos también?
        </h3>
        <p class="text-slate-600 dark:text-slate-400 mb-6">
          Crea tu propio perfil en segundos y empieza a recibir mensajes
        </p>
        <NuxtLink to="/dashboard" class="btn btn-secondary inline-flex">
          <span>Crear mi enlace gratis</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const username = computed(() => route.params.username.replace('@', ''))
const firstLetter = computed(() => username.value.charAt(0).toUpperCase())

const message = ref('')
const isLoading = ref(false)
const success = ref(false)
const error = ref(null)

const sendMessage = async () => {
  if (!message.value.trim()) return
  
  try {
    isLoading.value = true
    error.value = null
    success.value = false
    
    const response = await $fetch('/api/sendMessage', {
      method: 'POST',
      body: {
        to: username.value,
        message: message.value
      }
    })
    
    if (response.success) {
      success.value = true
      message.value = ''
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        success.value = false
      }, 5000)
    }
  } catch (err) {
    error.value = err.message || 'Error al enviar el mensaje. Por favor intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}

// Meta tags
useHead({
  title: `Enviar mensaje a @${username.value} - GhostPost`,
  meta: [
    {
      name: 'description',
      content: `Envía un mensaje anónimo a @${username.value} en GhostPost de forma segura y privada.`
    }
  ]
})
</script> 