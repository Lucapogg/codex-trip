<template>
  <div class="search-bar">
    <span class="search-icon">🔍</span>
    <input
      v-model="text"
      type="search"
      class="search-input"
      :placeholder="placeholder"
      :maxlength="maxlength"
      @input="onInput"
      @keyup.enter="onSubmit"
      @clear="onClear"
    />
    <button v-if="text" class="clear-btn" @click="clearText" aria-label="清空">✕</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '搜索景点、标签' },
  maxlength: { type: Number, default: 30 }
})

const emit = defineEmits(['update:modelValue', 'submit', 'clear'])

const text = ref(props.modelValue)

watch(
  () => props.modelValue,
  (v) => {
    if (v !== text.value) text.value = v
  }
)

let timer = null
function onInput() {
  emit('update:modelValue', text.value)
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => emit('submit', text.value), 300)
}

function onSubmit() {
  if (timer) clearTimeout(timer)
  emit('submit', text.value)
}

function clearText() {
  text.value = ''
  emit('update:modelValue', '')
  emit('clear')
}

function onClear() {
  emit('clear')
}
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  background: var(--color-bg);
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  transition: border-color 0.15s ease;
}

.search-bar:focus-within {
  border-color: var(--color-primary);
  background: var(--color-card);
}

.search-icon {
  font-size: 14px;
  margin-right: 6px;
  opacity: 0.6;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: var(--font-md);
  color: var(--color-text);
  padding: 0;
}

.search-input::placeholder {
  color: var(--color-text-tertiary);
}

.clear-btn {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.15);
  color: #fff;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
</style>