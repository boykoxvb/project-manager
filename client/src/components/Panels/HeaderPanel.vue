<template>
  <div class="main-container">
    <div class="header">
      <div class="search">
        <input
          type="text"
          :value="searchTerm"
          class="search-input"
          placeholder="Поиск"
          @input="searchChange"
        />
      </div>
      <div class="instruments">
        <div class="user">
          <!-- <div class="user-name">{{username}}</div> -->
          <div class="exit">
            <v-icon icon="mdi-exit-to-app" />
            <v-menu activator="parent">
              <v-list-item>
                <v-btn variant="tonal" color="error" @click="logout"> Выйти </v-btn>
              </v-list-item>
            </v-menu>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'HeaderPanel',

  setup() {
    const store = useStore()
    const username = computed(() => store.getters['User/email'])
    const searchTerm = computed(() => store.getters['Projects/filterState'].nameSearch)

    const searchChange = (event: Event) => {
      store.commit('Projects/setFilterState', {
        name: (event?.target as HTMLInputElement).value,
      })
    }

    const logout = () => {
      store.dispatch('User/logout')
    }

    return {
      username,
      searchTerm,
      searchChange,
      logout,
    }
  },
})
</script>

<style lang="scss" scoped>
.main-container {
  background-color: #eaf0f4;
  padding: 0 20px;
  height: 100%;
  display: flex;
  align-content: center;

  .header {
    width: 100%;
    display: flex;
    align-content: center;

    .search {
      display: flex;
      align-content: center;

      &-input {
        outline: none;
        padding: 5px 15px;
        border-radius: 40px;
        background-color: rgba($color: #fcfcfc, $alpha: 1);
        margin: 3% 0;
      }
    }

    .instruments {
      display: flex;
      justify-content: end;
      width: 100%;

      .bell-icon {
        margin: 0 7px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
      }

      .user {
        display: flex;
        align-content: center;
        align-items: center;
        cursor: pointer;

        &-name {
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          color: rgba(10, 10, 10, 0.7);
          font-weight: 600;

          &:hover {
            color: rgb(10, 10, 10);
          }
        }
      }
    }
  }
}
</style>
