import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // for Vite imports
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx' // ensures JS files are treated as JSX
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@': path.resolve(__dirname, 'src') // ✅ allows @/ imports in tests
    }
  }
})
