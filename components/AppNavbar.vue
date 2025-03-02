<template>
  <header class="bg-white dark:bg-secondary-800 shadow-sm sticky top-0 z-10">
    <div class="container py-4 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold text-primary-600 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
        </svg>
        GhostPost
      </NuxtLink>
      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink to="/" class="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">Inicio</NuxtLink>
        <NuxtLink to="/dashboard" class="text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium">Dashboard</NuxtLink>
        
        <!-- Botón de cambio de tema -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-full bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors"
          aria-label="Cambiar tema"
        >
          <!-- Icono de sol (modo claro) -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <!-- Icono de luna (modo oscuro) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        
        <button 
          v-if="isAuthenticated" 
          @click="handleLogout" 
          class="text-secondary-600 dark:text-secondary-300 hover:text-red-600 dark:hover:text-red-400 flex items-center font-medium"
        >
          <span>Cerrar sesión</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </nav>
      
      <!-- Menú móvil -->
      <div class="md:hidden flex items-center space-x-2">
        <!-- Botón de cambio de tema (móvil) -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-full bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-600 transition-colors"
          aria-label="Cambiar tema"
        >
          <!-- Icono de sol (modo claro) -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <!-- Icono de luna (modo oscuro) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        
        <button @click="isMenuOpen = !isMenuOpen" class="text-secondary-600 dark:text-secondary-300 p-2">
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
    <div v-if="isMenuOpen" class="md:hidden bg-white dark:bg-secondary-800 border-t border-secondary-200 dark:border-secondary-700">
      <div class="container py-4 space-y-4">
        <NuxtLink to="/" class="block text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-2">Inicio</NuxtLink>
        <NuxtLink to="/dashboard" class="block text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium py-2">Dashboard</NuxtLink>
        <button 
          v-if="isAuthenticated" 
          @click="handleLogout" 
          class="w-full text-left text-secondary-600 dark:text-secondary-300 hover:text-red-600 dark:hover:text-red-400 flex items-center font-medium py-2"
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
const { isDark, toggleTheme } = useTheme()
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