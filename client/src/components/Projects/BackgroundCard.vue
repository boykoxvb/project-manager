<template>
  <div class="full-container" ref="projectContainer">
    <div
      class="project-container"
      :class="{ [`color-${project?.group?.color}`]: true, 'shadow-blue': choosedProject }"
      @click="chooseProject()"
    >
      <div class="header">
        <div class="deadline">
          <div class="deadline-container" v-if="!isEditing">
            {{ project.dateString(project.deadline) }}
            <div v-if="deadlineIsExpired" class="deadline-flag"></div>
          </div>
          <input
            v-if="isEditing"
            :value="project.deadline?.toISOString().slice(0, 10)"
            class="date-input"
            type="date"
            :name="`${project.uuid}-deadline__input`"
          />
        </div>
        <div class="tools">
          <div class="tools-button tools-edit" v-if="choosedProject">
            <v-icon
              v-show="!isEditing"
              @click.stop="isEditing = !isEditing"
              icon="mdi-pencil-outline"
              size="small"
            ></v-icon>
          </div>
          <div class="tools-button tools-delete" v-if="choosedProject">
            <vb-icon-timer v-if="!isEditing" @timeout="deleteProject()"></vb-icon-timer>
          </div>
          <div class="tools-button tools-close">
            <v-icon
              v-if="isEditing"
              @click.stop="cancelChanges()"
              icon="mdi-close-outline"
              size="small"
            ></v-icon>
          </div>
        </div>
      </div>
      <div class="loading">
        <v-progress-linear v-show="isLoading" indeterminate></v-progress-linear>
      </div>

      <div class="project-labels">
        <div class="project-name">
          <input
            class="default-input"
            :class="{ editing: isEditing }"
            type="text"
            :value="project.name"
            :readonly="!isEditing"
            placeholder="Название проекта"
          />
        </div>
        <div class="project-group">
          <span v-if="!isEditing">{{ project.group?.name ?? 'Группа проекта' }}</span>
          <vb-choosable-input
            v-if="isEditing"
            :disabled="!isEditing"
            :select="project?.group?.name"
            :menu="[]"
          >
          </vb-choosable-input>
        </div>
      </div>
      <div class="progress">
        <div class="progress-text">Progress</div>
        <vb-progress-bar :progress="project.progress"></vb-progress-bar>
        <div class="progress-percent">{{ project.progress }}%</div>
      </div>
      <div class="other-data"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { type PropType, onMounted, defineComponent, ref, computed, reactive, watch } from 'vue'
import { vbProgressBar, vbChoosableInput, vbIconTimer } from '@/components'
import { Project, ProjectGroup, IProjectChangeset } from '@/classes'
import { useStore } from '@/store'

export default defineComponent({
  name: 'BackgroundCard',
  components: {
    vbProgressBar,
    vbChoosableInput,
    vbIconTimer,
  },
  props: {
    project: { type: Object as PropType<Project>, required: true },
  },

  setup(props, { emit }) {
    const store = useStore()
    const projectContainer = ref<HTMLElement | null>(null)

    /* ВЫБОР АКТИВНОГО ПРОЕКТА */
    const choosedProject = computed(
      () => store.getters['Projects/choosedProject'] === props.project
    )

    const chooseProject = () => {
      store.commit('Projects/chooseProject', props.project)
    }

    watch(choosedProject, () => {
      if (choosedProject) {
        cancelChanges()
        isEditing.value = false
      }
    })

    /* УДАЛЕНИЕ ПРОЕКТА */
    const deleteProject = async () => {
      emit('deleted')
    }

    /* ВНЕСЕНИЕ ИЗМЕНЕНИЙ */
    const isEditing = ref(false)
    const isLoading = ref(false)
    const isNew = ref(props.project.uuid == '')

    // Объект, который хранит изменения проекта перед отправкой в стор

    const cancelChanges = () => {
      isEditing.value = false
      if (isNew.value) {
        deleteProject()
      }
    }

    /* Отслеживание дедлайна */
    const currentDateTime = ref(new Date())
    const deadlineIsExpired = ref(
      props.project.deadline ? props.project.deadline < currentDateTime.value : false
    )
    const deadline = computed(() => props.project.deadline)

    onMounted(() => {
      if (props?.project?.group?.color) {
        projectContainer.value?.style.setProperty('--group-color', props?.project?.group?.color)
      }
    })

    return {
      projectContainer,
      chooseProject,
      choosedProject,
      isEditing,
      deleteProject,
      cancelChanges,
      deadlineIsExpired,
      isLoading,
    }
  },
})
</script>

<style lang="scss" scoped>
@use '@/components/scss/index.scss';

.default-input {
  text-align: center;
  transition: 0.3s;
  font: {
    family: 'Open Sans', sans-serif;
    weight: 400;
  }
  display: block;
  outline: none;

  &::placeholder {
    color: rgba(118, 137, 151, 0.712);
  }
}

.date-input {
  font-size: 12px;
  border: none;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &::-webkit-calendar-picker-indicator {
    padding: 0;
    margin: 0;
  }
}

.full-container {
  display: inline-block;
  --group-color: #efefef; // Цвет группы по умолчанию

  transition: 0.5s;

  .project-container {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: 7px 12px;
    transition: 0.3s;
    height: 172px;
    min-width: 200px;

    border-radius: 20px;
    font: {
      family: 'Open Sans', sans-serif;
      size: 1rem;
    }

    &:hover {
      transition: 0.3s;
      box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
      -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    }

    .header {
      display: flex;
      direction: row;
      flex-wrap: nowrap;

      .deadline {
        width: 100%;
        font-size: 0.9rem;
        height: fit-content;
        color: rgba(34, 60, 80, 0.6);

        &-container {
          display: flex;
          align-items: center;

          .deadline-flag {
            margin-left: 7px;
            height: 5px;
            width: 5px;
            background-color: rgb(240, 38, 23);
            border-radius: 50%;
            -webkit-box-shadow: 0px 0px 4px 2px rgb(240, 37, 23);
            -moz-box-shadow: 0px 0px 4px 2px rgb(240, 37, 23);
            box-shadow: 0px 0px 4px 2px rgb(240, 37, 23);
          }
        }
      }

      .tools {
        display: flex;
        justify-content: center;

        &-button {
          transition: 0.3s;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          border-radius: 3px;

          &:hover {
            transition: 0.3s;
            background-color: rgba(143, 150, 155, 0.39);
          }
        }
      }
    }

    .loading {
      height: 4px;
    }

    .project-labels {
      background-color: inherit;
      display: block;
      width: 100%;
      color: rgba(34, 60, 80, 1);

      .project-name {
        display: flex;
        justify-content: center;
        white-space: nowrap;
        width: 100%;
        margin-top: 10px;
        margin-bottom: 5px;
      }

      .project-group {
        height: 22px;
        background-color: inherit;
        display: flex;
        justify-content: center;
        width: 100%;
        font-size: 0.8rem;
        color: rgba(34, 60, 80, 0.6);
      }
    }

    .progress {
      display: block;
      margin-top: 20px;

      &-text {
        font-size: 12px;
        font-weight: bold;
      }

      &-percent {
        display: flex;
        justify-content: end;
        margin: 5px;
        font-size: 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
