<template>
  <footer class="bg-white py-8 border-t border-secondary-200">
    <div class="container">
      <div class="grid md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-bold mb-4">GhostPost</h3>
          <p class="text-secondary-600">Envía mensajes anónimos a tus amigos de forma sencilla y segura.</p>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-4">Enlaces</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/" class="text-secondary-600 hover:text-primary-600">Inicio</NuxtLink></li>
            <li><NuxtLink to="/dashboard" class="text-secondary-600 hover:text-primary-600">Dashboard</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h3 class="text-lg font-bold mb-4">Legal</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-secondary-600 hover:text-primary-600">Términos de servicio</a></li>
            <li><a href="#" class="text-secondary-600 hover:text-primary-600">Política de privacidad</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-secondary-200 text-center text-secondary-600">
        <p>&copy; {{ new Date().getFullYear() }} GhostPost. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template> 