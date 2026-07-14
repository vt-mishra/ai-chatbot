import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    babel({
      presets: [reactCompilerPreset()],
    }),

    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: [
        "robots.txt",
      ],
workbox: {
  maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
},
      manifest: {
         id: "/",
         start_url: "/",

        name: "V/S AI",
        short_name: "V/S AI",

        description:
          "Modern AI Chatbot powered by Gemini. Designed & Developed by Vatan Mishra.",

        theme_color: "#0B1120",
        background_color: "#0B1120",

        display: "standalone",
        orientation: "portrait",

        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      devOptions: {
        enabled: true,
      },
    }),
  ],
});