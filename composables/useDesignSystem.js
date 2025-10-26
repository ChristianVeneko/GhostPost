/**
 * Design System Composable - "Ethereal Waves"
 * Provides design tokens, theme utilities and animation helpers
 */

export const useDesignSystem = () => {
  // Design Tokens
  const tokens = {
    colors: {
      violet: {
        50: '#f5f3ff',
        100: '#ede8ff',
        200: '#ddd4ff',
        300: '#c4b0ff',
        400: '#a582ff',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
      },
      cyan: {
        50: '#ecfeff',
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63',
      },
      coral: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
      },
    },
    gradients: {
      primary: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
      primaryHover: 'linear-gradient(135deg, #6d28d9 0%, #0891b2 100%)',
      accent: 'linear-gradient(135deg, #8b5cf6 0%, #22d3ee 100%)',
      coral: 'linear-gradient(135deg, #fb7185 0%, #e11d48 100%)',
      text: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
    },
    shadows: {
      glass: '0 8px 32px rgba(139, 92, 246, 0.1), 0 2px 8px rgba(6, 182, 212, 0.05)',
      glassHover: '0 20px 48px rgba(139, 92, 246, 0.15), 0 8px 16px rgba(6, 182, 212, 0.1)',
      glow: '0 0 20px rgba(139, 92, 246, 0.3)',
      glowCyan: '0 0 20px rgba(6, 182, 212, 0.3)',
    },
    animations: {
      quick: '120ms cubic-bezier(0.4, 0, 0.2, 1)',
      smooth: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
      slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    },
    borderRadius: {
      card: '2rem',
      button: '9999px', // full
      input: '1.5rem',
    },
  }

  // Animation Helpers
  const animations = {
    fadeIn: (delay = 0) => ({
      opacity: 0,
      animation: `fadeIn 0.5s ease-out ${delay}ms forwards`,
    }),
    
    slideUp: (delay = 0) => ({
      transform: 'translateY(20px)',
      opacity: 0,
      animation: `slideUp 0.5s ease-out ${delay}ms forwards`,
    }),
    
    wave: () => ({
      animation: 'wave 3s ease-in-out infinite',
    }),
    
    float: () => ({
      animation: 'float 4s ease-in-out infinite',
    }),
  }

  // Glassmorphism helper
  const glassEffect = (opacity = 0.7) => ({
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  })

  const glassEffectDark = (opacity = 0.6) => ({
    background: `rgba(30, 41, 59, ${opacity})`,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(148, 163, 184, 0.1)',
  })

  return {
    tokens,
    animations,
    glassEffect,
    glassEffectDark,
  }
}
