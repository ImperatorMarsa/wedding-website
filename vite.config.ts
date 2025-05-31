import * as path from 'path';
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgo from 'vite-plugin-svgo'

export default defineConfig({
    server: {
        middlewareMode: 'ssr',
        middlewareTypes: {
            '.js': 'application/javascript',
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

    build: {
        outDir: 'dist',
    }
});
