<template>
    <div class="task">
        <div class="task__name">
            <input class="task__input" type="text">
        </div>
        <div class="task__check">
            <input class="task__checkbox" type="checkbox" name="taskcheckbox">
        </div>
        <div class="task__deadline">
            <input class="task__checkbox" type="checkbox" name="taskcheckbox">
        </div>
    </div>
</template>

<script lang="ts">

import { type PropType, defineComponent } from 'vue'
import * as ProjectManager from '@/classes'

export default defineComponent ({
    name: 'TaskCard',
    props: {
        task: Object as PropType<ProjectManager.Task>
    },
})
</script>


<style lang="scss" scoped>
.task {
    width: 100%;
    background-color: beige;
    display: flex;

    &__name {
        flex-grow: 1;
        background-color: antiquewhite;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 15px;
        
        .task__input {
            color: rgba(#000000, 0.7);
            font-family: Tahoma, Geneva, sans-serif;
            outline: none;
            background-color: inherit;
            border-width: 0;
            border-bottom: 2px solid rgba(#000000, 0.5);
            
            width: 100%;
        }

        .task__check {
            height: 100%;

            .task__checkbox{
                height: 100%;
                margin: auto;
            }
        }
    }



}


</style>
