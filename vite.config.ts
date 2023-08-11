/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      google: {
        families: ["Rubik"],
      },
    }),
  ],

  test: {
    include: ["./src/**/*.(spec|test).(ts|tsx)"],
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/config/test/setup.ts"],
  },
});
