import { defineConfig } from "vite";
import path from "path";

const projectRoot = path.resolve(__dirname);

export default defineConfig({
    root: "src",
    base: "/wedding-website/",
    build: {
        outDir: path.resolve(projectRoot, "dist"),

        emptyOutDir: true,
    },
    resolve: {
        alias: {
            bootstrap: path.resolve(projectRoot, "node_modules/bootstrap"),
            jquery: path.resolve(projectRoot, "node_modules/jquery"),
        },
    },
    server: {
        port: 3388,
        hot: true,
        host: "0.0.0.0"
    },
});
