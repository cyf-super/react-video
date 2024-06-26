import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      scopeBehaviour: 'local',
      generateScopedName: '[name]_[local]_[hash:5]',
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript ，不开启 antd 的按需引入 会报错
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: 'antd',
          style: (name) => `antd/lib/${name}/style`,
        },
      ],
    }),
  ],
  server: {
    proxy: {
      '^/(api|image|video|ffmpeg|swiper|setting)': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
