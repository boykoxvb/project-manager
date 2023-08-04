import axios from 'axios'
import { store } from '@/store'

// export const BASE_URL = 'http://95.165.161.124:5000' // Пока что настройки тут храним
export const BASE_URL = 'http://projest.ru:5000' // Пока что настройки тут храним


const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  timeout: 3000,
})

$api.interceptors.request.use((config): any => {
  config.headers.Authorization = `Bearer ${store.getters['User/accessToken']}`
  return config
})

$api.interceptors.response.use(
  (config): any => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && !originalRequest._isRetry && error.config) {
      originalRequest._isRetry = true
      try {
        const res = await store.dispatch('User/checkAuth')
        return $api.request(originalRequest)
      } catch (e) {
        const res = await store.dispatch('User/logout')
        console.error('Ошибка обновления токена: пользователь не авторизован')
      }
    }
    throw error
  }
)

export default $api
