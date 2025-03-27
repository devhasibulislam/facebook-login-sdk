import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  build: {
    outDir: "dist",
  },
  server: {
    https: true,
  },
  plugins: [react(), mkcert()],
});
