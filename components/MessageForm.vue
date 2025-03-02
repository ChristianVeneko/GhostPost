<template>
  <form @submit.prevent="handleSubmit" class="card">
    <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
    
    <div class="mb-4">
      <label for="message" class="block text-secondary-700 mb-2">{{ label }}</label>
      <textarea 
        id="message" 
        v-model="messageText" 
        class="input" 
        rows="4" 
        :placeholder="placeholder"
        required
        :disabled="isLoading"
      ></textarea>
    </div>
    
    <button type="submit" class="btn btn-primary w-full" :disabled="isLoading || !messageText.trim()">
      <span v-if="isLoading" class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Enviando...
      </span>
      <span v-else>{{ submitText }}</span>
    </button>
    
    <AlertMessage 
      v-if="success" 
      type="success" 
      :message="successMessage" 
      class="mt-4"
      :auto-close="3000"
      @close="success = false"
    />
    
    <AlertMessage 
      v-if="error" 
      type="error" 
      :message="error" 
      class="mt-4"
      dismissible
      @close="error = null"
    />
  </form>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Enviar mensaje'
  },
  label: {
    type: String,
    default: 'Tu mensaje:'
  },
  placeholder: {
    type: String,
    default: 'Escribe tu mensaje aquí...'
  },
  submitText: {
    type: String,
    default: 'Enviar mensaje'
  },
  successMessage: {
    type: String,
    default: '¡Mensaje enviado con éxito!'
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  success: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'update:success', 'update:error'])

const messageText = ref('')

const handleSubmit = () => {
  if (!messageText.value.trim()) return
  
  emit('submit', messageText.value)
  
  // Si no hay error, limpiar el mensaje
  if (!props.error) {
    messageText.value = ''
  }
}
</script> 