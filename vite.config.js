import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/seating-chart-engine", // Replace with your repository name
  plugins: [react()],
});