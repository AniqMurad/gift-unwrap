import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import defaultTheme from 'tailwindcss/defaultTheme'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // theme:{
    //   extend: {
    //     fontFamily: {
    //       sans: ['Instrument Sans', 'sans-serif'],
    //     },
    //   }
    // }
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap');`
      }
    }
  }
})