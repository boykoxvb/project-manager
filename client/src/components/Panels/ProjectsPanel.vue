<template>
  <div class="main-container">
    <div class="info">
      <div class="info-header">
        <div class="info-header-projects">
          <span v-if="choosedGroup?.name" class="group"> Проекты </span>
          <span v-else> Проекты </span>
        </div>
        <div class="sorting">
          <div
            class="sorting-deadline"
            :class="{
              'border-black': sortState.deadline != null,
              'border-white': sortState.deadline == null,
            }"
          >
            <v-icon
              v-if="sortState.deadline === true || sortState.deadline === null"
              icon="mdi-sort-calendar-ascending"
              @click="setSortState('deadline', sortState.deadline === null ? true : false)"
            />
            <v-icon
              v-if="sortState.deadline === false"
              icon="mdi-sort-calendar-descending"
              @click="setSortState('deadline', sortState.deadline === false ? null : false)"
            />
          </div>

          <div
            class="sorting-name"
            :class="{
              'border-black': sortState.name != null,
              'border-white': sortState.name == null,
            }"
          >
            <v-icon
              v-if="sortState.name === true || sortState.name === null"
              icon="mdi-sort-alphabetical-ascending"
              @click="setSortState('name', sortState.name === null ? true : false)"
            />
            <v-icon
              v-if="sortState.name === false"
              icon="mdi-sort-alphabetical-descending"
              @click="setSortState('name', sortState.name === false ? null : false)"
            />
          </div>
        </div>
      </div>

      <div class="project__groups">
        <project-groups />
      </div>
    </div>

    <div class="projects">
      <div class="projects-grid">
        <CardCompact
          v-for="project in projects"
          :key="project.uuid"
          :project="project"
          :choosed="project"
          @project:choosed="$emit('project:choosed', project)"
        />

        <div class="add-project" @click="addNewProject()">
          <v-icon icon="mdi-plus" size="x-large" color="grey" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  name: 'ProjectPanel',
  setup() {
    const store = useStore()
    store.dispatch('Projects/fetchGroups')

    const addProjectDialog = ref(false)
    const choosedGroup = computed(() => store.getters['Projects/filterState'].groupFilter)

    const groups = computed(() => store.getters['Projects/allGroups'])
    const projects = computed(() => store.getters['Projects/filteredProjects'])
    const sortState = computed(() => store.getters['Projects/sortState'])

    const setSortState = (sort: string, asc: boolean | null) => {
      store.commit('Projects/setSortState', { sort, asc })
    }

    const addNewProject = async () => {
      if (choosedGroup.value) {
        await store.dispatch('Projects/addNew', choosedGroup.value)
      } else {
        await store.dispatch('Projects/addNew')
      }
    }

    return {
      store,
      groups,
      projects,
      addProjectDialog,
      addNewProject,
      sortState,
      setSortState,
      choosedGroup,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/components/scss/index.scss';

.add-project {
  border-radius: 10%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 7px 12px;
  transition: 0.3s;
  background-color: #efefef;
  height: 172px;
}

.main-container {
  font-size: 24px;
  background-color: rgba($color: #fcfcfc, $alpha: 1);
  border-radius: 30px;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow: hidden;
  font: {
    family: 'Open Sans', sans-serif;
    weight: 600;
  }

  .info {
    flex-grow: 0;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;

    &-header {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;

      .sorting {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-self: end;

        &-deadline {
          border-radius: 8px;
        }

        &-name {
          border-radius: 8px;
        }
      }

      &-projects {
        font-size: 1em;
        text-overflow: ellipsis;

        .group {
          display: inline;
          white-space: nowrap;
        }
      }

      &-date {
        display: block;
        font-size: 1.2em;
        margin: auto 0px;
      }
    }

    .project__groups {
      width: 100%;
      margin: 10px 0;
    }

    &-panel {
      display: flex;

      .state-filters {
        display: flex;
        width: 100%;

        .info-panel__project-count {
          transition: 0.3s;
          padding: 5px;
          margin-right: 10px;
          font-size: 0.9em;
          display: flex;
          border-radius: 10px;
          cursor: pointer;

          &:hover {
            transition: 0.3s;
            background-color: rgb(216, 216, 216);
          }

          .project-state {
            font-size: 0.5em;
          }
        }
      }

      // .project-group__container {
      //   display: flex;

      //   .project-group__item {
      //     padding: 5px 20px;
      //     font-size: 0.6em;
      //     font-weight: 500;
      //     border-radius: 10px;
      //   }
      // }

      // .separator {
      //   width: 1px;
      //   height: 100%;
      //   background-color: #3b3b3b;
      // }
    }
  }

  .projects {
    display: block;
    // flex-grow: 1;
    overflow: auto;
    @include scrollbar;

    &-grid {
      padding: 10px;
      display: grid;
      grid-gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      grid-auto-columns: minmax(220px, 1fr);
    }
  }
}
</style>
