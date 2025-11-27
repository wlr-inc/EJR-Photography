import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT,
    host: true,
    allowedHosts: ['ejr-photography.onrender.com'] // add your Render hostname
  }
})

