import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: '首页', showTabBar: true }
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('../views/ListView.vue'),
    meta: { title: '景点列表', showTabBar: false }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/DetailView.vue'),
    meta: { title: '景点详情', showTabBar: false }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue'),
    meta: { title: '搜索', showTabBar: false }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/FavoritesView.vue'),
    meta: { title: '我的收藏', showTabBar: true }
  },
  {
    path: '/me',
    name: 'me',
    component: () => import('../views/ProfileView.vue'),
    meta: { title: '我的', showTabBar: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} - 北京旅行攻略`
  }
})

export default router