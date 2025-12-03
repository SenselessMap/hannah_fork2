import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/", // chemin du sous-dossier ou sous-domaine
  build: {
    sourcemap: true,
    manifest: true, // Génère manifest.json
    outDir: 'public_html', // Chemin de destination des fichiers générés
  },
})