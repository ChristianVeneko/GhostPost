import { ref, watch, onMounted } from 'vue'

export const useTheme = () => {
  // Estado para el tema actual (true = oscuro, false = claro)
  const isDark = ref(false)
  
  // Función para cambiar el tema
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateTheme()
  }
  
  // Función para aplicar el tema al documento
  const updateTheme = () => {
    // Aplicar o quitar la clase 'dark' al elemento html
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }
  
  // Inicializar el tema basado en la preferencia guardada o la preferencia del sistema
  onMounted(() => {
    // Comprobar si hay una preferencia guardada
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      isDark.value = true
    } else if (savedTheme === 'light') {
      isDark.value = false
    } else {
      // Si no hay preferencia guardada, usar la preferencia del sistema
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    // Aplicar el tema inicial
    updateTheme()
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('theme') === null) {
        isDark.value = e.matches
        updateTheme()
      }
    })
  })
  
  return {
    isDark,
    toggleTheme
  }
} 