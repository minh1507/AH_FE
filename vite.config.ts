import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: 'anhoangstore.xyz',
      port: 443, // Use the correct port if necessary
      protocol: 'wss' // Ensure this matches the secure connection
    }
  },
})
