import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './frontend',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './frontend/src')
    }
  },
  server: {
    port: 3000,
    host: true
  }
})
