import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path' // Adicione esta linha

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Ensina que @ significa a pasta src
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});