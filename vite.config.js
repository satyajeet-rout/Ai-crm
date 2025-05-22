// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),  tailwindcss(),],
  
// })



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/back': {
        target: 'http://localhost:3000', // Backend URL
        changeOrigin: true, // Ensure the host header matches the target
        secure: false, // Not using HTTPS in development
      },
    },
  },
});