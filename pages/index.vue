<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-secondary-900 mb-4">Bienvenido a GhostPost</h1>
      <p class="text-xl text-secondary-600">Envía mensajes anónimos a tus amigos de forma sencilla y segura</p>
    </div>
    
    <div class="grid md:grid-cols-1 gap-8">
      <div class="card">
        <h2 class="text-2xl font-semibold mb-4">¿Cómo funciona?</h2>
        <ol class="space-y-4 text-secondary-700">
          <li class="flex items-start">
            <span class="flex-shrink-0 bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">1</span>
            <span>Regístrate con tu cuenta de Google o GitHub</span>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
            <span>Obtén tu enlace único para compartir</span>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">3</span>
            <span>Compártelo con tus amigos para recibir mensajes anónimos</span>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 bg-primary-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">4</span>
            <span>Revisa los mensajes en tu dashboard personal</span>
          </li>
        </ol>
        
        <div class="mt-6">
          <NuxtLink to="/dashboard" class="btn btn-primary">
            <span>Comenzar ahora</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <div class="mt-16">
      <h2 class="text-2xl font-semibold mb-6 text-center">¿Por qué elegir GhostPost?</h2>
      
      <div class="grid md:grid-cols-3 gap-6">
        <div class="card text-center">
          <div class="bg-primary-100 text-primary-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">100% Anónimo</h3>
          <p class="text-secondary-600">Tus mensajes son completamente anónimos. Nadie sabrá quién los envió.</p>
        </div>
        
        <div class="card text-center">
          <div class="bg-primary-100 text-primary-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Rápido y Sencillo</h3>
          <p class="text-secondary-600">Interfaz intuitiva y fácil de usar. Envía mensajes en segundos.</p>
        </div>
        
        <div class="card text-center">
          <div class="bg-primary-100 text-primary-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Seguro</h3>
          <p class="text-secondary-600">Tus datos están protegidos. Utilizamos Firebase para garantizar la seguridad.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No se necesita ninguna lógica de script después de eliminar el formulario de demostración
</script> 