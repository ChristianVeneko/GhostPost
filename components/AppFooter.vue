<template>
  <footer class="bg-white dark:bg-secondary-800 py-8 border-t border-secondary-200 dark:border-secondary-700">
    <div class="container">
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-4 dark:text-white">GhostPost</h3>
          <p class="text-secondary-600 dark:text-secondary-400">Envía mensajes anónimos a tus amigos de forma sencilla y segura.</p>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-4 dark:text-white">Enlaces</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400">Inicio</NuxtLink></li>
            <li><NuxtLink to="/dashboard" class="text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400">Dashboard</NuxtLink></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-secondary-200 dark:border-secondary-700 text-center text-secondary-600 dark:text-secondary-400">
        <p>&copy; {{ new Date().getFullYear() }} GhostPost. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template> 