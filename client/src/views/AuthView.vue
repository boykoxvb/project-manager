<template>
    <div class="container">
    
        <div class="form">
            <div class="form__header">
                Авторизация
            </div>
            <div class="form__login">
                <v-text-field
                    v-model="email"
                    label="e-mail"
                    required
                ></v-text-field>
            </div>
            <div class="form__password">
                <v-text-field
                    v-model="password"
                    label="Пароль"
                    required
                ></v-text-field>
            </div>

            <v-btn
            :loading="false"
            append-icon="mdi-login"
            @click="attemptAuth(email, password)"
            >
                Войти
            </v-btn>
            <div class="form__registration">
                <v-chip link
                append-icon="mdi-account-plus-outline">
                    Регистрация
                </v-chip>
            </div>
        </div>
    </div>

</template>
  
<script lang="ts">
  
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store/index'
import router from '@/router';
  
  export default defineComponent({
    name: 'AuthView',

    setup() {
  
      const store = useStore()

      const email = ref('')
      const password = ref('')

      const attemptAuth = async (email: string, password: string) => { 
        await store.dispatch('User/login', {email, password})
        if (store.getters['User/isAutorized']) {
            router.push('/')
        }
        console.log(store.getters['User/isAutorized'])
        // router.push('/')
      }

        //   const p1 = new TestProject('Изучить Vuetify', 'Программирование', 'sky', new Date())
        //   const p2 = new TestProject('Поменять жизнь', 'Домашнее', 'pink', new Date())
  
  
      return {
        email,
        password,
        attemptAuth,
      }
  
    }
  });
</script>

<style lang="scss" scoped>

@keyframes gridRowLeftSlip {
    from {
        left: 0px;
    }
    to {
        left: -3000px;
    }
}

.background {
    position: absolute;
    top: 0px;
    bottom: 0px;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    z-index: -1;

    .background-row {
        position: absolute;
        left: -50px;
        display: flex;

        &__repeatable {
            position: absolute;
            animation: gridRowLeftSlip 30s linear;
            display: flex;
            width: 3000px;
            gap: 20px;
            padding: 20px;
            border: #000000 2px solid;
        }


        .project-card {
            width: 220px;
        }

    }


}

.container {
    height: 100%;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    background-image: url('../assets/auth_background.jpg');

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
  