<template>
    <div class="redactor-panel">
        <div class="panel-row panel-row__header">
            <div class="project__name">
                <input type="text" :value="project?.name" >
            </div>
            <div class="project__group">
                (-)
            </div>
        </div>
        <div class="panel-row panel-row__tasks">
            <div 
            class="task"
            v-for="task in showedTasks"
            :key="'task_id' + task.name"
            >
                <TaskCard 
                :task="task"
                @task:finished="finishTask(task)"
                @task:change="projectModified"
                ></TaskCard>
            </div>
        </div>
        
        <div class="footer__window" :class="{'opacity-full': isModified}">
            <v-btn rounded="pill" color="success" size="large">Сохранить</v-btn>
            <v-btn rounded="pill" color="error" size="large">Отменить</v-btn>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, PropType } from 'vue'
import * as ProjectManager from '@/classes'
import { useStore } from '@/store'

export default defineComponent ({
    name: 'RedactorPanel',

    props: {
        project: { type: Object as PropType<ProjectManager.Project>, required: true}
    },

    setup(props) {

        const store = useStore()

        const isModified = ref(false)

        const projectModified = () => {
            isModified.value = true
        }

        const finishTask = (task: ProjectManager.Task) => {
            store.dispatch('Projects/finishTask', {project: props.project, task: task})
        }

        const showedTasks = computed(() => {
            return props.project?.tasks.filter((t) => t.state != ProjectManager.TaskState.FINISHED)
        })
        
        return {

            isModified,
            projectModified,
            finishTask,
            showedTasks,
        }
        
    }
})
</script>


<style lang="scss" scoped>
.redactor-panel {
    position: relative;
    min-height: 92vh;
    max-height: 92vh;
    min-width: 380px;
    display: flex;
    height: 100%;
    padding: 20px;
    flex-direction: column;
    background-color: rgba($color: #fcfcfc, $alpha: 1.0);
    box-sizing: border-box;
    border-radius: 30px;
    font: {
        family: "MS Sans Serif";
    }

    .panel-row {
        display: block;
        width: 100%;
    }

    .panel-row__header {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        font-family: Tahoma, Geneva, sans-serif;
        font-size: 1.3em;
        font-weight: 600;
        padding: 0 0 20px 0;
        box-sizing: border-box;

        .project__name {
            flex-grow: 1;

            input {
                outline: none;
                font-family: Tahoma, Geneva, sans-serif;
                font-weight: 600;
                width: 100%;
                border: none;
                box-sizing: border-box;
                background-color: inherit;
            }
        }
    }

    .panel-row__tasks {
        overflow-y: auto;
    }

    .footer__window {
        transition: 0.5s;
        opacity: 0;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 75px;
        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        position: absolute;
        bottom: 0px;
        left: 0px;
        box-sizing: border-box;
        background-color: rgba($color: #b7b7b7, $alpha: 1);
        justify-content: space-around;
        align-content: center;

        .button {
            width: auto;
            height: 30px;
            border-radius: 5px;
            cursor: pointer;
            color: rgba($color: #e3e3e378, $alpha: 1.0);
        }

        .button__save {
            background-color: rgba($color: #5cc44a, $alpha: 1.0)
        }
        .button__cancel {
            background-color: rgba($color: #8f0707, $alpha: 1.0)
        }

    }

    .opacity-full {
        transition: 0.5s;
        opacity: 1;
    }

}
</style>
