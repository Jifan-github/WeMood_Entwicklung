import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ]
    // No proxy needed — Supabase is a remote hosted service,
    // all requests go directly to https://xxxx.supabase.co
})