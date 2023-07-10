<template>
    <div class="main-container">
        <div class="info">
            <div class="info-header">
                <div class="info-header-projects">
                    Проекты 
                    <vb-transition name="fade">
                        <span class="group" v-if="choosedGroup?.name">
                            {{ ' / ' + choosedGroup.name }}
                        </span>
                    </vb-transition>
                </div>
                <div class="sorting">
                    <div class="sorting-deadline" :class="{'border-black': sortState.deadline != null, 'border-white': sortState.deadline == null}">
                        <v-icon 
                        v-if="sortState.deadline === true || sortState.deadline === null"
                        @click="setSortState('deadline', sortState.deadline === null ? true : false)"
                        icon="mdi-sort-calendar-ascending" 
                        ></v-icon>
                        <v-icon 
                        v-if="sortState.deadline === false"
                        @click="setSortState('deadline', sortState.deadline === false ? null : false)"
                        icon="mdi-sort-calendar-descending" 
                        ></v-icon>
                    </div>

                    <div class="sorting-name" :class="{'border-black': sortState.name != null, 'border-white': sortState.name == null}">
                        <v-icon 
                        v-if="sortState.name === true || sortState.name === null"
                        @click="setSortState('name', sortState.name === null ? true : false)"
                        icon="mdi-sort-alphabetical-ascending" 
                        ></v-icon>
                        <v-icon 
                        v-if="sortState.name === false"
                        @click="setSortState('name', sortState.name === false ? null : false)"
                        icon="mdi-sort-alphabetical-descending" 
                        ></v-icon>
                    </div>
                </div>
                <!-- <div class="info-header-date">
                    <span>{{ new Date().getDate().toString() + ' ' + new Date().getMonth().toString()}}</span> 
                </div> -->
            </div>

            <div class="project__groups">
                <project-groups/>
            </div>

            <div class="info-panel">
                <!-- <div class="state-filters">
                    <div
                    class="info-panel__project-count border-black" :class="{}">
                        <span>{{ projectsInProgressNumber }}</span> 
                        <span class="project-state">В процессе</span>
                    </div>
                    <div class="info-panel__project-count border-black">
                        <span>16</span> 
                        <span class="project-state">Incoming</span>
                    </div>
                    <div class="info-panel__project-count">
                        <span> {{ projectsFinishedNumber }}</span> 
                        <span class="project-state">Готовые</span>
                    </div>
                </div>   -->
                
            </div>
        </div>


        <div class="projects">
            <div class="projects-grid"> 

                <CardCompact
                v-for="project in projects"
                @project:choosed="$emit('project:choosed', project)"
                :key="project.uuid"
                :project="project"
                :choosed="project"
                ></CardCompact>   

                <div class="add-project" @click="addNewProject()">
                    <v-icon icon="mdi-plus" size="x-large" color="grey"></v-icon>
                </div>    

            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { filterState } from '@/classes'
import { vbTransition } from '@/components'
import * as PM from '@/classes'

export default defineComponent ({
    name: 'ProjectPanel',
    components: {
        vbTransition
    },

    setup() {

        const store = useStore()
        store.dispatch('Projects/fetchGroups')


        const addProjectDialog = ref(false)
        const choosedGroup = computed(() => store.getters['Projects/filterState'].groupFilter)

        const groups = computed(() => store.getters['Projects/allGroups'])
        const projects = computed(() => store.getters['Projects/filteredProjects'])
        const sortState = computed(() => store.getters['Projects/sortState'])

        const projectsInProgressNumber = computed(() => store.getters['Projects/allProjects'].filter((project: PM.Project) => project.state === PM.ProjectState.STARTED).length)
        const projectsFinishedNumber = computed(() => store.getters['Projects/allProjects'].filter((project: PM.Project) => project.state === PM.ProjectState.FINISHED).length)


        const setSortState = (sort: string, asc: boolean | null) => {
            store.commit('Projects/setSortState', {sort, asc})
        }

        const addNewProject = async () => {
            if (choosedGroup.value) {
                await store.dispatch('Projects/addNew', choosedGroup.value)
            }
            store.dispatch('Projects/addNew')
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

            projectsInProgressNumber,
            projectsFinishedNumber,
        }
    }

})
</script>


<style lang="scss" scoped>

@use '@/components/scss/group-colors.scss';
@use '@/components/scss/highlighting.scss';

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
  // Если есть проблемы с прокруткой проектов - нужно ограничить высоту контейнера, куда кладем этот компонент.
  font-size: 24px;
  background-color: rgba($color: #fcfcfc, $alpha: 1.0);
  border-radius: 30px;
  min-height: 92vh;
  max-height: 92vh;
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
            font-size: 1.3em;
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
