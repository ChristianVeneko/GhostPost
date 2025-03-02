<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Bienvenido a GhostPost</h1>
      <p class="text-xl text-gray-600">Envía mensajes anónimos a tus amigos de forma sencilla</p>
    </div>
    
    <div class="grid md:grid-cols-2 gap-8">
      <div class="card">
        <h2 class="text-2xl font-semibold mb-4">¿Cómo funciona?</h2>
        <ol class="space-y-4 text-gray-700">
          <li class="flex items-start">
            <span class="flex-shrink-0 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
            <span>Regístrate con tu cuenta de Google o GitHub</span>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
            <span>Obtén tu enlace único para compartir</span>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
            <span>Compártelo con tus amigos para recibir mensajes anónimos</span>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
            <span>Revisa los mensajes en tu dashboard personal</span>
          </li>
        </ol>
        
        <div class="mt-6">
          <NuxtLink to="/dashboard" class="btn btn-primary">Comenzar ahora</NuxtLink>
        </div>
      </div>
      
      <div class="card">
        <h2 class="text-2xl font-semibold mb-4">Prueba ahora</h2>
        <div class="bg-gray-100 p-4 rounded-lg mb-4">
          <p class="text-gray-700">Envía un mensaje anónimo a nuestro usuario de demostración:</p>
          <div class="font-mono text-purple-600 mt-2">@ghostpost</div>
        </div>
        
        <form @submit.prevent="sendDemoMessage">
          <div class="mb-4">
            <label for="message" class="block text-gray-700 mb-2">Tu mensaje anónimo:</label>
            <textarea 
              id="message" 
              v-model="message" 
              class="input" 
              rows="4" 
              placeholder="Escribe tu mensaje aquí..."
              required
            ></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary w-full" :disabled="isLoading">
            <span v-if="isLoading">Enviando...</span>
            <span v-else>Enviar mensaje</span>
          </button>
          
          <div v-if="success" class="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
            ¡Mensaje enviado con éxito!
          </div>
          
          <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const message = ref('')
const isLoading = ref(false)
const success = ref(false)
const error = ref(null)

const sendDemoMessage = async () => {
  if (!message.value.trim()) return
  
  try {
    isLoading.value = true
    error.value = null
    
    const response = await $fetch('/api/sendMessage', {
      method: 'POST',
      body: {
        to: 'ghostpost',
        message: message.value
      }
    })
    
    if (response.success) {
      success.value = true
      message.value = ''
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        success.value = false
      }, 3000)
    }
  } catch (err) {
    error.value = err.message || 'Error al enviar el mensaje'
  } finally {
    isLoading.value = false
  }
}
</script> 