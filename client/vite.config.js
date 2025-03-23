import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // '/api/v1': {
      '/api/': {
        // target: 'http://oneblood.azimemil.xyz',
        target: 'http://localhost:2020',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
