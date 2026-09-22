<template>
  <div class="page search-page">
    <header class="search-header">
      <button class="back-btn" @click="goBack" aria-label="返回">‹</button>
      <div class="search-input-wrap">
        <SearchBar v-model="keyword" placeholder="搜索景点、标签、区域" @submit="onSubmit" />
      </div>
      <button class="cancel-btn" @click="goBack">取消</button>
    </header>

    <section v-if="!submitted" class="section">
      <div class="section-head">
        <h3>历史搜索</h3>
        <button v-if="history.length" class="clear-btn" @click="onClearHistory">清空</button>
      </div>
      <div v-if="history.length" class="history-tags">
        <button
          v-for="item in history"
          :key="item"
          class="history-tag"
          @click="onPickHistory(item)"
        >
          {{ item }}
        </button>
      </div>
      <div v-else class="empty-state empty-inline">
        <span class="empty-icon">🕘</span>
        <span>暂无搜索历史</span>
      </div>

      <h3 class="section-title">热门搜索</h3>
      <div class="hot-tags">
        <button v-for="t in hotTags" :key="t" class="hot-tag" @click="onPickHistory(t)">{{ t }}</button>
      </div>
    </section>

    <section v-else class="section">
      <div class="section-head">
        <h3>搜索结果 "{{ submitted }}"</h3>
        <span class="result-count">{{ results.length }} 条</span>
      </div>
      <div v-if="results.length" class="card-list">
        <AttractionCard v-for="item in results" :key="item.id" :item="item" />
      </div>
      <div v-else class="empty-state">
        <div class="empty-icon">🔍</div>
        <div class="empty-text">未找到相关景点</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { searchAttractions } from '../api/mock'
import { useSearchHistoryStore } from '../stores/searchHistory'
import SearchBar from '../components/SearchBar.vue'
import AttractionCard from '../components/AttractionCard.vue'

const router = useRouter()
const historyStore = useSearchHistoryStore()

const keyword = ref('')
const submitted = ref('')
const results = ref([])
const history = ref(historyStore.items)
const hotTags = ['故宫', '长城', '颐和园', '博物馆', '南锣鼓巷', '什刹海']

function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/')
}

function onSubmit(value) {
  const v = (value || '').trim()
  if (!v) {
    submitted.value = ''
    results.value = []
    return
  }
  submitted.value = v
  historyStore.add(v)
  history.value = historyStore.items
  refresh(v)
}

async function refresh(v) {
  results.value = await searchAttractions(v)
}

function onPickHistory(item) {
  keyword.value = item
  onSubmit(item)
}

function onClearHistory() {
  historyStore.clear()
  history.value = []
}

watch(keyword, (v) => {
  if (!v) {
    submitted.value = ''
    results.value = []
  }
})
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  background: var(--color-bg);
}

.search-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--color-card);
  border-bottom: 1px solid var(--color-divider);
}

.back-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: var(--color-text);
}

.search-input-wrap {
  flex: 1;
}

.cancel-btn {
  font-size: var(--font-md);
  color: var(--color-text-secondary);
  padding: 0 4px;
}

.section {
  padding: 12px;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-head h3 {
  margin: 0;
  font-size: var(--font-md);
  font-weight: 600;
  color: var(--color-text);
}

.clear-btn {
  font-size: var(--font-sm);
  color: var(--color-text-tertiary);
}

.result-count {
  font-size: var(--font-sm);
  color: var(--color-text-tertiary);
}

.section-title {
  margin: 18px 0 10px;
  font-size: var(--font-md);
  font-weight: 600;
  color: var(--color-text);
}

.history-tags,
.hot-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-tag,
.hot-tag {
  padding: 5px 12px;
  background: var(--color-card);
  border-radius: var(--radius-pill);
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
}

.empty-inline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-tertiary);
  font-size: var(--font-sm);
  padding: 8px 0;
}

.card-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>