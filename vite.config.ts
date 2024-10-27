import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Bind to all available interfaces
    port: 5173,      // Specify the port you want to use
    hmr: {
      host: 'localhost', // Adjust this for HMR if necessary
      protocol: 'ws'     // Use 'ws' for non-secure connections
    }
  }
})
