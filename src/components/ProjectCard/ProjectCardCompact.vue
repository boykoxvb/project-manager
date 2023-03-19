<template>
    <div class="full-container" ref="projectContainer">
        <div 
        class="project-container" 
        :class="{[`color-${project?.group?.color}`]: true, 'choosed-project': choosedProject}"
        @click="chooseProject()"
        >
            <div class="deadline">
                {{ deadline }} 
            </div>
            <div class="project-labels">
                <div class="project-name">
                    {{ project.name }}
                </div>
                <div class="project-group">
                    {{ project?.group?.name }}
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

import { type PropType, onMounted, defineComponent, ref, computed } from 'vue'
import vbProgressBar from '@/components/atom-components/vb-progress-bar.vue'
import * as ProjectManager from '@/classes'
import { useStore } from '@/store'

export default defineComponent ({
    name: 'ProjectCardCompact',
    components: {
        vbProgressBar
    },
    props: {
        project: { type: Object as PropType<ProjectManager.Project>, required: true },
    },

    setup(props) {

        const store = useStore()

        const deadline = computed(() => {
            return  props.project.deadline ? `${props.project.deadline?.getDate()}.${props.project.deadline?.getMonth()}` : 'No Deadline'
        })

        const chooseProject = () => {
            store.commit('chooseProject', props.project)
            console.log(store.state.choosedProject)
        }

        const choosedProject = computed(() => {
           return store.state.choosedProject == props.project
        })
        
        const projectContainer = ref<HTMLElement | null>(null)

        onMounted(() => {
            if (props?.project?.group?.color) {
                projectContainer.value?.style.setProperty("--group-color", props?.project?.group?.color)
            }
        })

        return {
            deadline,
            projectContainer,
            chooseProject,
            choosedProject
        }
    }
    
})
</script>
  
<style lang="scss" scoped>

@use '@/components/scss/group-colors.scss';

@font-face {
	font-family: "Tilt Neon";
	src: url("https://assets.codepen.io/467/TiltNeon.woff2") format("woff2");
}

.choosed-project {
    -webkit-box-shadow: 0px 1px 10px 2px rgba(0, 144, 255, 0.5) !important;
    -moz-box-shadow: 0px 1px 10px 2px rgba(0, 144, 255, 0.5) !important;
    box-shadow: 0px 1px 10px 2px rgba(0, 144, 255, 0.5) !important; 
}

.full-container {
    display: inline-block;
    --group-color: #efefef; // Цвет группы по умолчанию

    .project-container {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        padding: 7px 12px;
        transition: 0.3s;
        // background-color: #f4ffd3;
        // #efefef - default (grey)
        // #eeffbb - Lime
        // #ffeebb - Orange
        // #bbffee - Ocean
        // #bbeeff - Sky
        // 
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

        .deadline {
            width: 100%;
            font-size: 0.9rem;
            font-family: 'Tilt Neon';
            height: fit-content;
            color: rgba(34, 60, 80, 0.6);
        }

        .project-labels {
            display: block;
            width: 100%;
            color: rgba(34, 60, 80, 1);

            .project-name {
                display: flex;
                justify-content: center;
                overflow: hidden;
                white-space: nowrap;
                width: 100%;
                margin-top: 15px;
            }

            .project-group {
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
                font-size: 10px;
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
  