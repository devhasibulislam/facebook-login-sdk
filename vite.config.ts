import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/facebook-login-sdk/",
  build: {
    outDir: "dist",
  },
  server: {
    https: true,
  },
  plugins: [react(), mkcert()],
});
