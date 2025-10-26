<template>
  <footer class="relative mt-20 overflow-hidden">
    <!-- Animated gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
    
    <!-- Top wave decoration -->
    <div class="absolute top-0 left-0 right-0 h-24 -mt-24">
      <svg viewBox="0 0 1440 320" class="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:0.1" />
            <stop offset="50%" style="stop-color:#06b6d4;stop-opacity:0.1" />
            <stop offset="100%" style="stop-color:#fb7185;stop-opacity:0.1" />
          </linearGradient>
        </defs>
        <path fill="url(#waveGradient)" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,138.7C672,128,768,128,864,149.3C960,171,1056,213,1152,213.3C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </div>
    
    <div class="relative container py-16">
      <div class="grid md:grid-cols-3 gap-12">
        <!-- Brand Section -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center shadow-glow">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-heading font-black gradient-text">GhostPost</h3>
          </div>
          
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            Envía y recibe mensajes anónimos de forma segura. Conecta con tus amigos de una manera única y divertida. 👻✨
          </p>
          
          <!-- Social Links (optional) -->
          <div class="flex items-center gap-3 pt-2">
            <a href="#" class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center text-secondary-600 dark:text-secondary-400 hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" class="w-10 h-10 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600 dark:text-accent-400 hover:scale-110 transition-transform duration-300">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div class="space-y-4">
          <h4 class="text-lg font-heading font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span>🔗</span>
            <span>Enlaces rápidos</span>
          </h4>
          <ul class="space-y-3">
            <li>
              <NuxtLink to="/" class="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-2 group">
                <span class="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:scale-150 transition-transform"></span>
                <span>Inicio</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/dashboard" class="text-slate-600 dark:text-slate-400 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors flex items-center gap-2 group">
                <span class="w-1.5 h-1.5 rounded-full bg-secondary-500 group-hover:scale-150 transition-transform"></span>
                <span>Dashboard</span>
              </NuxtLink>
            </li>
            <li>
              <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors flex items-center gap-2 group">
                <span class="w-1.5 h-1.5 rounded-full bg-accent-500 group-hover:scale-150 transition-transform"></span>
                <span>Ayuda & FAQ</span>
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Info -->
        <div class="space-y-4">
          <h4 class="text-lg font-heading font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <span>ℹ️</span>
            <span>Información</span>
          </h4>
          <div class="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p class="flex items-start gap-2">
              <span>🔒</span>
              <span>100% anónimo y seguro</span>
            </p>
            <p class="flex items-start gap-2">
              <span>⚡</span>
              <span>Rápido y fácil de usar</span>
            </p>
            <p class="flex items-start gap-2">
              <span>🌙</span>
              <span>Modo oscuro incluido</span>
            </p>
          </div>
        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-slate-200/50 dark:border-slate-700/50">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-sm text-slate-600 dark:text-slate-400">
            &copy; {{ new Date().getFullYear() }} <span class="font-bold gradient-text">GhostPost</span>. Hecho con 💜 y ☕
          </p>
          
          <div class="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
            <a href="#" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacidad</a>
            <a href="#" class="hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors">Términos</a>
            <a href="#" class="hover:text-accent-600 dark:hover:text-accent-400 transition-colors">Contacto</a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Decorative circles -->
    <div class="absolute top-10 right-10 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl animate-float"></div>
    <div class="absolute bottom-10 left-10 w-40 h-40 bg-secondary-500/5 rounded-full blur-3xl animate-wave"></div>
  </footer>
</template> 