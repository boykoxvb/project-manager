import { reactive, ref } from 'vue'
import { useStore } from '@/store'
import router from '@/router'

export default function useFormRules() {

    const store = useStore()

    const name = ref('')
    const login = ref('')
    const email = ref('')
    const password = ref('')
    const password2 = ref('')

    const regLoading = ref(false)
    const regError = reactive({
      status: false, 
      message: ''
    })

    const attemptReg = async () => { 
        if (password.value != password2.value) {
            console.log(password.value, password2.value)
            regError.status = true,
            regError.message = 'Пароли не совпадают'
            return
        }
        regLoading.value = true
        const regResult = await store.dispatch('User/registrate', {name: name.value, login: login.value, email: email.value, password: password.value})
        regLoading.value = false
        if (regResult.success) {
            // Временное решение чтобы не показывать форму активации
            // const authResult = await store.dispatch('User/authorizate', {email: email.value, password: password.value})
            // if (authResult.success) {
                
            // } else {
            //     regError.status = true
            //     regError.message = authResult.response ? authResult.response.data.message : authResult.message
            // }
            router.push('/')
        } else {
            // Тут выкатываем баннер с ошибкой
            regError.status = true
            console.log(regResult)
            regError.message = regResult.response ? regResult.response.data.message : regResult.message
        }
      }

    return {
        name,
        login,
        email,
        password,
        password2,
        regLoading,
        regError,

        attemptReg,

    }
}