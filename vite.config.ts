import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    WindiCSS(),vue()],
      // 配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 配置全局 less 样式文件
css: {
  preprocessorOptions: {
    less: {
      //less文件地址
      additionalData: `
        @import "@/assets/styles/base.less";
      `,
    }
  },
},
})
