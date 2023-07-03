<template>
    <div class="full-container" ref="projectContainer">
        <div 
        class="project-container" 
        :class="{[`color-${groupcolor}`]: true}"
        >
            <div class="deadline">
                {{ ddate }}.{{ dmonth }}
            </div>
            <div class="project-labels">
                <div class="project-name">
                    {{ name }}
                </div>
                <div class="project-group">
                    {{ groupname }}
                </div>
            </div>
            <div class="progress">
                <div class="progress-text">Progress</div>
                <vb-progress-bar :progress="progress"></vb-progress-bar>
                <div class="progress-percent">
                    {{ progress }}%
                </div>
            </div>
            <div class="other-data">

            </div>
        </div>
    </div>
</template>
  
<script lang="ts">

import { type PropType, onMounted, defineComponent, toRefs, computed } from 'vue'
import vbProgressBar from '@/components/atom-components/vb-progress-bar.vue'
import TestProject from '@/components/TestCard/TestProject'
import { useStore } from '@/store'

export default defineComponent ({
    name: 'TestProjectCardCompact',
    components: {
        vbProgressBar
    },
    props: {
        project: { type: Object as PropType<TestProject>, required: true },
    },

    setup(props) {

        const { name, groupname, groupcolor, deadline } = toRefs(props.project)

        const ddate: string  = deadline.value.getDate() < 10 ? '0' + deadline.value?.getDate().toString() : deadline.value?.getDate().toString()
        const dmonth: string  = deadline.value.getMonth() < 10 ? '0' + deadline.value?.getMonth().toString() : deadline.value?.getMonth().toString()

        const progress = Math.floor(Math.random() * 100)



        return {

            name,
            groupname,
            groupcolor,
            ddate,
            dmonth,
            progress,

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
  