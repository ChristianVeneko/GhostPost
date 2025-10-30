<template>
  <div class="card max-w-2xl mx-auto">
    <div class="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-t-lg"></div>
    
    <div class="p-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Crear nuevo post
      </h2>
      
      <form @submit.prevent="handleSubmit">
        <!-- Campo de título -->
        <div class="mb-6">
          <label for="post-title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Título del post
          </label>
          <input 
            id="post-title"
            v-model="title"
            type="text"
            class="input"
            placeholder="Ej: Acepto críticas anónimas, ¿Qué opinas de mí?, Cuéntame algo..."
            maxlength="100"
            required
          />
          <div class="flex justify-between mt-2">
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Este será el título que verán las personas al visitar tu link
            </p>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ title.length }}/100
            </span>
          </div>
        </div>
        
        <!-- Mensaje de error -->
        <AlertMessage 
          v-if="error"
          type="error"
          :message="error"
          @close="error = null"
        />
        
        <!-- Mensaje de éxito con el link -->
        <div 
          v-if="createdPost"
          class="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 rounded-lg"
        >
          <div class="flex items-start gap-3">
            <div class="text-green-500 text-2xl">✓</div>
            <div class="flex-1">
              <h3 class="font-semibold text-green-800 dark:text-green-300 mb-2">
                ¡Post creado con éxito!
              </h3>
              <p class="text-sm text-green-700 dark:text-green-400 mb-3">
                Comparte este link para recibir mensajes:
              </p>
              <div class="flex gap-2">
                <input 
                  :value="createdPostUrl"
                  readonly
                  class="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-green-300 dark:border-green-700 rounded-lg text-sm font-mono"
                  @click="$event.target.select()"
                />
                <button 
                  type="button"
                  @click="copyCreatedLink"
                  class="btn-secondary px-4 py-2 whitespace-nowrap"
                >
                  {{ linkCopied ? '✓ Copiado' : 'Copiar' }}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Botones -->
        <div class="flex gap-3">
          <button 
            type="submit"
            :disabled="loading || !title.trim()"
            class="flex-1 btn-primary py-3"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creando...
            </span>
            <span v-else>Crear post</span>
          </button>
          
          <button 
            v-if="createdPost"
            type="button"
            @click="resetForm"
            class="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
          >
            Crear otro
          </button>
          
          <button 
            v-else
            type="button"
            @click="$emit('cancel')"
            class="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['created', 'cancel'])

const { createPost } = usePosts()

const title = ref('')
const loading = ref(false)
const error = ref(null)
const createdPost = ref(null)
const linkCopied = ref(false)

const createdPostUrl = computed(() => {
  if (!createdPost.value) return ''
  const baseUrl = window.location.origin
  return `${baseUrl}/${createdPost.value.username}/${createdPost.value.key}`
})

const handleSubmit = async () => {
  if (!title.value.trim()) return
  
  loading.value = true
  error.value = null
  
  try {
    const post = await createPost(title.value)
    createdPost.value = post
    emit('created', post)
  } catch (err) {
    error.value = err.message || 'Error al crear el post'
  } finally {
    loading.value = false
  }
}

const copyCreatedLink = async () => {
  try {
    await navigator.clipboard.writeText(createdPostUrl.value)
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Error copying link:', err)
  }
}

const resetForm = () => {
  title.value = ''
  createdPost.value = null
  error.value = null
  linkCopied.value = false
}
</script>
