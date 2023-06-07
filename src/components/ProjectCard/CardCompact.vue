<template>
    <div class="full-container" ref="projectContainer">
        <div 
        class="project-container" 
        :class="{[`color-${project?.group?.color}`]: true, 'shadow-blue': choosedProject }"
        @click="chooseProject()"
        >
            <div class="header">
                <div class="deadline">
                    <div v-if="!isEditing">
                        {{ project.dateString(project.deadline) }}
                    </div>
                </div>
                <div class="tools">

                    <div class="tools-button tools-edit" v-if="choosedProject">
                        <v-icon 
                        v-if="!isEditing"
                        @click.stop="isEditing = !isEditing"
                        icon="mdi-pencil-outline" 
                        size="small"></v-icon>
                    </div>
                    <div class="tools-button tools-delete" v-if="choosedProject">
                        <v-icon 
                        @click.stop="deleteProject()"
                        v-if="!isEditing"
                        icon="mdi-delete-outline" 
                        size="small"></v-icon>
                    </div>
                    <div class="tools-button tools-ok">
                        <v-icon 
                        v-if="isEditing"
                        @click.stop="isEditing = !isEditing"
                        icon="mdi-check-outline" 
                        size="small"></v-icon>
                    </div>
                    <div class="tools-button tools-close">
                        <v-icon 
                        v-if="isEditing"
                        @click.stop="isEditing = !isEditing"
                        icon="mdi-close-outline" 
                        size="small"></v-icon>
                    </div>
                    
                </div>
            </div>

            <div class="project-labels">
                <div class="project-name">
                    <input class="default-input" :class="{'editing': isEditing}" type="text" v-model="project.name" :readonly="!isEditing" placeholder="Название проекта">
                </div>
                <div class="project-group">
                    <vb-choosable-input
                    :disabled="!isEditing"
                    @select-changed="changeProjectGroup($event)"
                    :select="project?.group?.name"
                    :menu="groupNames">
                    </vb-choosable-input>
                </div>
            </div>
            <div class="progress">
                <div class="progress-text">Progress</div>
                <vb-progress-bar :progress="project.progress"></vb-progress-bar>
                <div class="progress-percent">
                    {{project.progress}}%
                </div>
            </div>
            <div class="other-data">

            </div>
        </div>
    </div>
</template>
  
<script lang="ts">

import { type PropType, onMounted, defineComponent, ref, computed, reactive, getCurrentInstance } from 'vue'
import { vbProgressBar, vbChoosableInput } from '@/components'
import * as ProjectManager from '@/classes'
import { useStore } from '@/store'

export default defineComponent ({
    name: 'CardCompact',
    components: {
        vbProgressBar,
        vbChoosableInput,
    },
    props: {
        project: { type: Object as PropType<ProjectManager.Project>, required: true },
    },

    setup(props) {

        const store = useStore()

        const groupNames = reactive(store.getters['Projects/allGroups'].map((group: ProjectManager.ProjectGroup) => group.name))
        const isEditing = ref(false)
        const choosedProject = computed(() => store.getters['Projects/choosedProject'] === props.project)


        const chooseProject = () => {
            store.commit('Projects/chooseProject', props.project)
        }
        
        const projectContainer = ref<HTMLElement | null>(null)

        const changeProjectGroup = (e: Event) => {
            store.dispatch('Projects/changeGroup', {project: props.project, groupName: e})
        }

        const deleteProject = () => {
            store.dispatch('Projects/delete', {project: props.project})
        }

        onMounted(() => {
            if (props?.project?.group?.color) {
                projectContainer.value?.style.setProperty("--group-color", props?.project?.group?.color)
            }
        })

        return {
            groupNames,
            projectContainer,
            chooseProject,
            choosedProject,
            isEditing,
            changeProjectGroup,
            deleteProject,
        }
    }
    
})
</script>
  
<style lang="scss" scoped>

// @use '@/components/scss/group-colors.scss';
// @use '@/components/scss/highlighting.scss';
@use '@/components/scss/index.scss';

.default-input {
    text-align: center;
    transition: 0.3s;
    font: {
            family: "MS Sans Serif";
        }
    display: block;
    outline: none;
    
    &.editing:hover:not(:focus) {

        background-color:transparent;
        transition: 0.3s;
        box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        
    }

    &::placeholder {
        color: rgba(118, 137, 151, 0.712)
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

        min-width: 200px;

        border-radius: 10%;
        font: {
            family: "MS Sans Serif";
            size: 1rem;
        }

        &:hover {
            transition: 0.3s;
            box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
            -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
            -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        }

        .header {
            display:flex;
            direction: row;
            flex-wrap: nowrap;

            .deadline {
                width: 100%;
                font-size: 0.9rem;
                height: fit-content;
                color: rgba(34, 60, 80, 0.6);
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
                }
                
                &-delete {
                    
                    &:hover {
                        transition: 0.3s;
                        background-color: rgba(143, 150, 155, 0.39);
                    }
                }

                &-edit {

                    &:hover {
                        transition: 0.3s;
                        background-color: rgba(143, 150, 155, 0.39);
                    }
                }
            }
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
                margin-top: 15px;
                margin-bottom: 5px;
            }

            .project-group {
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
  