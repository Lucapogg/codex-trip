# 北京旅行攻略(travel-guide)

移动端 SPA,展示北京知名旅游景点信息。

## 技术栈

- Vue 3 + Vite
- Vue Router 4
- Pinia
- postcss-px-to-viewport(px → vw 移动端适配)
- 纯 CSS,无 UI 组件库依赖

## 开发

```bash
npm install
npm run dev     # 启动开发服务器 (http://localhost:5173)
```

## 构建

```bash
npm run build
npm run preview
```

## 数据

所有景点数据来自 `src/data/attractions.json`,通过 `src/api/mock.js` 模拟接口返回。
收藏 / 搜索历史持久化在 `localStorage`。

## 目录

```
src/
├── api/             # mock 接口
├── assets/styles/   # 全局样式
├── components/      # 公共组件
├── data/            # 静态数据
├── router/          # 路由
├── stores/          # pinia 状态
├── utils/           # 工具
└── views/           # 页面
```