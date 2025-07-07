import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Configuración del proxy para evitar problemas de CORS durante el desarrollo
      '/api/proxy': {
        target: 'https://govia.cl',
        changeOrigin: true,
        rewrite: (path) => {
          // Extraer la URL del parámetro de consulta
          const url = new URL(path, 'http://localhost').searchParams.get('url');
          if (url) {
            // Extraer la ruta relativa de la URL completa
            const parsedUrl = new URL(url);
            return parsedUrl.pathname + parsedUrl.search;
          }
          return path;
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Error de proxy:', err);
          });
        }
      }
    }
  }
})
