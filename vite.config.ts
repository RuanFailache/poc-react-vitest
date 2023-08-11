/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePluginFonts } from "vite-plugin-fonts";

export default defineConfig({
  plugins: [
    react(),
    VitePluginFonts({
      google: {
        families: ["Rubik"],
      },
    }),
  ],

  test: {
    include: ["./src/**/*.(spec|test).ts"],
    globals: true,
    environment: "jsdom",
  },
});
