<template>
  <nav class="tab-bar">
    <router-link
      v-for="item in items"
      :key="item.path"
      :to="item.path"
      class="tab-item"
      :class="{ active: isActive(item.path) }"
    >
      <span class="tab-icon">{{ item.icon }}</span>
      <span class="tab-label">{{ item.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const items = [
  { path: '/', label: '首页', icon: '🏠', match: ['/'] },
  { path: '/favorites', label: '收藏', icon: '❤️', match: ['/favorites'] },
  { path: '/me', label: '我的', icon: '👤', match: ['/me'] }
]

const route = useRoute()

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<style scoped>
.tab-bar {
  position: sticky;
  bottom: 0;
  z-index: 100;
  height: var(--tab-bar-height);
  background: var(--color-card);
  border-top: 1px solid var(--color-divider);
  box-shadow: var(--shadow-tab);
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  color: var(--color-text-tertiary);
  font-size: var(--font-xs);
  transition: color 0.15s ease;
}

.tab-item.active {
  color: var(--color-primary);
}

.tab-icon {
  font-size: 22px;
  line-height: 1;
}

.tab-label {
  font-size: 11px;
}
</style>