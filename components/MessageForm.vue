<template>
  <form @submit.prevent="handleSubmit" class="card relative">
    <!-- Animated gradient background -->
    <div class="absolute inset-0 -z-10 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-br from-primary-200 via-secondary-200 to-accent-200 animate-gradient bg-300%"></div>
    </div>
    
    <div class="space-y-6">
      <!-- Header with icon -->
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow animate-float">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        </div>
        
        <div class="flex-1">
          <h2 class="text-2xl font-heading font-bold gradient-text">
            {{ title }}
          </h2>
          <p class="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Tu mensaje será completamente anónimo 👻
          </p>
        </div>
      </div>
      
      <!-- Textarea with character count -->
      <div class="space-y-2">
        <label for="message" class="block text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          {{ label }}
        </label>
        
        <div class="relative">
          <textarea 
            id="message" 
            v-model="messageText" 
            class="input min-h-[150px] resize-none"
            :placeholder="placeholder"
            required
            :disabled="isLoading"
            maxlength="500"
            @input="updateCharCount"
          ></textarea>
          
          <!-- Character counter -->
          <div 
            class="absolute bottom-3 right-3 text-xs font-bold rounded-full px-3 py-1.5"
            :class="charCount > 450 ? 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'"
          >
            {{ charCount }}/500
          </div>
        </div>
      </div>
      
      <!-- Submit button -->
      <button 
        type="submit" 
        class="btn btn-primary w-full text-lg py-4 shadow-glass hover:shadow-glass-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        :disabled="isLoading || !messageText.trim()"
      >
        <span v-if="isLoading" class="flex items-center justify-center gap-3">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Enviando mensaje...</span>
        </span>
        
        <span v-else class="flex items-center justify-center gap-2">
          <span>{{ submitText }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </button>
      
      <!-- Success message -->
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
          class="p-5 rounded-3xl bg-gradient-to-r from-secondary-100 to-secondary-50 dark:from-secondary-900/30 dark:to-secondary-800/30 border-2 border-secondary-300 dark:border-secondary-700"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-secondary-500 flex items-center justify-center flex-shrink-0 animate-wave">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div class="flex-1">
              <p class="font-bold text-secondary-800 dark:text-secondary-200">
                {{ successMessage }}
              </p>
              <p class="text-sm text-secondary-600 dark:text-secondary-400 mt-0.5">
                El destinatario recibirá tu mensaje anónimo 🎉
              </p>
            </div>
          </div>
        </div>
      </transition>
      
      <!-- Error message -->
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
          class="p-5 rounded-3xl bg-gradient-to-r from-accent-100 to-accent-50 dark:from-accent-900/30 dark:to-accent-800/30 border-2 border-accent-300 dark:border-accent-700"
        >
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-2xl bg-accent-500 flex items-center justify-center flex-shrink-0">
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
              @click="emit('update:error', null)" 
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
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Enviar mensaje anónimo'
  },
  label: {
    type: String,
    default: '✍️ Tu mensaje'
  },
  placeholder: {
    type: String,
    default: 'Escribe algo bonito, gracioso o misterioso... 👀'
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
const charCount = ref(0)

const updateCharCount = () => {
  charCount.value = messageText.value.length
}

const handleSubmit = () => {
  if (!messageText.value.trim()) return
  
  emit('submit', messageText.value)
  
  // Si no hay error, limpiar el mensaje
  if (!props.error) {
    messageText.value = ''
    charCount.value = 0
  }
}
</script> 