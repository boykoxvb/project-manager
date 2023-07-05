import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TestView from '@/views/MainView.vue'
import AuthVIew from '@/views/AuthView.vue'
import ComponentTest from '@/views/ComponentTest.vue'

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
  },
  {
    path: '/testing',
    name: 'test',
    component: ComponentTest
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
