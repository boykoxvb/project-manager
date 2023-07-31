import { ref } from 'vue'

export default function useFormRules() {
  const nameRules = ref([
    (value: string) => {
      if (value) return true
      return ''
    }
  ])

  const loginRules = ref([
    (value: string) => {
      if (value) return true
      return ''
    }
  ])

  const emailRules = ref([
    (value: string) => {
      if (value) return true
      return ''
    },
    (value: string) => {
      if (/.+@.+\..+/.test(value)) return true
      return ''
    },
  ])

  const passwordRules = ref([
    (value: string) => {
      if (value) return true
      return ''
    },
    (value: string) => {
      if (value.length > 6) return true
      return ''
    },
  ])

  return {
    nameRules,
    loginRules,
    emailRules,
    passwordRules,
  }
}