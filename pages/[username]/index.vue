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

          <!-- Avatar with photo or initial -->
          <div v-if="userProfile?.photoURL" class="relative w-28 h-28 rounded-full overflow-hidden shadow-glow ring-4 ring-white dark:ring-slate-800">
            <img
              :src="userProfile.photoURL"
              :alt="`Foto de perfil de ${username}`"
              class="w-full h-full object-cover"
              @error="imageError = true"
            />
          </div>

          <!-- Fallback to gradient with initial -->
          <div v-else class="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center shadow-glow">
            <span class="text-5xl font-heading font-black text-white">
              {{ firstLetter }}
            </span>
          </div>
        </div>

        <h1 class="text-3xl md:text-4xl font-heading font-black gradient-text mb-3">
          {{ userProfile?.displayName || `@${username}` }}
        </h1>

        <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
          @{{ username }}
        </p>

        <p class="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          Envía un mensaje anónimo a este usuario. <span class="font-bold">Tu identidad permanecerá en secreto</span> 👻✨
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="card">
        <div class="flex items-center justify-center py-12">
          <div class="flex flex-col items-center gap-4">
            <svg class="animate-spin h-12 w-12 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-slate-600 dark:text-slate-400">Cargando posts...</p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="card">
        <div class="text-center py-12">
          <div class="text-6xl mb-4">😔</div>
          <h2 class="text-2xl font-heading font-bold gradient-text mb-3">
            Error al cargar
          </h2>
          <p class="text-slate-600 dark:text-slate-400">
            {{ error }}
          </p>
        </div>
      </div>

      <!-- No Posts -->
      <div v-else-if="posts.length === 0" class="card">
        <div class="text-center py-12">
          <div class="text-6xl mb-4">📭</div>
          <h2 class="text-2xl font-heading font-bold gradient-text mb-3">
            No hay posts activos
          </h2>
          <p class="text-slate-600 dark:text-slate-400 mb-6">
            @{{ username }} aún no tiene posts para recibir mensajes anónimos
          </p>
        </div>
      </div>

      <!-- Posts List -->
      <div v-else class="card">
        <div class="flex items-center gap-4 pb-6 mb-6 border-b border-slate-200/50 dark:border-slate-700/50">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>

          <div class="flex-1">
            <h2 class="text-xl font-heading font-bold gradient-text">
              Elige un post
            </h2>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              Selecciona a cuál post quieres enviar un mensaje
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <NuxtLink
            v-for="post in posts"
            :key="post.id"
            :to="`/${username}/${post.key}`"
            class="block group"
          >
            <div class="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div class="flex items-start justify-between gap-4">
                <div class="flex-1">
                  <h3 class="text-lg font-heading font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    📬 {{ post.title }}
                  </h3>
                  <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span class="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      {{ post.messageCount || 0 }} mensajes
                    </span>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
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

const isLoading = ref(false)
const error = ref(null)
const userProfile = ref(null)
const imageError = ref(false)
const posts = ref([])

// Fetch user profile and posts on mount
onMounted(async () => {
  try {
    isLoading.value = true

    // Fetch user profile
    const userResponse = await $fetch(`/api/user/${username.value}`)
    if (userResponse.exists) {
      userProfile.value = userResponse
    }

    // Fetch user's active posts
    const postsResponse = await $fetch(`/api/posts/${username.value}`)
    if (postsResponse.success) {
      posts.value = postsResponse.posts
    }
  } catch (err) {
    console.error('Error fetching user data:', err)
    error.value = 'No se pudo cargar la información del usuario'
  } finally {
    isLoading.value = false
  }
})

// Meta tags
useHead({
  title: `@${username.value} - GhostPost`,
  meta: [
    {
      name: 'description',
      content: `Envía un mensaje anónimo a @${username.value} en GhostPost de forma segura y privada.`
    }
  ]
})
</script>