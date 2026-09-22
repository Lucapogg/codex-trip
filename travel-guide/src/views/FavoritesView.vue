<template>
  <div class="page favorites-page with-tabbar">
    <header class="page-header">我的收藏</header>

    <section class="section">
      <div v-if="favList.length" class="card-grid">
        <AttractionCard v-for="item in favList" :key="item.id" :item="item" />
      </div>
      <div v-else class="empty-state">
        <div class="empty-icon">❤️</div>
        <div class="empty-text">还没有收藏任何景点</div>
        <button class="btn-primary" @click="goExplore">去逛逛</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getAllAttractions } from '../api/mock'
import { useFavoritesStore } from '../stores/favorites'
import AttractionCard from '../components/AttractionCard.vue'

const router = useRouter()
const favStore = useFavoritesStore()
const favList = ref([])
const allList = ref([])

function goExplore() {
  router.push('/')
}

async function load() {
  if (!allList.value.length) {
    allList.value = await getAllAttractions()
  }
  favList.value = allList.value.filter((a) => favStore.has(a.id))
}

watch(
  () => favStore.ids,
  () => load(),
  { deep: true }
)

load()
</script>

<style scoped>
.favorites-page {

}

.section {
  padding: 12px;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
</style>