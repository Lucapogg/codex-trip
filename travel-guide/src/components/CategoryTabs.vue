<template>
  <div class="category-tabs">
    <button
      v-for="cat in categories"
      :key="cat.value"
      class="cat-tab"
      :class="{ active: modelValue === cat.value }"
      @click="onClick(cat.value)"
    >
      <span class="cat-icon">{{ cat.icon }}</span>
      <span class="cat-label">{{ cat.label }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: 'all' },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

function onClick(value) {
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.category-tabs {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: var(--color-card);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.category-tabs::-webkit-scrollbar {
  display: none;
}

.cat-tab {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background: var(--color-bg);
  color: var(--color-text-secondary);
  font-size: var(--font-sm);
  white-space: nowrap;
  border: 1px solid transparent;
  transition: all 0.15s ease;
}

.cat-tab.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
}

.cat-icon {
  font-size: 14px;
  line-height: 1;
}
</style>