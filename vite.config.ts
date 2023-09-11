import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            mode: "development",
            base: "/",
            strategies: "injectManifest",
            registerType: "autoUpdate",
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
            },
            srcDir: "src",
            filename: "sw-prompt.ts",
            manifest: {
                name: "Keue IO App",
                short_name: "KeueIOApp",
                description: "Keue IO App Description",
                theme_color: "#ffffff",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            },
            devOptions: {
                enabled: process.env.SW_DEV === "true",
                /* when using generateSW the PWA plugin will switch to classic */
                type: "module",
                navigateFallback: "index.html",
                suppressWarnings: true
            }
        })
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
});
