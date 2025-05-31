import * as path from 'path';
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgo from 'vite-plugin-svgo'

export default defineConfig({
    server: {
        middlewareMode: 'ssr',
        middlewareTypes: {
            '.js': 'application/javascript',
            '.css': 'text/css',
            '.svg': 'image/svg+xml',
        },
    },
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
    base: '/wedding-website/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets', // Ensure assets are included in the build
    }
});
