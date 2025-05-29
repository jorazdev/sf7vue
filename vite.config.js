import {defineConfig} from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import vue from "@vitejs/plugin-vue"; 
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
    plugins: [
        symfonyPlugin(/* options */),
        vue(),
        tailwindcss()
    ],
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './assets'),
          '@assets': path.resolve(__dirname, './assets'),
          '@components': path.resolve(__dirname, './assets/components'),
          '@lib': path.resolve(__dirname, './assets/lib'),
          '@composables': path.resolve(__dirname, './assets/composables'),
          '@images': path.resolve(__dirname, './assets/images'),
          '@app': path.resolve(__dirname, './assets/vue'),
        },
      },
    server: {
        host: "localhost",
        port: 5173,
        https: false,
        cors: {
            origin: ["http://localhost:5173", "http://localhost:8000", "http://127.0.0.1:8000"],
            credentials: true,
        },
        watch: {
            usePolling: true,
        }
    },
    build: {
        outDir: "public/build",
        assetsDir: "assets",
        rollupOptions: {
            input: {
              app: "./assets/vue/main.ts" /* relative to the root option */
            },
        },
    },
    base: process.env.NODE_ENV === "production" ? "/https://sf7vue.com/" : "/",
    css: {
        preprocessorOptions: {
          scss: { api: 'modern-compiler' },
        }
      }
});