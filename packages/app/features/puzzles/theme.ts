export const theme = {
  colors: {
    primary: '#E63946',
    secondary: '#457B9D',
    accent: '#A8DADC',
    background: '#F1FAEE',
    surface: '#FFFFFF',
    text: '#1D3557',
    textLight: '#FFFFFF',
    success: '#06D6A0',
    error: '#E63946',
    warning: '#FFB703',
    border: '#E0E0E0',
    life: '#E63946',
    coin: '#FFB703',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  // Liquid Glass effects for Apple-style glassmorphism
  glass: {
    // Blur intensities
    blur: {
      light: 15,
      medium: 20,
      heavy: 30,
    },
    // Glass tint colors (semi-transparent)
    tint: {
      light: 'rgba(255, 255, 255, 0.7)',
      lightMedium: 'rgba(255, 255, 255, 0.5)',
      lightSubtle: 'rgba(255, 255, 255, 0.3)',
      dark: 'rgba(0, 0, 0, 0.5)',
      darkMedium: 'rgba(0, 0, 0, 0.3)',
      darkSubtle: 'rgba(0, 0, 0, 0.15)',
    },
    // Border colors for glass elements
    border: {
      light: 'rgba(255, 255, 255, 0.25)',
      dark: 'rgba(0, 0, 0, 0.15)',
    },
    // Specular highlight colors (for glass reflections)
    specular: {
      white: 'rgba(255, 255, 255, 0.6)',
      subtle: 'rgba(255, 255, 255, 0.3)',
    },
    // Overlay colors for different states
    overlay: {
      success: 'rgba(6, 214, 160, 0.3)',
      error: 'rgba(230, 57, 70, 0.3)',
      primary: 'rgba(230, 57, 70, 0.2)',
    },
  },
  // Gradient definitions for backgrounds
  gradients: {
    background: {
      light: ['#F1FAEE', '#E3F4F4', '#D4E9E9'],
      dark: ['#1D3557', '#2A4365', '#1A3A52'],
    },
    glass: {
      light: ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.4)'],
      dark: ['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.3)'],
    },
    specular: ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0)'],
  },
}

