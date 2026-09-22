<template>
  <router-link :to="`/detail/${item.id}`" class="attraction-card">
    <div class="card-cover">
      <img :src="item.cover" :alt="item.name" loading="lazy" />
      <span class="card-region">{{ item.region }}</span>
    </div>
    <div class="card-body">
      <div class="card-title">
        <h3>{{ item.name }}</h3>
        <span class="rating">{{ item.rating.toFixed(1) }}</span>
      </div>
      <p class="card-desc">{{ item.description }}</p>
      <div class="card-tags">
        <span v-for="tag in item.tags.slice(0, 2)" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.attraction-card {
  display: block;
  background: var(--color-card);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform 0.15s ease;
}

.attraction-card:active {
  transform: scale(0.98);
}

.card-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #f0f0f0;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-region {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 8px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: var(--font-xs);
  border-radius: var(--radius-pill);
}

.card-body {
  padding: 10px 12px 12px;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 4px;
}

.card-title h3 {
  flex: 1;
  margin: 0;
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-desc {
  margin: 0 0 8px;
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
</style>