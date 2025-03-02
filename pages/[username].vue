<template>
  <div class="max-w-lg mx-auto">
    <div class="card mb-8">
      <div class="flex items-center justify-center mb-6">
        <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
          <span class="text-3xl font-bold text-purple-600">{{ firstLetter }}</span>
        </div>
      </div>
      
      <h1 class="text-2xl font-bold text-center mb-2">
        Envía un mensaje anónimo a @{{ username }}
      </h1>
      <p class="text-gray-600 text-center mb-6">
        Tu identidad permanecerá en secreto
      </p>
      
      <form @submit.prevent="sendMessage">
        <div class="mb-4">
          <textarea 
            v-model="message" 
            class="input" 
            rows="5" 
            placeholder="Escribe tu mensaje anónimo aquí..."
            required
            maxlength="500"
          ></textarea>
          <div class="text-right text-sm text-gray-500 mt-1">
            {{ message.length }}/500
          </div>
        </div>
        
        <button type="submit" class="btn btn-primary w-full" :disabled="isLoading">
          <span v-if="isLoading">Enviando...</span>
          <span v-else>Enviar mensaje</span>
        </button>
      </form>
      
      <div v-if="success" class="mt-6 p-4 bg-green-100 text-green-700 rounded-md text-center">
        <div class="text-xl mb-2">¡Mensaje enviado con éxito!</div>
        <p>Tu mensaje anónimo ha sido enviado a @{{ username }}</p>
      </div>
      
      <div v-if="error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
        {{ error }}
      </div>
    </div>
    
    <div class="text-center">
      <p class="text-gray-600 mb-4">¿Quieres recibir mensajes anónimos también?</p>
      <NuxtLink to="/dashboard" class="btn btn-secondary">
        Crear mi enlace
      </NuxtLink>
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
    }
  } catch (err) {
    error.value = err.message || 'Error al enviar el mensaje'
  } finally {
    isLoading.value = false
  }
}
</script> 