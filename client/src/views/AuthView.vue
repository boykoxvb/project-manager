<template>
    <div class="container" @keydown.enter="attemptAuth(email, password)">
    
        <div class="form">
            <div class="form__header">
                Авторизация
            </div>
            <div class="form__login">
                <v-text-field
                    type="email"
                    variant="outlined"
                    clearable 
                    v-model="email"
                    label="E-mail"
                    required
                ></v-text-field>
            </div>
            <div class="form__password">
                <v-text-field
                    type="password"
                    variant="outlined"
                    clearable 
                    v-model="password"
                    label="Пароль"
                    required
                ></v-text-field>
            </div>

            <v-btn
            variant="outlined"
            :loading="authLoading"
            @click="attemptAuth(email, password)"
            >
                Войти
            </v-btn>
            <div class="form__registration">
                <v-chip 
                @click="goToRegistration"
                variant="outlined"  
                link
                append-icon="mdi-account-plus-outline">
                    Регистрация
                </v-chip>
            </div>
        </div>


        <v-snackbar
        color="white"
        v-model="authError.status"
        >
            {{ authError.message }}

            <template v-slot:actions>
                <v-btn
                color="pink"
                variant="outlined"
                @click="authError.status = false"
                >
                Close
                </v-btn>
            </template>

        </v-snackbar>



    </div>

</template>
  
<script lang="ts">
  
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from '@/store/index'
import router from '@/router';

  
  export default defineComponent({
    name: 'AuthView',

    setup() {
  
      const store = useStore()

      const email = ref('')
      const password = ref('')

      const authLoading = ref(false)
      const authError = reactive({
        status: false, 
        message: ''
      })


      const attemptAuth = async (email: string, password: string) => { 
        authLoading.value = true
        const authResult = await store.dispatch('User/login', {email, password})
        authLoading.value = false
        if (authResult.success) {
            router.push('/')
        } else {
            // Тут выкатываем баннер с ошибкой
            authError.status = true
            console.log(authResult)
            authError.message = authResult.response ? authResult.response.data.message : authResult.message
        }
      }

      const goToRegistration = async () => {
        router.push('/registration')
      }


      return {
        email,
        password,
        attemptAuth,
        authLoading,
        authError,
        goToRegistration,
      }
  
    }
  });
</script>

<style lang="scss" scoped>

.container {
    height: 100%;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    background-image: url('../assets/auth_background.jpg');
    background-size: cover;

    .form {
        padding: 20px;
        width: 450px;
        border-radius: 30px;
        background-color: #e4e4e43d;
        display: flex;
        flex-direction: column;
        border: 1px solid rgba(73, 69, 69, 0.795);

        &__header {
            margin-bottom: 30px;
            display: flex;
            justify-content: center;
            padding: 20px;
            font-size: 1.7em;
        }

        &__registration {
            padding: 20px 0 0 20px;
            display: flex;
            justify-content: end;
        }
    }
}


</style>
  