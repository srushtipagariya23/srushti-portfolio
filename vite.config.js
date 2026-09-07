import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // FIX: Changed from '/srushti-portfolio/' to '/' for custom domain
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // This forces Vite to transpile modern JS into older JS that react-snap can read
    target: 'es2019' 
  }
})