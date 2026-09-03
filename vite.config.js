import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@splinetool')) return 'spline'
          if (id.includes('@react-three') || id.includes('/three/')) return 'three'
          if (id.includes('gsap') || id.includes('lenis') || id.includes('motion')) return 'motion'
          return undefined
        },
      },
    },
  },
})
