<template>
  <div class="page me-page with-tabbar">
    <header class="me-header">
      <div class="me-avatar">🧳</div>
      <div class="me-info">
        <h2 class="me-name">旅行爱好者</h2>
        <p class="me-sub">收藏了 {{ favStore.count }} 个心仪景点</p>
      </div>
    </header>

    <section class="me-stats">
      <router-link to="/favorites" class="stat-item">
        <div class="stat-value">{{ favStore.count }}</div>
        <div class="stat-label">收藏</div>
      </router-link>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ totalCount }}</div>
        <div class="stat-label">景点</div>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <div class="stat-value">{{ categoryCount }}</div>
        <div class="stat-label">分类</div>
      </div>
    </section>

    <section class="me-list">
      <router-link to="/favorites" class="me-row">
        <span class="row-icon">❤️</span>
        <span class="row-label">我的收藏</span>
        <span class="row-extra">{{ favStore.count }} 个</span>
        <span class="row-arrow">›</span>
      </router-link>
      <router-link to="/list" class="me-row">
        <span class="row-icon">🗺</span>
        <span class="row-label">浏览全部景点</span>
        <span class="row-arrow">›</span>
      </router-link>
      <button class="me-row me-row-btn" @click="onReset">
        <span class="row-icon">🔄</span>
        <span class="row-label">重置本地数据</span>
        <span class="row-extra">清空收藏与历史</span>
        <span class="row-arrow">›</span>
      </button>
    </section>

    <section class="me-about">
      <h3>关于</h3>
      <p>北京旅行攻略 v1.0.0</p>
      <p>Vue 3 + Vite + Pinia,纯前端 Mock 数据演示</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllAttractions, CATEGORIES } from '../api/mock'
import { useFavoritesStore } from '../stores/favorites'
import { useSearchHistoryStore } from '../stores/searchHistory'

const favStore = useFavoritesStore()
const historyStore = useSearchHistoryStore()
const totalCount = ref(0)
const categoryCount = ref(CATEGORIES.length - 1)

onMounted(async () => {
  const list = await getAllAttractions()
  totalCount.value = list.length
})

function onReset() {
  if (!confirm('确认清空所有本地数据?(收藏 + 搜索历史)')) return
  favStore.clear()
  historyStore.clear()
}
</script>

<style scoped>
.me-page {

}

.me-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 16px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: #fff;
}

.me-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.me-name {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 600;
}

.me-sub {
  margin: 0;
  font-size: var(--font-sm);
  opacity: 0.9;
}

.me-stats {
  display: flex;
  align-items: center;
  background: var(--color-card);
  margin: -16px 12px 16px;
  border-radius: var(--radius-card);
  padding: 12px 0;
  box-shadow: var(--shadow-card);
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: inherit;
}

.stat-value {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary);
}

.stat-label {
  font-size: var(--font-xs);
  color: var(--color-text-tertiary);
}

.stat-divider {
  width: 1px;
  height: 28px;
  background: var(--color-divider);
}

.me-list {
  margin: 0 12px;
  background: var(--color-card);
  border-radius: var(--radius-card);
  overflow: hidden;
}

.me-row {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 14px 14px;
  gap: 12px;
  border-bottom: 1px solid var(--color-divider);
  color: var(--color-text);
  text-align: left;
}

.me-row:last-child {
  border-bottom: none;
}

.me-row:active {
  background: var(--color-bg);
}

.row-icon {
  font-size: 20px;
}

.row-label {
  flex: 1;
  font-size: var(--font-md);
}

.row-extra {
  font-size: var(--font-sm);
  color: var(--color-text-tertiary);
}

.row-arrow {
  font-size: 18px;
  color: var(--color-text-tertiary);
}

.me-about {
  margin: 16px 12px;
  padding: 12px 14px;
  font-size: var(--font-sm);
  color: var(--color-text-tertiary);
}

.me-about h3 {
  margin: 0 0 6px;
  font-size: var(--font-md);
  color: var(--color-text-secondary);
}

.me-about p {
  margin: 2px 0;
}
</style>