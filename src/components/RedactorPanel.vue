<template>
    <div class="redactor-panel">
        <div class="panel-row panel-row__header">
            <div class="project__name">
                <input type="text" :value="project.name" >
            </div>
            <div class="project__group">
                (-)
            </div>
        </div>
        <div class="panel-row panel-row__tasks">
            <div class="tasks-container">
                <div 
                class="task"
                v-for="task in project.tasks"
                :key="'task_id' + task.name"
                >
                    <TaskCard :task="task"></TaskCard>
                </div>
            </div>
        </div>
        <div class="footer__window">
            <div class="button button__save">
                Сохранить 
            </div>
            <div class="button button__cancel">
                Отменить
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { TaskCard } from '@/components'
import { defineComponent, reactive, type PropType } from 'vue'
import * as ProjectManager from '@/classes'

export default defineComponent ({
    name: 'ProjectPanel',
    components: {
        TaskCard
    },
    props: {
        project: { type: Object as PropType<ProjectManager.Project>, required: true }
    },
    setup(props) {


        const testProject: ProjectManager.Project = 
            reactive(new ProjectManager.Project
                        ('TestProject', new ProjectManager.ProjectGroup('ProjectTestGroup', '#000000'), new Date(), new Date(), 'Описание проекта')
                    )
        
        testProject.addTask(new ProjectManager.Task('Погулять с собакой'))
        testProject.addTask(new ProjectManager.Task('Выпить пива'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        
        return {
            testProject
        }
        
    }
})
</script>


<style lang="scss" scoped>
.redactor-panel {
    position: relative;
    display: flex;
    height: 100%;
    padding: 20px;
    flex-direction: column;
    background-color: rgba($color: #eefbdf, $alpha: 1.0);
    box-sizing: border-box;
    border-radius: 30px;

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
                font-size: 1.2em;
                font-family: Tahoma, Geneva, sans-serif;
                font-weight: 600;
                width: 100%;
                border: none;
                box-sizing: border-box;
                background-color: inherit;
            }
        }
    }

    .footer__window {
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
        background-color: rgba($color: #8c8e89, $alpha: 1.0);
        justify-content: center;
        align-content: center;
        gap: 40%;

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

}
</style>
