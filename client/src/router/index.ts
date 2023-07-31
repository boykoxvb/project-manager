import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TestView from '@/views/MainView.vue'
import AuthVIew from '@/views/AuthView.vue'
import ComponentTest from '@/views/ComponentTest.vue'
import RegistrationView from '@/views/RegistrationView.vue'
import { store } from '@/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: TestView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthVIew,
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView,
  },
  {
    path: '/testing',
    name: 'test',
    component: ComponentTest,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  // Тут проверяем нужна ли проверка авторизации
  if (to.name) {
    if (['auth', 'registration'].includes(to.name.toString())) {
      next()
      return
    }
  }

  const res = await store.dispatch('User/checkAuth')
  if (!res.success) {
    next({ name: 'auth' })
    return
  } else {
    next()
    return
  }
})

export default router
