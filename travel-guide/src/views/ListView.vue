<template>
  <div class="page list-page">
    <header class="page-header">
      <button class="back-btn" @click="goBack" aria-label="返回">‹</button>
      全部景点
    </header>

    <CategoryTabs v-model="category" :categories="categories" />

    <div class="filter-bar">
      <div class="region-wrap">
        <button class="region-btn" @click="toggleRegion">
          <span>{{ region || '全部区域' }}</span>
          <span class="caret">▾</span>
        </button>
        <ul v-if="regionOpen" class="region-menu">
          <li
            v-for="r in regionOptions"
            :key="r"
            :class="{ active: r === region }"
            @click="selectRegion(r)"
          >
            {{ r || '全部区域' }}
          </li>
        </ul>
      </div>
      <div class="sort-wrap">
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          class="sort-btn"
          :class="{ active: sort === opt.value }"
          @click="sort = opt.value"
        >
          {{ opt.label }}
        </button>
      </div>
    </div>

    <section class="list-section">
      <div v-if="filteredList.length" class="card-grid">
        <AttractionCard v-for="item in filteredList" :key="item.id" :item="item" />
      </div>
      <div v-else class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-text">没有符合条件的景点</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { CATEGORIES, REGIONS, getAllAttractions, getCategoryLabel } from '../api/mock'
import CategoryTabs from '../components/CategoryTabs.vue'
import AttractionCard from '../components/AttractionCard.vue'

const router = useRouter()
const category = ref('all')
const region = ref('')
const regionOpen = ref(false)
const sort = ref('default')
const allList = ref([])
const categories = CATEGORIES
const regionOptions = ['', ...REGIONS]

const sortOptions = [
  { value: 'default', label: '综合' },
  { value: 'rating', label: '评分' }
]

const filteredList = computed(() => {
  let list = allList.value
  if (category.value !== 'all') {
    list = list.filter((a) => a.category === category.value)
  }
  if (region.value) {
    list = list.filter((a) => a.region === region.value)
  }
  if (sort.value === 'rating') {
    list = [...list].sort((a, b) => b.rating - a.rating)
  }
  return list
})

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}

function toggleRegion() {
  regionOpen.value = !regionOpen.value
}

function selectRegion(r) {
  region.value = r
  regionOpen.value = false
}

;(async () => {
  allList.value = await getAllAttractions()
})()
</script>

<style scoped>
.list-page {
  
}

.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--color-card);
  border-bottom: 1px solid var(--color-divider);
  position: sticky;
  top: var(--header-height);
  z-index: 5;
}

.region-wrap {
  position: relative;
}

.region-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  background: var(--color-bg);
  border-radius: var(--radius-pill);
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
}

.caret {
  font-size: 10px;
  opacity: 0.7;
}

.region-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 110px;
  max-height: 240px;
  overflow-y: auto;
  background: var(--color-card);
  border-radius: var(--radius-button);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 10;
}

.region-menu li {
  padding: 8px 12px;
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
}

.region-menu li.active {
  color: var(--color-primary);
  background: var(--color-primary-light);
}

.sort-wrap {
  display: flex;
  gap: 8px;
}

.sort-btn {
  padding: 4px 10px;
  font-size: var(--font-sm);
  color: var(--color-text-tertiary);
  border-radius: var(--radius-pill);
}

.sort-btn.active {
  color: var(--color-primary);
  background: var(--color-primary-light);
}

.list-section {
  padding: 12px;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>