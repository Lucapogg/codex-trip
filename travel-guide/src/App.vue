<template>
  <div class="app">
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta?.transition || 'slide'" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </router-view>
    <TabBar v-if="showTabBar" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import TabBar from './components/TabBar.vue'

const route = useRoute()
const showTabBar = computed(() => route.meta?.showTabBar === true)
</script>

<style>
html,
body {
  background: #ececec;
}

.app {
  position: relative;
  max-width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background: var(--color-bg);
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.06);
  overflow-x: hidden;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>