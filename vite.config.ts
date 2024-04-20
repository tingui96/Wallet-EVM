import { defineConfig } from 'vite'
import rollupNodePolyFill from 'rollup-plugin-polyfill-node'


import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
      rollupOptions: {
        plugins: [
          rollupNodePolyFill()
        ]
      }
    }
})
