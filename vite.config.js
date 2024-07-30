// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // You can include global SCSS variables or mixins here if needed
        additionalData: `@import "./src/Styles/variables.scss";`,
      },
    },
  },
});
