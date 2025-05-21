import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    assetsDir: 'assets',
    // 启用 gzip 压缩
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // 分块策略
    rollupOptions: {
      output: {
        // 分包策略
        manualChunks: {
          'vue-vendor': ['vue']
        },
        assetFileNames: (assetInfo) => {
          const extType = path.extname(assetInfo.name).substring(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(extType)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          if (/js/i.test(extType)) {
            return `assets/js/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 启用源码映射
    sourcemap: false
  },
  // 开发服务器配置
  server: {
    // 启用 gzip 压缩
    compress: true,
    // 配置代理
    proxy: {
      '/api': {
        target: 'https://hao123.web025.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
