// shims-vue.d.ts
// 让 TypeScript / IDE 把 *.vue 识别为合法的 Vue 组件模块
// 这是 Vue 3 + TS 项目的标准约定文件

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    unknown
  >
  export default component
}