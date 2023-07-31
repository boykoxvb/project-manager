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
            :value="projectBuffer.deadline?.toISOString().slice(0, 10)"
            @input="projectChanged({ deadline: $event })"
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
          <div class="tools-button tools-ok">
            <v-icon
              v-if="isEditing && hasChanges"
              @click.stop="saveChanges()"
              icon="mdi-check-outline"
              size="small"
            ></v-icon>
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
            @input="projectChanged({ name: $event })"
            :value="projectBuffer.name"
            :readonly="!isEditing"
            placeholder="Название проекта"
          />
        </div>
        <div class="project-group">
          <span v-if="!isEditing">{{ project.group?.name ?? 'Группа проекта' }}</span>
          <vb-choosable-input
            v-if="isEditing"
            :disabled="!isEditing"
            @select-changed="projectChanged({ group: $event })"
            :select="project?.group?.name"
            :menu="groups"
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
  name: 'CardCompact',
  components: {
    vbProgressBar,
    vbChoosableInput,
    vbIconTimer,
  },
  props: {
    project: { type: Object as PropType<Project>, required: true },
  },

  setup(props) {
    const store = useStore()

    const projectContainer = ref<HTMLElement | null>(null)
    const groups = computed(() =>
      store.getters['Projects/allGroups'].map((group: ProjectGroup) => {
        return { name: group.name, color: group.color, key: group.uuid }
      })
    )

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
      await store.dispatch('Projects/delete', { project: props.project })
    }

    /* ВНЕСЕНИЕ ИЗМЕНЕНИЙ */
    const isEditing = ref(false)
    const isLoading = ref(false)
    const isNew = ref(props.project.uuid == '')

    const hasChanges = computed(() => {
      return Boolean(
        (isNew.value && projectBuffer.name && projectBuffer.group?.uuid) ||
          (!isNew.value &&
            ((projectBuffer.name && projectBuffer.name != props.project.name) ||
              (projectBuffer.group?.uuid &&
                projectBuffer.group?.uuid != props.project.group?.uuid) ||
              (projectBuffer.deadline && projectBuffer.deadline != props.project.deadline)))
      )
    })

    if (isNew.value) {
      isEditing.value = true
    }

    // Объект, который хранит изменения проекта перед отправкой в стор
    const projectBuffer = reactive(
      new Project(props.project.uuid, props.project.name, props.project.deadline)
    )
    projectBuffer.setGroup(props.project.group)

    // Сохраняем какое-либо измененное поле в буфер
    const projectChanged = ({ deadline, name, group }: IProjectChangeset) => {
      try {
        const deadlineValue =
          typeof deadline == 'string' ? deadline : (deadline?.target as HTMLInputElement).value
        if (deadlineValue == '') {
          projectBuffer.deadline = new Date(0)
        } else {
          deadlineValue != null ? (projectBuffer.deadline = new Date(deadlineValue.toString())) : ''
        }

        const nameValue = typeof name == 'string' ? name : (name?.target as HTMLInputElement).value
        if (nameValue) {
          projectBuffer.name = nameValue
        }

        if (group) {
          projectBuffer.setGroup(groups.value.find((gr: ProjectGroup) => (gr.uuid = group.key)))
        }
      } catch (e) {
        console.error(`Не удалось сохранить изменения проекта в буфер обмена: ${e}`)
      }
    }

    // Если юзер нажал сохранить - отправляем в стор
    const saveChanges = async () => {
      isLoading.value = true

      await store.dispatch('Projects/projectChanged', {
        project: props.project,
        changes: projectBuffer,
      })
      isLoading.value = false
      isEditing.value = false
      clearProjectBuffer()
    }

    const cancelChanges = () => {
      isEditing.value = false
      if (isNew.value) {
        deleteProject()
      }
      clearProjectBuffer()
    }

    const clearProjectBuffer = () => {
      projectBuffer.uuid = props.project.uuid ?? ''
      projectBuffer.name = props.project.name
      projectBuffer.deadline = props.project.deadline
      projectBuffer.setGroup(props.project.group)
    }

    /* Отслеживание дедлайна */
    const currentDateTime = ref(new Date())
    const deadlineIsExpired = ref(
      props.project.deadline ? props.project.deadline < currentDateTime.value : false
    )
    const deadline = computed(() => props.project.deadline)

    setInterval(() => {
      currentDateTime.value = new Date()
      if (!props.project.deadline) return
      if (currentDateTime.value > props.project.deadline) {
        deadlineIsExpired.value = true
      }
    }, 120000)

    watch(deadline, () => {
      deadlineIsExpired.value = deadline.value ? deadline.value < currentDateTime.value : false
    })

    onMounted(() => {
      if (props?.project?.group?.color) {
        projectContainer.value?.style.setProperty('--group-color', props?.project?.group?.color)
      }
    })

    return {
      groups,
      projectContainer,
      chooseProject,
      choosedProject,
      isEditing,
      deleteProject,
      projectChanged,
      saveChanges,
      cancelChanges,
      deadlineIsExpired,
      isLoading,
      hasChanges,
      projectBuffer,
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
    family: 'MS Sans Serif';
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

  &:hover {
    transition: 0.3s;
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  }

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
      family: 'MS Sans Serif';
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
