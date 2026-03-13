import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/body-worn-camera/",
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    target: "es2018",
    minify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router", "react-router-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
          leaflet: ["leaflet", "react-leaflet"],
          charts: ["recharts"]
        }
      }
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://www.centrecities.com:3007',
        changeOrigin: true,
      },
      '/proxy': {
        target: 'http://www.centrecities.com:3007',
        changeOrigin: true,
      }
    }
  }
})