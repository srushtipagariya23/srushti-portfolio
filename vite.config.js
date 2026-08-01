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
})