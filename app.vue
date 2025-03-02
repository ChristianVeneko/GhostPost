<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-secondary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-950 dark:text-white">
    <AppNavbar />
    
    <main class="flex-grow container py-8">
      <NuxtPage />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup>
// Inicializar Firebase al cargar la aplicación
const { $firebaseApp } = useNuxtApp()
</script>
