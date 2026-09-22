<template>
  <div class="page detail-page" v-if="data">
    <header class="detail-header">
      <button class="back-btn" @click="goBack" aria-label="返回">‹</button>
      <button class="share-btn" aria-label="分享">↗</button>
    </header>

    <div class="detail-cover">
      <img :src="data.cover" :alt="data.name" />
    </div>

    <section class="detail-main">
      <div class="detail-title">
        <h1>{{ data.name }}</h1>
        <span class="rating">{{ data.rating.toFixed(1) }}</span>
      </div>
      <p class="detail-en" v-if="data.nameEn">{{ data.nameEn }}</p>
      <div class="detail-tags">
        <span v-for="tag in data.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">开放时间</div>
          <div class="info-value">{{ data.openHours }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">门票</div>
          <div class="info-value">{{ data.ticketPrice }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">建议时长</div>
          <div class="info-value">{{ data.suggestedDuration }}</div>
        </div>
        <div class="info-item">
          <div class="info-label">地址</div>
          <div class="info-value">{{ data.address }}</div>
        </div>
      </div>

      <div class="block">
        <h2 class="block-title">关于这里</h2>
        <p v-for="(p, i) in data.detail" :key="i" class="detail-para">{{ p }}</p>
      </div>

      <div class="block">
        <h2 class="block-title">交通指南</h2>
        <p v-if="data.transport.subway" class="transport-line">🚇 {{ data.transport.subway }}</p>
        <p v-if="data.transport.bus" class="transport-line">🚌 {{ data.transport.bus }}</p>
        <a
          class="map-link"
          :href="mapUrl"
          target="_blank"
          rel="noopener"
        >📍 在地图中查看</a>
      </div>

      <div class="block" v-if="data.tips?.length">
        <h2 class="block-title">游玩贴士</h2>
        <ul class="tips-list">
          <li v-for="(tip, i) in data.tips" :key="i">{{ tip }}</li>
        </ul>
      </div>
    </section>

    <div class="action-bar">
      <button class="action-btn action-secondary" @click="goMap">📍 地图</button>
      <button
        class="action-btn"
        :class="isFav ? 'action-primary-active' : 'action-primary'"
        @click="toggleFav"
      >
        {{ isFav ? '❤️ 已收藏' : '🤍 收藏' }}
      </button>
    </div>
  </div>
  <div v-else-if="loading" class="loading">加载中…</div>
  <div v-else class="empty-state">
    <div class="empty-icon">😢</div>
    <div class="empty-text">未找到该景点</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAttractionById } from '../api/mock'
import { useFavoritesStore } from '../stores/favorites'

const route = useRoute()
const router = useRouter()
const favStore = useFavoritesStore()

const data = ref(null)
const loading = ref(true)

const isFav = computed(() => data.value && favStore.has(data.value.id))

const mapUrl = computed(() => {
  if (!data.value) return '#'
  const { name, address } = data.value
  const q = encodeURIComponent(`${name} ${address}`)
  return `https://uri.amap.com/marker?position=&name=${encodeURIComponent(name)}&src=mypage&coordinate=gaode&callnative=1&output=html&keyword=${q}`
})

async function load(id) {
  loading.value = true
  data.value = null
  const res = await getAttractionById(id)
  data.value = res
  loading.value = false
}

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}

function goMap() {
  window.open(mapUrl.value, '_blank')
}

function toggleFav() {
  if (!data.value) return
  favStore.toggle(data.value.id)
}

watch(
  () => route.params.id,
  (v) => v && load(v),
  { immediate: false }
)

onMounted(() => load(route.params.id))
</script>

<style scoped>
.detail-page {
  /* sticky header/action 已在流中占据空间,不再需要额外 padding-bottom */
}

.detail-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0));
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.detail-header button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-cover {
  position: relative;
  margin-top: -52px;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #eee;
}

.detail-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-main {
  padding: 16px;
}

.detail-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.detail-title h1 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: var(--color-text);
}

.detail-en {
  margin: 4px 0 8px;
  font-size: var(--font-sm);
  color: var(--color-text-tertiary);
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.info-grid {
  background: var(--color-card);
  border-radius: var(--radius-card);
  overflow: hidden;
  border: 1px solid var(--color-divider);
}

.info-item {
  display: flex;
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-divider);
  align-items: flex-start;
  gap: 12px;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  flex: 0 0 64px;
  font-size: var(--font-sm);
  color: var(--color-text-tertiary);
}

.info-value {
  flex: 1;
  font-size: var(--font-md);
  color: var(--color-text);
  line-height: 1.5;
}

.block {
  margin-top: 20px;
}

.block-title {
  margin: 0 0 10px;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--color-text);
}

.detail-para {
  margin: 0 0 10px;
  font-size: var(--font-md);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.transport-line {
  margin: 0 0 6px;
  font-size: var(--font-md);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.map-link {
  display: inline-block;
  margin-top: 6px;
  font-size: var(--font-sm);
  color: var(--color-primary);
}

.tips-list {
  background: #fff8e7;
  border-radius: var(--radius-card);
  padding: 10px 14px;
  margin: 0;
}

.tips-list li {
  position: relative;
  padding: 4px 0 4px 18px;
  font-size: var(--font-md);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.tips-list li::before {
  content: "💡";
  position: absolute;
  left: 0;
  top: 4px;
  font-size: 12px;
}

.action-bar {
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  gap: 8px;
  padding: 8px 12px calc(8px + env(safe-area-inset-bottom));
  background: var(--color-card);
  border-top: 1px solid var(--color-divider);
}

.action-btn {
  flex: 1;
  height: 44px;
  border-radius: var(--radius-button);
  font-size: var(--font-md);
  font-weight: 500;
}

.action-primary {
  background: var(--color-primary);
  color: #fff;
}

.action-primary-active {
  background: var(--color-primary-light);
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.action-secondary {
  flex: 0 0 100px;
  background: var(--color-bg);
  color: var(--color-text-secondary);
}
</style>