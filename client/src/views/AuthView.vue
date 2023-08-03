<template>
  <div class="container" @keydown.enter="attemptAuth(email, password)">
    <div class="circles">
      <card-compact class="card" :project="bgProjects[0]"></card-compact>
      <card-compact class="card" :project="bgProjects[1]"></card-compact>
      <card-compact class="card" :project="bgProjects[2]"></card-compact>
      <card-compact class="card" :project="bgProjects[3]"></card-compact>
      <card-compact class="card" :project="bgProjects[4]"></card-compact>
      <card-compact class="card" :project="bgProjects[5]"></card-compact>
      <card-compact class="card" :project="bgProjects[6]"></card-compact>
      <card-compact class="card" :project="bgProjects[7]"></card-compact>
      <card-compact class="card" :project="bgProjects[8]"></card-compact>
      <card-compact class="card" :project="bgProjects[9]"></card-compact>
    </div>
    <div class="form">
      <div class="form__header">Авторизация</div>
      <div class="form__login">
        <v-text-field
          v-model="email"
          type="email"
          variant="outlined"
          clearable
          label="E-mail"
          required
        />
      </div>
      <div class="form__password">
        <v-text-field
          v-model="password"
          type="password"
          variant="outlined"
          clearable
          label="Пароль"
          required
        />
      </div>

      <v-btn variant="outlined" :loading="authLoading" @click="attemptAuth(email, password)">
        Войти
      </v-btn>
      <div class="form__registration">
        <v-chip
          variant="outlined"
          link
          append-icon="mdi-account-plus-outline"
          @click="goToRegistration"
        >
          Регистрация
        </v-chip>
      </div>
    </div>

    <v-snackbar v-model="authError.status" color="white">
      {{ authError.message }}

      <template #actions>
        <v-btn color="pink" variant="outlined" @click="authError.status = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from '@/store/index'
import router from '@/router'
import useBackgroundProjects from '@/components/composables/useBackgroundProjects'

export default defineComponent({
  name: 'AuthView',

  setup() {
    const store = useStore()

    const email = ref('')
    const password = ref('')

    const authLoading = ref(false)
    const authError = reactive({
      status: false,
      message: '',
    })

    const attemptAuth = async (email: string, password: string) => {
      authLoading.value = true
      store.commit('Projects/closeProject')
      const authResult = await store.dispatch('User/login', { email, password })
      authLoading.value = false
      if (authResult.success) {
        router.push('/')
      } else {
        // Тут выкатываем баннер с ошибкой
        authError.status = true
        console.log(authResult)
        authError.message = authResult.response
          ? authResult.response.data.message
          : authResult.message
      }
    }

    const goToRegistration = async () => {
      router.push('/registration')
    }

    const { bgProjects } = useBackgroundProjects()

    return {
      email,
      password,
      attemptAuth,
      authLoading,
      authError,
      goToRegistration,

      bgProjects,
    }
  },
})
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  background: #eaf0f4;
  // background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);

  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // z-index: 0;

    .card {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      // background: rgba(255, 255, 255, 0.2);
      animation: animate 25s linear infinite;
      bottom: -150px;

      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }

        100% {
          transform: translateY(-130vh) rotate(720deg);
          opacity: 0.5;
          border-radius: 50%;
        }
      }

      &:nth-child(1) {
        left: 25%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }

      &:nth-child(2) {
        left: 10%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }

      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }

      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }

      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }

      &:nth-child(6) {
        left: 75%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
      }

      &:nth-child(7) {
        left: 35%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
      }

      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }

      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }

      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }

  .form {
    padding: 20px;
    width: 450px;
    border-radius: 30px;
    background-color: #e4e4e4be;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(73, 69, 69, 0.795);
    z-index: 2;

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
