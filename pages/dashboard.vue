<template>
  <div>
    <!-- Pantalla de carga -->
    <div v-if="authLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    </div>

    <!-- Pantalla de login -->
    <div v-else-if="!isAuthenticated" class="max-w-md mx-auto">
      <div class="card">
        <h1 class="text-2xl font-bold text-center mb-6">Inicia sesión para continuar</h1>

        <div class="space-y-4">
          <button
            @click="signInWithGoogle"
            class="w-full btn-primary py-3 px-4 flex items-center justify-center gap-3"
            :disabled="isLoading"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" class="w-5 h-5" />
            <span>Continuar con Google</span>
          </button>
        </div>

        <AlertMessage
          v-if="authError"
          type="error"
          :message="authError"
          class="mt-4"
        />
      </div>
    </div>

    <!-- Dashboard del usuario -->
    <div v-else class="space-y-8">
      <!-- Header compacto con foto -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            :alt="user.displayName || 'Usuario'"
            class="w-12 h-12 rounded-full ring-2 ring-primary-400 dark:ring-primary-500"
          />
          <div
            v-else
            class="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-xl font-bold ring-2 ring-primary-400 dark:ring-primary-500"
          >
            {{ (user.displayName || user.email || 'U')[0].toUpperCase() }}
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900 dark:text-white">{{ user.displayName || user.email }}</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">@{{ user.email?.split('@')[0] }}</p>
          </div>
        </div>
      </div>

      <!-- Estadísticas compactas -->
      <div class="grid grid-cols-3 gap-4">
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ posts.length }}</div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Posts</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{{ activePosts.length }}</div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Activos</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-secondary-600 dark:text-secondary-400 mb-1">{{ totalMessages }}</div>
          <div class="text-xs text-gray-600 dark:text-gray-400">Mensajes</div>
        </div>
      </div>

      <!-- Tabs de navegación -->
      <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div class="flex gap-1">
          <button
            @click="filter = 'all'"
            :class="[
              'px-4 py-3 font-medium transition-colors relative',
              filter === 'all'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            ]"
          >
            Todos
            <div
              v-if="filter === 'all'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
            ></div>
          </button>
          <button
            @click="filter = 'active'"
            :class="[
              'px-4 py-3 font-medium transition-colors relative',
              filter === 'active'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            ]"
          >
            Activos
            <div
              v-if="filter === 'active'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
            ></div>
          </button>
          <button
            @click="filter = 'inactive'"
            :class="[
              'px-4 py-3 font-medium transition-colors relative',
              filter === 'inactive'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            ]"
          >
            Pausados
            <div
              v-if="filter === 'inactive'"
              class="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500"
            ></div>
          </button>
        </div>

        <button
          @click="openCreateModal"
          class="btn-primary px-4 py-2 text-sm flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Nuevo post
        </button>
      </div>

      <!-- Loading de posts -->
      <div v-if="postsLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SkeletonLoader v-for="i in 4" :key="i" />
      </div>

      <!-- Grid de posts -->
      <div v-else-if="filteredPosts.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PostCard
          v-for="post in filteredPosts"
          :key="post.id"
          :post="post"
          @toggle-status="togglePostStatus"
          @delete="deletePostHandler"
          @view-messages="viewPostMessages"
        />
      </div>

      <!-- Estado vacío -->
      <div v-else class="card text-center py-16">
        <div class="text-6xl mb-4">
          {{ filter === 'all' ? '📝' : filter === 'active' ? '✨' : '⏸️' }}
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {{
            filter === 'all'
              ? 'Crea tu primer post'
              : filter === 'active'
                ? 'No tienes posts activos'
                : 'No tienes posts pausados'
          }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{
            filter === 'all'
              ? 'Empieza a recibir mensajes anónimos con un post'
              : filter === 'active'
                ? 'Activa algún post para empezar a recibir mensajes'
                : 'Los posts pausados no reciben nuevos mensajes'
          }}
        </p>
        <button
          v-if="filter === 'all' || filter === 'active'"
          @click="openCreateModal"
          class="btn-primary px-8 py-3 inline-flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Crear post
        </button>
      </div>

      <!-- Modal de mensajes del post -->
      <PostMessagesModal
        v-if="selectedPost"
        :post="selectedPost"
        @close="selectedPost = null"
      />
    </div>
  </div>

  <!-- Modal crear post (Teleport para overlay) -->
  <Teleport to="body">
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      @click.self="closeCreateModal"
    >
      <div class="w-full max-w-2xl animate-float">
        <PostForm
          @created="handlePostCreated"
          @cancel="closeCreateModal"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

definePageMeta({
  middleware: []
})

const { user, isAuthenticated, loading: authLoading, signInWithGoogle, error: authError } = useAuth()
const { posts, getUserPosts, togglePostStatus: toggleStatus, deletePost, activePosts, inactivePosts, totalMessages } = usePosts()

const isLoading = ref(false)
const postsLoading = ref(false)
const showCreateModal = ref(false)
const filter = ref('all')
const selectedPost = ref(null)

const filteredPosts = computed(() => {
  if (filter.value === 'all') return posts.value
  if (filter.value === 'active') return activePosts.value
  if (filter.value === 'inactive') return inactivePosts.value
  return posts.value
})

onMounted(async () => {
  if (isAuthenticated.value) {
    await loadPosts()
  }
})

// Watch para cargar posts cuando el usuario se autentique
watch(isAuthenticated, async (newVal) => {
  if (newVal && posts.value.length === 0) {
    await loadPosts()
  }
})

const loadPosts = async () => {
  postsLoading.value = true
  try {
    await getUserPosts()
  } catch (err) {
    console.error('Error loading posts:', err)
  } finally {
    postsLoading.value = false
  }
}

const openCreateModal = () => {
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
}

const handlePostCreated = async (post) => {
  await loadPosts()
  closeCreateModal()
}

const togglePostStatus = async (postId) => {
  try {
    await toggleStatus(postId)
  } catch (err) {
    console.error('Error toggling post status:', err)
    alert('Error al cambiar el estado del post')
  }
}

const deletePostHandler = async (postId) => {
  try {
    await deletePost(postId)
  } catch (err) {
    console.error('Error deleting post:', err)
    alert('Error al eliminar el post')
  }
}

const viewPostMessages = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    selectedPost.value = post
  }
}
</script>
