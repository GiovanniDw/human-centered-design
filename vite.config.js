import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/human-centered-design/',
  plugins: [vue()],
  css: {
    devSourcemap: true
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: 'index.html'
    },
    outDir: 'docs/'
  },
  server: {
    port: 3000,
    hmr: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

// export default defineConfig({
//   plugins: [vue()],
//   server: {
//     port: 3000,
//     hmr: true,
//     origin: 'http://localhost:3000',
//     cors: true,
//     proxy: {
//       '/socket.io': {
//         target: 'http://localhost:3000',
//         ws: false,
//       },
//     }
//   },
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },

// })
