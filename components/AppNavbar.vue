<template>
  <header class="bg-white shadow-sm sticky top-0 z-10">
    <div class="container py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold text-primary-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
        </svg>
        GhostPost
      </NuxtLink>
      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink to="/" class="text-secondary-600 hover:text-primary-600 font-medium">Inicio</NuxtLink>
        <NuxtLink to="/dashboard" class="text-secondary-600 hover:text-primary-600 font-medium">Dashboard</NuxtLink>
        <button 
          v-if="isAuthenticated" 
          @click="handleLogout" 
          class="text-secondary-600 hover:text-red-600 flex items-center font-medium"
        >
          <span>Cerrar sesión</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </nav>
      
      <!-- Menú móvil -->
      <div class="md:hidden">
        <button @click="isMenuOpen = !isMenuOpen" class="text-secondary-600 p-2">
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Menú móvil desplegable -->
    <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-secondary-200">
      <div class="container py-4 space-y-4">
        <NuxtLink to="/" class="block text-secondary-600 hover:text-primary-600 font-medium py-2">Inicio</NuxtLink>
        <NuxtLink to="/dashboard" class="block text-secondary-600 hover:text-primary-600 font-medium py-2">Dashboard</NuxtLink>
        <button 
          v-if="isAuthenticated" 
          @click="handleLogout" 
          class="w-full text-left text-secondary-600 hover:text-red-600 flex items-center font-medium py-2"
        >
          <span>Cerrar sesión</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const { isAuthenticated, logout } = useAuth()
const isMenuOpen = ref(false)

// Función para manejar el cierre de sesión
const handleLogout = async () => {
  try {
    isMenuOpen.value = false
    await logout()
    // Redirigir al usuario a la página de inicio después de cerrar sesión
    navigateTo('/')
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

// Cerrar el menú móvil cuando cambia la ruta
watch(() => useRoute().fullPath, () => {
  isMenuOpen.value = false
})
</script> 