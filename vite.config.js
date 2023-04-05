import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      // allow: ['/var/www/html/portfolio/ecommerce-react/.env'],
    },
    origin: 'http://127.0.0.1',
  },
})
