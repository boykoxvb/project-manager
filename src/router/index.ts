import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TestView from '../views/TestView.vue'
import AuthVIew from '../views/AuthView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: TestView
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthVIew
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
