<template>
    <div class="task" :class="{'opacity': checked}">
        <div class="task__name">
            <input class="task__label" type="text" :value="task?.name" @input="onLabelChange($event)" placeholder="Новая задача">
        </div>
        <div class="task__check">
            <v-checkbox
            @change="onCheck($event)"
            default="off"
            color="success"
            density="comfortable"
            :ripple="false"
            hide-details
            ></v-checkbox>
        </div>
    </div>
</template>

<script lang="ts">

import { type PropType, defineComponent, ref } from 'vue'
import * as ProjectManager from '@/classes'

export default defineComponent ({
    name: 'TaskCard',
    props: {
        task: Object as PropType<ProjectManager.Task>
    },
    emits: ['task:finished', 'task:change'],
    setup(props, {emit}) {

        const checked = ref(props.task?.state === ProjectManager.TaskState.FINISHED)
        const lastTimeout = ref()

        const onCheck = (e: Event): void => {
            checked.value = !checked.value

            clearTimeout(lastTimeout.value)
            lastTimeout.value = setTimeout(() => {
                if (checked.value) {
                    emit('task:finished')
                }
            }, 2000)

        }

        const onLabelChange = (e: any): void => {
            emit('task:change', e.target.value)
        }

        return {
            onCheck,
            checked,
            onLabelChange
        }
    }
})
</script>


<style lang="scss" scoped>

.opacity {
    transition: 3s;
    opacity: 0.2;
}

.task {
    
    box-sizing: border-box;
    transition: 0.3s;
    width: 100%;
    display: flex;
    justify-items: center;
    align-items: center;
    border-radius: 10px;
    background-color: #efefef;
    padding: 0 5px 0 10px;
    margin-bottom: 10px;
    border: rgba(34, 60, 80, 0) 2px solid;


    &:hover:not(.opacity) {
        transition: 0.3s;
        // border: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        border: rgba(34, 60, 80, 0.2) 2px solid;
        // -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
        // -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    }


    // border-bottom: 2px solid rgba(#000000, 0.5);
    // opacity: 30%; Этим свойством будет задаваться выцветание

    &__name {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        
        .task__label {
            color: rgba(#000000, 0.7);
            font-family: Tahoma, Geneva, sans-serif;
            font-size: 1.2em;
            outline: none;
            background-color: inherit;
            border-width: 0;
            // border-bottom: 2px solid rgba(#000000, 0.5);
            cursor: pointer;
            width: 100%;

        }


    }

    .task__check {

        display: flex;
        justify-content: center;
        align-content: center;
        height: 100%;

        .task__checkbox{
            margin: 5px 10px;
            width: 24px;
            height: 24px;
            outline: #3a3d90;
        }
    }



}


</style>
