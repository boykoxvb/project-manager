<template>
  <div class="container">
    <div class="form">
      <div class="form__header">Регистрация</div>
      <div class="form__name form__item">
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
      <div class="form__login form__item">
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
      <div class="form__email form__item">
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
      <div class="form__password form__item">
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
      <div class="form__password form__item">
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

    <v-snackbar v-model="regError.status" color="white">
      {{ regError.message }}

      <template #actions>
        <v-btn color="pink" variant="outlined" @click="regError.status = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import useFormRules from '@/components/composables/useFormRules'
import useRegistrationForm from '@/components/composables/useRegistrationForm'

export default defineComponent({
  name: 'AuthView',

  setup() {
    const { nameRules, loginRules, emailRules, passwordRules } = useFormRules()
    const { name, login, email, password, password2, regLoading, regError, attemptReg } =
      useRegistrationForm()

    const isFormValid = computed((): boolean => {
      return Boolean(name && login && password && password2 && email)
    })

    return {
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
