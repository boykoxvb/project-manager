<template>
  <div
    class="container"
    :class="{ container__registration: !isAuthView }"
    @keydown.enter="attemptAuth(authEmail, authPassword)"
  >
    <div class="form-container">
      <div class="form">
        <div class="form__header">Авторизация</div>
        <div class="form__login">
          <v-text-field
            v-model="authEmail"
            type="email"
            variant="outlined"
            clearable
            label="E-mail"
            required
          />
        </div>
        <div class="form__password">
          <v-text-field
            v-model="authPassword"
            type="password"
            variant="outlined"
            clearable
            label="Пароль"
            required
          />
        </div>

        <v-btn
          variant="outlined"
          :disabled="!isAuthValid"
          :loading="authLoading"
          @click="attemptAuth(authEmail, authPassword)"
        >
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
    </div>

    <div class="reg-container">
      <div class="form-reg">
        <div class="form-reg__header">
          <v-btn
            @click="changeView"
            class="btn-back"
            icon="mdi-chevron-left"
            variant="outlined"
            size="small"
          >
          </v-btn>
          <span class="reg-title">Регистрация</span>
        </div>
        <div class="form-reg__name form-reg__item">
          <v-text-field
            v-model="name"
            autocomplete="off"
            variant="outlined"
            clearable
            label="Имя"
            required
            :rules="nameRules"
          />
        </div>
        <div class="form-reg__login form-reg__item">
          <v-text-field
            v-model="login"
            autocomplete="off"
            variant="outlined"
            clearable
            label="Логин"
            required
            :rules="loginRules"
          />
        </div>
        <div class="form-reg__email form-reg__item">
          <v-text-field
            v-model="email"
            autocomplete="off"
            variant="outlined"
            clearable
            label="E-mail"
            required
            :rules="emailRules"
          />
        </div>
        <div class="form-reg__password form-reg__item">
          <v-text-field
            v-model="password"
            autocomplete="off"
            type="password"
            variant="outlined"
            clearable
            label="Пароль"
            required
            :rules="passwordRules"
          />
        </div>
        <div class="form-reg__password form-reg__item">
          <v-text-field
            v-model="password2"
            autocomplete="off"
            type="password"
            variant="outlined"
            clearable
            label="Повторите пароль"
            required
            :rules="passwordRules"
          />
        </div>

        <v-btn
          class="rounded-xl"
          size="large"
          variant="outlined"
          :loading="regLoading"
          :disabled="!isFormValid"
          @click="attemptReg"
        >
          Зарегистрироваться
        </v-btn>
      </div>
    </div>

    <v-snackbar v-model="authError.status" color="white">
      {{ authError.message }}

      <template #actions>
        <v-btn color="pink" variant="outlined" @click="authError.status = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
  <div class="circles">
    <background-card
      v-for="(project, index) in bgProjects"
      :key="project.uuid + index"
      class="card"
      :project="project"
    ></background-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { useStore } from '@/store/index'
import router from '@/router'
import useBackgroundProjects from '@/components/composables/useBackgroundProjects'

import useFormRules from '@/components/composables/useFormRules'
import useRegistrationForm from '@/components/composables/useRegistrationForm'
import BackgroundCard from '@/components/Projects/BackgroundCard.vue'

export default defineComponent({
  name: 'AuthView',
  components: {
    BackgroundCard,
  },

  setup() {
    const store = useStore()

    // Авторизация

    const authEmail = ref('')
    const authPassword = ref('')

    const authLoading = ref(false)
    const authError = reactive({
      status: false,
      message: '',
    })

    const isAuthValid = computed(() => {
      return !!(authEmail.value && authPassword.value)
    })

    const isAuthView = ref(true)

    const changeView = () => {
      isAuthView.value = !isAuthView.value
    }

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
      // router.push('/registration')
      changeView()
    }

    let { bgProjects } = useBackgroundProjects()

    // Регистрация
    const { nameRules, loginRules, emailRules, passwordRules } = useFormRules()
    const { name, login, email, password, password2, regLoading, regError, attemptReg } =
      useRegistrationForm()

    const isFormValid = computed((): boolean => {
      return Boolean(name.value && login.value && password.value && password2.value && email.value)
    })

    return {
      authEmail,
      authPassword,
      attemptAuth,
      authLoading,
      authError,
      goToRegistration,

      bgProjects,

      isAuthView,
      changeView,
      isAuthValid,

      // Регистрция
      nameRules,
      loginRules,
      emailRules,
      passwordRules,

      name,
      login,
      email,
      password,
      password2,
      regLoading,
      regError,

      isFormValid,

      attemptReg,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/components/scss';
.container {
  height: 100%;
  width: 200%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background: $bg-light;
  position: absolute;
  left: 0;
  transition: 1s;
  // left: -100%;
  // background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);

  &__registration {
    transition: 1s;
    left: -100%;
  }

  .form-container {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .reg-container {
    width: 100dvw;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
  }

  .form {
    padding: 20px;
    margin: 20px;
    width: 450px;
    border-radius: 30px;
    background-color: $bg-form;
    z-index: 2;
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

  .form-reg {
    padding: 20px;
    width: 450px;
    border-radius: 30px;
    background-color: $bg-form;
    z-index: 2;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(73, 69, 69, 0.795);
    margin: 20px;

    &__header {
      margin-bottom: 30px;
      display: flex;
      justify-content: start;
      padding: 20px 20px 20px 0;
      font-size: 1.7em;

      .reg-title {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        // position: relative;
        // left: 0px;
      }
    }

    &__registration {
      padding: 20px 0 0 20px;
      display: flex;
      justify-content: end;
    }
  }
}
.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;

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
        transform: translateY(-130vh) rotate(360deg);
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
</style>
