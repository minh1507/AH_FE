import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from any IP address
    port: 5173, // Your Vite server port
    hmr: {
      host: 'anhoangstore.xyz', // Use your domain here
    },
  },
})
