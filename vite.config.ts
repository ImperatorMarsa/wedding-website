import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgo from 'vite-plugin-svgo'

export default defineConfig({
  plugins: [
    svgo(), // Оптимизация SVG
    ViteImageOptimizer({
      // Настройки преобразования в WebP
      webp: {
        quality: 80,
        lossless: false,
      },
      // Генерация разных размеров
      includePublic: true,
      logStats: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  }
})
