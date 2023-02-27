import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  devServer:{
    proxy:{
      '^/admin':{
        target:"http://127.0.0.1:500",
        ws:true,
        changeOrigin:true,
        secure:false,
        pathRewrite:{'^/admin':'/admin'},
        logLevel:'debug'
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
