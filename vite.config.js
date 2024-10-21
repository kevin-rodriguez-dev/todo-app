import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/bootcamp-fsj-25/React/todo-app/', // Ruta base para GitHub Pages
})
