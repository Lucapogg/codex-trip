<template>
  <div class="page home-page with-tabbar">
    <header class="home-header">
      <div class="home-title">
        <span class="brand">北京旅行攻略</span>
        <span class="brand-sub">Beijing Travel</span>
      </div>
      <div class="home-search" @click="goSearch">
        <span class="search-icon">🔍</span>
        <span class="search-placeholder">搜索景点、标签</span>
      </div>
    </header>

    <!-- 推荐 Banner -->
    <section class="banner" v-if="recommended.length">
      <div class="banner-track" :style="{ transform: `translateX(-${bannerIndex * 100}%)` }">
        <div
          v-for="item in recommended"
          :key="item.id"
          class="banner-slide"
          @click="goDetail(item.id)"
        >
          <img :src="item.cover" :alt="item.name" loading="lazy" />
          <div class="banner-mask">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
      <div class="banner-dots">
        <span
          v-for="(_, i) in recommended"
          :key="i"
          :class="{ active: i === bannerIndex }"
          @click="bannerIndex = i"
        ></span>
      </div>
    </section>

    <!-- 分类 -->
    <CategoryTabs v-model="category" :categories="categories" />

    <!-- 景点列表 -->
    <section class="list-section">
      <h2 class="section-title">
        {{ activeCategoryLabel }}
        <span class="section-count">{{ filteredList.length }} 个景点</span>
      </h2>
      <div class="card-grid">
        <AttractionCard v-for="item in filteredList" :key="item.id" :item="item" />
      </div>
      <div v-if="!filteredList.length" class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-text">该分类暂无景点</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import {
  CATEGORIES,
  getAllAttractions,
  getRecommendedAttractions,
  getCategoryLabel
} from '../api/mock'
import CategoryTabs from '../components/CategoryTabs.vue'
import AttractionCard from '../components/AttractionCard.vue'

const router = useRouter()
const category = ref('all')
const allList = ref([])
const recommended = ref([])
const bannerIndex = ref(0)
let bannerTimer = null

const categories = CATEGORIES

const activeCategoryLabel = computed(() => getCategoryLabel(category.value))
const filteredList = computed(() => {
  if (category.value === 'all') return allList.value
  return allList.value.filter((a) => a.category === category.value)
})

function goSearch() {
  router.push('/search')
}

function goDetail(id) {
  router.push(`/detail/${id}`)
}

onMounted(async () => {
  allList.value = await getAllAttractions()
  recommended.value = await getRecommendedAttractions(5)
  bannerTimer = setInterval(() => {
    if (!recommended.value.length) return
    bannerIndex.value = (bannerIndex.value + 1) % recommended.value.length
  }, 4000)
})

onBeforeUnmount(() => {
  if (bannerTimer) clearInterval(bannerTimer)
})
</script>

<style scoped>
.home-page {

}

.home-header {
  background: var(--color-primary);
  padding: 16px 12px 12px;
  color: #fff;
}

.home-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 10px;
}

.brand {
  font-size: 18px;
  font-weight: 600;
}

.brand-sub {
  font-size: 11px;
  opacity: 0.8;
  letter-spacing: 0.5px;
}

.home-search {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: var(--radius-pill);
  color: var(--color-text-tertiary);
  font-size: var(--font-md);
}

.search-icon {
  margin-right: 6px;
}

/* Banner */
.banner {
  position: relative;
  margin: 12px;
  border-radius: var(--radius-card);
  overflow: hidden;
  background: #eee;
  aspect-ratio: 16 / 9;
}

.banner-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.4s ease;
}

.banner-slide {
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  position: relative;
}

.banner-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 14px 14px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #fff;
}

.banner-mask h3 {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 600;
}

.banner-mask p {
  margin: 0;
  font-size: 12px;
  opacity: 0.9;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.banner-dots {
  position: absolute;
  bottom: 8px;
  right: 12px;
  display: flex;
  gap: 4px;
}

.banner-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
}

.banner-dots span.active {
  width: 18px;
  background: #fff;
  border-radius: 3px;
}

/* 列表 */
.list-section {
  padding: 0 12px;
}

.section-title {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin: 12px 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--color-text);
}

.section-count {
  font-size: var(--font-xs);
  color: var(--color-text-tertiary);
  font-weight: 400;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>