<template>
  <div class="redactor-panel">
    <div class="panel-row panel-row__header">
      <div class="project__name">
        {{ project?.name }}
      </div>
      <v-icon @click="closeProject" class="close__btn" icon="mdi-close" />
    </div>
    <div class="panel-row panel-row__tasks">
      <div class="task" v-for="task in showedTasks" :key="'task_id' + task.name">
        <TaskCard
          :task="task"
          @task:finished="finishTask(task)"
          @task:change="taskModified(task, $event)"
        ></TaskCard>
      </div>

      <div @click="addTask" class="task-add__button">
        <v-icon icon="mdi-plus" size="x-large"></v-icon>
      </div>
    </div>

    <!-- <div class="footer__window" :class="{'opacity-full': isModified}">
            <v-btn rounded="pill" color="success" size="large">Сохранить</v-btn>
            <v-btn rounded="pill" color="error" size="large">Отменить</v-btn>
        </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from 'vue'
import * as ProjectManager from '@/classes'
import { useStore } from '@/store'

export default defineComponent({
  name: 'RedactorPanel',

  props: {
    project: {
      type: Object as PropType<ProjectManager.Project>,
      required: true,
    },
  },

  setup(props) {
    const store = useStore()
    const taskModifiedTimeout = ref()

    const taskModified = (task: ProjectManager.Task, name: string) => {
      clearTimeout(taskModifiedTimeout.value)
      taskModifiedTimeout.value = setTimeout(() => {
        store.dispatch('Projects/taskModified', { task: task, name: name })
      }, 2000)
    }

    const isEmptyTaskExists = computed(() => props.project.tasks.find((task) => task.name == ''))

    const addTask = () => {
      // if (isEmptyTaskExists.value) return
      store.dispatch('Projects/addTask', props.project)
    }

    const finishTask = (task: ProjectManager.Task) => {
      store.dispatch('Projects/finishTask', {
        project: props.project,
        task: task,
      })
    }

    const showedTasks = computed(() => {
      return props.project?.tasks.filter((t) => t.state != ProjectManager.TaskState.FINISHED)
    })

    const closeProject = () => {
      store.commit('Projects/closeProject')
    }

    return {
      addTask,
      taskModified,
      finishTask,
      showedTasks,
      closeProject,
      isEmptyTaskExists,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/components/scss/index.scss';

.redactor-panel {
  padding: 15px;
  position: relative;
  min-width: 320px;
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: rgba($color: #fcfcfc, $alpha: 1);
  box-sizing: border-box;
  border-radius: 30px;

  font: {
    family: 'Open Sans', sans-serif;
  }

  .panel-row {
    display: block;
    width: 100%;
  }

  .panel-row__header {
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-family: "Open Sans", sans-serif;
    font-size: 1.3em;
    font-weight: 600;
    box-sizing: border-box;

    .project__name {
      flex-grow: 1;
      display: flex;
    }

    .close__btn {
      cursor: pointer;
      border-radius: 50%;
      transition: 0.3s;
      &:hover {
        background-color: #b8c0c2;
      }
    }
  }

  .panel-row__tasks {
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto !important;
    @include scrollbar;

    .task-add__button {
      box-sizing: border-box;
      transition: 0.3s;
      width: 100%;
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background-color: #efefef;
      padding: 0 5px 0 10px;
      margin-bottom: 10px;
      border: rgba(34, 60, 80, 0) 2px solid;
      min-height: 3rem;

      &:hover:not(.opacity) {
        transition: 0.3s;
        // border: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        border: rgba(34, 60, 80, 0.2) 2px solid;
        // -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        // -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
      }
    }
  }
}
</style>
