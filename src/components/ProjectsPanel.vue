<template>
    <div class="main-container">
        <div class="info">
            <div class="info-header">
                <div class="info-header-projects">
                    Projects
                </div>
                <div class="info-header-date">
                    <span>21 October</span> 
                </div>
            </div>
            <div class="info-panel">
                <div class="info-panel__project-count">
                    <span>45</span> 
                    <span class="project-state">In-progress</span>
                </div>
                <div class="info-panel__project-count">
                    <span>16</span> 
                    <span class="project-state">Incoming</span>
                </div>
                <div class="info-panel__project-count">
                    <span>5</span> 
                    <span class="project-state">Completed</span>
                </div>
            </div>
        </div>
        <div class="projects">
                <div class="projects-grid"> 
                    <ProjectCardCompact :project="testProject"></ProjectCardCompact>
                    <ProjectCardCompact :project="testProject"></ProjectCardCompact>
                    <ProjectCardCompact :project="testProject"></ProjectCardCompact>
                </div>
        </div>
    </div>
</template>

<script lang="ts">
import ProjectCardCompact from '@/components/ProjectCard/ProjectCardCompact.vue'
import { defineComponent, reactive } from 'vue'
import * as ProjectManager from '@/classes'

export default defineComponent ({
    name: 'ProjectPanel',
    components: {
        ProjectCardCompact
    },

    setup() {
        const testProject: ProjectManager.Project = 
        reactive(new ProjectManager.Project
                    ('TestProject', new ProjectManager.ProjectGroup('ProjectTestGroup', '#000000'), new Date(), new Date(), 'Описание проекта')
                )

        testProject.addTask(new ProjectManager.Task('Погулять с собакой'))
        testProject.addTask(new ProjectManager.Task('Выпить пива'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))
        testProject.addTask(new ProjectManager.Task('Протереть стол'))

        return {
            testProject
        }
    }

})
</script>


<style lang="scss" scoped>

.main-container {
  // Если есть проблемы с прокруткой проектов - нужно ограничить высоту контейнера, куда кладем этот компонент.
  font-size: 24px;
  background-color: rgba($color: #fcfcfc, $alpha: 1.0);
  border-radius: 30px;
  min-height: 88vh;
  max-height: 88vh;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font: {
        family: "MS Sans Serif";
        weight: 600;
    }

  .info {
    flex-grow: 0;
    padding: 0 10px 10px;
    width: 100%;
    box-sizing: border-box;

    &-header {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        margin-bottom: 15px;

        &-projects {
            display: block;
            font-size: 1.3em;
        }

        &-date {
            display: block;
            font-size: 1.2em;
            margin: auto 0px;
        }
    }

    &-panel {
        display: flex;

        &__project-count {
            transition: 0.3s;
            padding: 5px;
            margin-right: 10px;
            font-size: 1em;
            display: flex;
            flex-direction: column;
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

  }

    .projects {
        display: block;
        flex-grow: 1;
        max-width: 100%;
        overflow: auto;

        &-grid {
                padding: 10px;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                gap: 15px;
                justify-content: center;
                grid-auto-flow: row;
        }


    }

}

</style>
