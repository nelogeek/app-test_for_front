import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/BoardView.vue' 

const routes = [
  { path: '/', component: MainPage }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
