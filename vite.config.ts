import * as path from 'path';
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgo from 'vite-plugin-svgo'

export default defineConfig({
    resolve: {
        alias: {
            '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        }
    },
    plugins: [
        svgo(),
        ViteImageOptimizer({
            webp: {
                quality: 80,
                lossless: false,
            },
            includePublic: true,
            logStats: true,
        }),
    ],

    // Adding GitHub Actions for deployment
    build: {
        outDir: 'dist',
        assetDir: '.',
        // Enabling GitHub Pages support
        base: '/',
    }
});
