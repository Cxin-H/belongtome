import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// 新增：导入 path 模块（Node 内置，无需额外安装）
import path from 'path'

export default defineConfig({
  plugins: [
    Vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
          resolveIcons: true
        })
      ]
    })
  ],
  // 新增：配置路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // __dirname 是项目根目录，指向 src
    }
  },
  // 之前的 Less 配置（如果有）
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "@/assets/styles/variables.less";`
        },
        javascriptEnabled: true
      }
    }
  }
})