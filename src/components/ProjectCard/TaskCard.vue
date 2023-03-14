<template>
    <div class="task" :class="{'opacity': checked}">
        <div class="task__name">
            <input class="task__label" type="text" :value="task?.name" @input="onLabelChange($event)" placeholder="Новая задача">
        </div>
        <div class="task__check">
            <input class="task__checkbox" type="checkbox" name="taskcheckbox" @change="onCheck($event)">
        </div>
        <!-- <div class="task__deadline">
            <input class="task__checkbox" type="checkbox" name="taskcheckbox">
        </div> -->
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

        const onCheck = (e: Event): void => {
            checked.value = !checked.value

            if (checked) {
                setTimeout(() => {
                    emit('task:finished')
                }, 3000)
            }
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
    width: 100%;
    display: flex;
    justify-items: center;
    align-items: center;
    flex-wrap: wrap;
    min-width: 265px;
    border-bottom: 2px solid rgba(#000000, 0.5);
    // opacity: 30%; Этим свойством будет задаваться выцветание

    &__name {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 10px;
        
        .task__label {
            color: rgba(#000000, 0.7);
            font-family: Tahoma, Geneva, sans-serif;
            font-size: 1em;
            outline: none;
            background-color: inherit;
            border-width: 0;
            // border-bottom: 2px solid rgba(#000000, 0.5);
            cursor: pointer;
            width: 100%;

            &:hover, &:focus {
                color: #3a3d90;
                border-color: #3a3d90;
            }
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
