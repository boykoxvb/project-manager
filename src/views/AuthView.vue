<template>
    <div class="container">
        <div class="form">
            <div class="form__header">
                Авторизация
            </div>
            <div class="form__login">
                <v-text-field
                    v-model="login"
                    label="Логин"
                    required
                ></v-text-field>
            </div>
        </div>
    </div>

</template>
  
<script lang="ts">
  
  import { defineComponent, ref } from 'vue';
  import * as ProjectManager from '@/classes'
  import { useStore } from '@/store'
  
  export default defineComponent({
    name: 'AuthView',

    setup() {
  
      const store = useStore()

      const login = ref('')
      const password = ref('')
  
  
      return {
        login,
        password,
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

    .form {
        width: 450px;
        height: 600px;
        border-radius: 30px;
        background-color: #edfffb;
        display: flex;
        flex-direction: column;

        &__header {
            display: flex;
            justify-content: center;
            padding: 20px;
            font-size: 1.7em;
        }
    }
}


</style>
  