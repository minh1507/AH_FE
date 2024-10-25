import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 4000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certificates/private-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certificates/certificate.crt'))
    },
    watch: {
      usePolling: true, 
    },
  },
})
