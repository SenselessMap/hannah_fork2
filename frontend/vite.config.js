import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
 
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),    
  ],
  server: {
    // fallback pour les routes SPA
    historyApiFallback: true,
  },
  build: {
    // pour servir index.html pour toutes les routes
    rollupOptions: {
      input: "/index.html",
    },
  },
 
})
