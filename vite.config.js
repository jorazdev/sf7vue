import {defineConfig} from "vite";
import symfonyPlugin from "vite-plugin-symfony";
import vue from "@vitejs/plugin-vue"; 

export default defineConfig({
    plugins: [
        symfonyPlugin(/* options */),
        vue()
    ],

    build: {
        rollupOptions: {
            input: {
              app: "./assets/vue/main.ts" /* relative to the root option */
            },
        },
    }
});