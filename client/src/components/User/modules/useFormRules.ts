import { ref } from 'vue'

export default function useFormRules() {
  const nameRules = ref([
    (value: string) => {
      if (value) return true
      return 'Обязательное поле'
    }
  ])

  const loginRules = ref([
    (value: string) => {
      if (value) return true
      return 'Обязательное поле'
    }
  ])

  const emailRules = ref([
    (value: string) => {
      if (value) return true
      return 'Обязательное поле'
    },
    (value: string) => {
      if (/.+@.+\..+/.test(value)) return true
      return 'Неверный email'
    },
  ])

  const passwordRules = ref([
    (value: string) => {
      if (value) return true
      return 'Обязательное поле'
    },
    (value: string) => {
      if (value.length > 6) return true
      return 'Слишком короткий пароль'
    },
  ])

  return {
    nameRules,
    loginRules,
    emailRules,
    passwordRules,
  }
}