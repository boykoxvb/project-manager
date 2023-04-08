<template>
    <div class="main-container">
        <div class="info">
            <div class="info-header">
                <div class="info-header-projects">
                    Projects
                </div>
                <div class="info-header-date">
                    <span>{{ new Date().getDate().toString() + ' ' + new Date().getMonth().toString()}}</span> 
                </div>
            </div>
            <div class="info-panel">
                <div class="state-filters">
                    <div class="info-panel__project-count border-black">
                        <span>45</span> 
                        <span class="project-state">In-progress</span>
                    </div>
                    <div class="info-panel__project-count border-black">
                        <span>16</span> 
                        <span class="project-state">Incoming</span>
                    </div>
                    <div class="info-panel__project-count">
                        <span>5</span> 
                        <span class="project-state">Completed</span>
                    </div>
                </div>  
                <div class="separator"></div>
                <v-dialog
                v-model="addProjectDialog"
                width="auto"
                >
                    <template v-slot:activator="{ props }">
                        <div class="add-project-group" v-bind="props" >
                            <v-icon icon="mdi-plus" color="grey"></v-icon>
                        </div>
                    </template>

                    <v-card>
                        <v-card-title>Добавление проекта</v-card-title>
                        <v-card-text>
                            <v-form @submit.prevent>
                                <v-text-field
                                    v-model="projects[0].name"
                                    label="Название проекта"
                                >
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="success" @click="addProjectDialog = false">Создать</v-btn>
                            <v-btn color="error" @click="addProjectDialog = false">Отменить</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <div class="project-group__container">
                    <group-item
                    v-for="group, index in groups"
                    :key="group.name + ' ' + index"
                    :group="group"
                    >
                    </group-item>
                </div>
                <!-- <v-icon icon="mdi-view-column-outline"></v-icon> -->
            </div>
        </div>
        <div class="projects">
            <div class="projects-grid"> 
                <v-dialog
                v-model="addProjectDialog"
                width="auto"
                >
                    <template v-slot:activator="{ props }">
                        <div class="add-project" v-bind="props" >
                            <v-icon icon="mdi-plus" size="x-large" color="grey"></v-icon>
                        </div>
                    </template>

                    <v-card>
                        <v-card-title>Добавление проекта</v-card-title>
                        <v-card-text>
                            <v-form @submit.prevent>
                                <v-text-field
                                    v-model="projects[0].name"
                                    label="Название проекта"
                                >
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="success" @click="addProjectDialog = false">Создать</v-btn>
                            <v-btn color="error" @click="addProjectDialog = false">Отменить</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <ProjectCardCompact
                v-for="project in projects"
                @project:choosed="$emit('project:choosed', project)"
                :key="project.uuid"
                :project="project"
                :choosed="project"
                ></ProjectCardCompact>       
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

import { useStore } from '@/store'

export default defineComponent ({
    name: 'ProjectPanel',

    setup() {

        const store = useStore()
        store.dispatch('Projects/fetchGroups')

        const addProjectDialog = ref(false)
        const projects = reactive(store.getters['Projects/allProjects'])
        const groups = reactive(store.getters['Projects/allGroups'])

        return {
            projects,
            addProjectDialog,
            groups,
        }
    }

})
</script>


<style lang="scss" scoped>

@use '@/components/scss/group-colors.scss';
@use '@/components/scss/choosed.scss';

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
}


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

        .state-filters {
            display: flex;

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

        .project-group__container {

            display: flex;

            .project-group__item {
                padding: 5px 20px;
                font-size: 0.6em;
                font-weight: 500;
                border-radius: 10px;
            }

        }



        

        .separator {
            width: 1px;
            height: 100%;
            background-color: #3b3b3b;
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
