<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-2xl font-bold text-purple-600">GhostPost</NuxtLink>
        <nav class="flex items-center space-x-4">
          <NuxtLink to="/" class="text-gray-600 hover:text-purple-600">Inicio</NuxtLink>
          <NuxtLink to="/dashboard" class="text-gray-600 hover:text-purple-600">Dashboard</NuxtLink>
        </nav>
      </div>
    </header>
    
    <main class="flex-grow container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
    
    <footer class="bg-gray-100 py-6">
      <div class="container mx-auto px-4 text-center text-gray-600">
        <p>&copy; {{ new Date().getFullYear() }} GhostPost. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Inicializar Firebase al cargar la aplicación
const { $firebaseApp } = useNuxtApp()
</script>
