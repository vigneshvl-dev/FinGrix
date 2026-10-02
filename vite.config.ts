import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404-for-gh-pages',
      closeBundle() {
        try {
          const distDir = path.resolve(__dirname, 'dist')
          const indexPath = path.join(distDir, 'index.html')
          const notFoundPath = path.join(distDir, '404.html')
          if (fs.existsSync(indexPath)) {
            fs.copyFileSync(indexPath, notFoundPath)
          }
        } catch (e) {
          console.warn('Could not copy 404.html', e)
        }
      },
    },
  ],
  base: '/FinGrix/',
  server: {
    host: true,
    port: 5173,
  },
})

