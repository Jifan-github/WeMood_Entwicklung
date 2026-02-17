import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  server: {
    proxy: {
      // In development, all /api/v1/* requests are forwarded to Mario's
      // FastAPI server running locally on port 8000.
      // Start Mario's backend first: docker compose up  OR  uvicorn app.main:app --reload
      // In production, set VITE_BACKEND_URL in .env instead.
      '/api/v1': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})