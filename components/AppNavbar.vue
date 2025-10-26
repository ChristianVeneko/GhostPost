<template>
  <header class="sticky top-0 z-50 backdrop-blur-xl">
    <!-- Glassmorphism navbar -->
    <div class="bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-700/50">
      <!-- Animated gradient line -->
      <div class="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 animate-gradient bg-300%"></div>
      
      <div class="container py-4">
        <div class="flex justify-between items-center">
          <!-- Logo with gradient -->
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <div class="relative">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div class="relative w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-glow transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                </svg>
              </div>
            </div>
            
            <span class="text-2xl font-heading font-black gradient-text">
              GhostPost
            </span>
          </NuxtLink>
          
          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-2">
            <NuxtLink 
              to="/" 
              class="px-4 py-2.5 rounded-full font-semibold text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
            >
              🏠 Inicio
            </NuxtLink>
            
            <NuxtLink 
              to="/dashboard" 
              class="px-4 py-2.5 rounded-full font-semibold text-slate-700 dark:text-slate-300 hover:bg-secondary-50 dark:hover:bg-secondary-900/20 hover:text-secondary-600 dark:hover:text-secondary-400 transition-all duration-300"
            >
              📊 Dashboard
            </NuxtLink>
            
            <!-- Theme Toggle Button -->
            <button 
              @click="toggleTheme" 
              class="ml-2 p-3 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-700 dark:text-primary-300 hover:scale-110 transition-all duration-300 shadow-md hover:shadow-glow"
              :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            >
              <!-- Sun icon (light mode) -->
              <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-wave" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- Moon icon (dark mode) -->
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            
            <!-- Logout Button -->
            <button 
              v-if="isAuthenticated" 
              @click="handleLogout" 
              class="ml-2 px-4 py-2.5 rounded-full font-semibold text-accent-600 dark:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/20 flex items-center gap-2 transition-all duration-300"
            >
              <span>Salir</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </nav>
          
          <!-- Mobile Menu Buttons -->
          <div class="md:hidden flex items-center gap-2">
            <!-- Theme Toggle (Mobile) -->
            <button 
              @click="toggleTheme" 
              class="p-3 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 text-primary-700 dark:text-primary-300 transition-all duration-300"
              :aria-label="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            >
              <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            
            <!-- Hamburger Menu Button -->
            <button 
              @click="isMenuOpen = !isMenuOpen" 
              class="p-3 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Mobile Menu Dropdown -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-4"
    >
      <div 
        v-if="isMenuOpen" 
        class="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50"
      >
        <div class="container py-6 space-y-2">
          <NuxtLink 
            to="/" 
            class="block px-4 py-3 rounded-2xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
            @click="isMenuOpen = false"
          >
            🏠 Inicio
          </NuxtLink>
          
          <NuxtLink 
            to="/dashboard" 
            class="block px-4 py-3 rounded-2xl font-semibold text-slate-700 dark:text-slate-300 hover:bg-secondary-50 dark:hover:bg-secondary-900/20 hover:text-secondary-600 dark:hover:text-secondary-400 transition-all"
            @click="isMenuOpen = false"
          >
            📊 Dashboard
          </NuxtLink>
          
          <button 
            v-if="isAuthenticated" 
            @click="handleLogout; isMenuOpen = false" 
            class="w-full text-left px-4 py-3 rounded-2xl font-semibold text-accent-600 dark:text-accent-400 hover:bg-accent-100 dark:hover:bg-accent-900/20 flex items-center gap-2 transition-all"
          >
            <span>Cerrar sesión</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </transition>
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