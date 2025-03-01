import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/seating-chart-engine/' : '/', // Conditionally set the base URL
  plugins: [react()],
});