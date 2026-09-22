import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pxToRem from 'postcss-pxtorem'

// 移动端适配:基于 375px 设计稿,JS 在 index.html 里设置
//   1rem = min(viewport, 750) / 10  (即 375 时 1rem=37.5px,750 时 1rem=75px 封顶)
// 所以这里 rootValue 设为 37.5
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [
        pxToRem({
          rootValue: 37.5,
          unitPrecision: 5,
          propList: ['*'],
          selectorBlackList: ['.no-rem'],
          minPixelValue: 2,
          mediaQuery: false,
          replace: true,
          exclude: [/node_modules/]
        })
      ]
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: false
  },
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 800
  }
})