<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 md:py-32 overflow-hidden">
      <!-- Animated background -->
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 animate-gradient bg-300%"></div>
        <div class="absolute top-20 right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 left-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-wave"></div>
      </div>
      
      <div class="container">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <!-- Animated emoji -->
          <div class="inline-block">
            <div class="text-8xl md:text-9xl animate-float">
              👻
            </div>
          </div>
          
          <!-- Title -->
          <h1 class="text-5xl md:text-7xl font-heading font-black leading-tight">
            <span class="block gradient-text">¡Bienvenido a</span>
            <span class="block gradient-text">GhostPost!</span>
          </h1>
          
          <!-- Subtitle -->
          <p class="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Crea posts y recibe <span class="font-bold text-primary-600 dark:text-primary-400">mensajes anónimos</span> de forma 
            <span class="font-bold text-secondary-600 dark:text-secondary-400">privada y segura</span> ✨
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <NuxtLink to="/dashboard" class="btn btn-primary text-lg px-8 py-4">
              <span>Comenzar ahora</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
            
            <a href="#how-it-works" class="btn btn-secondary text-lg px-8 py-4">
              <span>¿Cómo funciona?</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- How it works -->
    <section id="how-it-works" class="py-20 relative">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-heading font-black gradient-text mb-4">
            ¿Cómo funciona?
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-400">
            Es súper fácil empezar a recibir mensajes anónimos
          </p>
        </div>
        
        <div class="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <!-- Step 1 -->
          <div class="card text-center group hover:scale-105">
            <div class="w-16 h-16 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-glow transform group-hover:rotate-12 transition-transform duration-300">
              <span class="text-3xl font-black text-white">1</span>
            </div>
            <h3 class="text-xl font-heading font-bold text-slate-800 dark:text-slate-200 mb-3">
              Regístrate
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Crea tu cuenta con Google en segundos
            </p>
          </div>
          
          <!-- Step 2 -->
          <div class="card text-center group hover:scale-105">
            <div class="w-16 h-16 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center shadow-glow-cyan transform group-hover:rotate-12 transition-transform duration-300">
              <span class="text-3xl font-black text-white">2</span>
            </div>
            <h3 class="text-xl font-heading font-bold text-slate-800 dark:text-slate-200 mb-3">
              Crea un Post
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Crea posts con links únicos para compartir
            </p>
          </div>
          
          <!-- Step 3 -->
          <div class="card text-center group hover:scale-105">
            <div class="w-16 h-16 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center shadow-glow transform group-hover:rotate-12 transition-transform duration-300">
              <span class="text-3xl font-black text-white">3</span>
            </div>
            <h3 class="text-xl font-heading font-bold text-slate-800 dark:text-slate-200 mb-3">
              Comparte
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Compártelo con tus amigos en redes sociales
            </p>
          </div>
          
          <!-- Step 4 -->
          <div class="card text-center group hover:scale-105">
            <div class="w-16 h-16 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center shadow-glow transform group-hover:rotate-12 transition-transform duration-300">
              <span class="text-3xl font-black text-white">4</span>
            </div>
            <h3 class="text-xl font-heading font-bold text-slate-800 dark:text-slate-200 mb-3">
              ¡Recibe!
            </h3>
            <p class="text-slate-600 dark:text-slate-400">
              Lee todos tus mensajes anónimos
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary-50/30 to-transparent dark:via-primary-900/10"></div>
      
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-heading font-black gradient-text mb-4">
            ¿Por qué GhostPost?
          </h2>
          <p class="text-lg text-slate-600 dark:text-slate-400">
            La mejor experiencia para mensajes anónimos
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <!-- Feature 1 -->
          <div class="card group">
            <div class="w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-heading font-bold text-slate-800 dark:text-slate-200 mb-3">
              100% Anónimo
            </h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tus mensajes son completamente anónimos. <span class="font-semibold">Nadie sabrá quién los envió.</span> Tu privacidad está garantizada.
            </p>
          </div>
          
          <!-- Feature 2 -->
          <div class="card group">
            <div class="w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-900/30 dark:to-secondary-800/30 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-secondary-600 dark:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-2xl font-heading font-bold text-slate-800 dark:text-slate-200 mb-3">
              Rápido & Fácil
            </h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Interfaz súper intuitiva y fácil de usar. <span class="font-semibold">Envía mensajes en segundos</span> sin complicaciones.
            </p>
          </div>
          
          <!-- Feature 3 -->
          <div class="card group">
            <div class="w-20 h-20 mb-6 rounded-3xl bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900/30 dark:to-accent-800/30 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-accent-600 dark:text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-2xl font-heading font-bold text-slate-800 dark:text-slate-200 mb-3">
              Súper Seguro
            </h3>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tus datos están protegidos. <span class="font-semibold">Usamos Firebase</span> para garantizar la máxima seguridad.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Final -->
    <section class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 dark:from-primary-900/20 dark:via-secondary-900/20 dark:to-accent-900/20"></div>
      </div>
      
      <div class="container">
        <div class="card max-w-3xl mx-auto text-center relative overflow-hidden">
          <div class="absolute inset-0 -z-10 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10 animate-gradient bg-300%"></div>
          
          <div class="space-y-6">
            <div class="text-6xl animate-wave">🚀</div>
            
            <h2 class="text-3xl md:text-4xl font-heading font-black gradient-text">
              ¿Listo para empezar?
            </h2>
            
            <p class="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Crea tus posts privados y recibe mensajes anónimos de forma segura.
            </p>
            
            <NuxtLink to="/dashboard" class="btn btn-primary text-xl px-10 py-5 inline-flex">
              <span>Crear mi primer post gratis</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Meta tags
useHead({
  title: 'GhostPost - Mensajes Anónimos Seguros',
  meta: [
    {
      name: 'description',
      content: 'Envía y recibe mensajes anónimos de forma segura con GhostPost. La plataforma más fácil para conectar con tus amigos de manera anónima.'
    }
  ]
})
</script> 