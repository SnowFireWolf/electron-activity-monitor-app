import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ram',
    name: 'ram',
    component: () => import('@/views/MemoryView.vue')
  },
  {
    path: '/gpu',
    name: 'gpu',
    component: () => import('@/views/GPUView.vue')
  },
  {
    path: '/network',
    name: 'network',
    component: () => import('@/views/NetworkView.vue')
  },
  {
    path: '/allProcess',
    name: 'allProcess',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/AllProcessesView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
