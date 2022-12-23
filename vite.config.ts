import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import vitePluginImp from 'vite-plugin-imp'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  css: {
    modules: {
      generateScopedName: 'vite_video__[folder]__[local]___[hash:base64:5]',
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
})
