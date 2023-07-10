<template>
    <div 
    class="container"
    :class="{[`color-${group.color}`]: choosed, 'shadow-blue-mini': choosed}"
    @click="chooseGroup"
    >
        <div 
        class="group-color"
        :class="{[`color-${group.color}`]: true}"
        v-if="!choosed"
        >
        </div>
        <div 
        class="group-name"
        v-if="choosed"
        >
            <div class="group__expanded">
                {{ group.name }}
                <div class="tools">
                    <div class="tools-button tools-edit">
                        <v-icon 
                        @click.stop="editGroup()"
                        icon="mdi-pencil-outline" 
                        size="small"></v-icon>
                    </div>
                    <div class="tools-button tools-delete">
                        <v-icon 
                        v-if="!isDeleting"
                        @click.stop="deleteGroup()"
                        icon="mdi-delete-outline" 
                        size="small"></v-icon>
                        <v-icon 
                        v-if="isDeleting"
                        @click.stop="deleteGroup()"
                        icon="mdi-cancel" 
                        size="small"></v-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue'
import * as ProjectManager from '@/classes'

export default defineComponent({
    props: {
        group: { type: Object as PropType<ProjectManager.ProjectGroup>, required: true },
        choosed: { type: Boolean, required: false},
    },
    setup(props, {emit}) {
        const hovered = ref(false);

        const isDeleting = ref(false);
        const deleteTimeout = ref()

        const chooseGroup = () => {
            emit('choosed')
        }

        const editGroup = () => {
            emit('edit')
        }

        const deleteGroup = () => {
            isDeleting.value = !isDeleting.value
            clearTimeout(deleteTimeout.value)
            deleteTimeout.value = setTimeout(() => {
                emit('delete')
            }, 3000)
        }

        return {
            hovered,
            editGroup,
            deleteGroup,
            chooseGroup,
            isDeleting,
        }
    },
})
</script>

<style lang="scss" scoped>

@use '@/components/scss/group-colors.scss';
@use '@/components/scss/highlighting.scss';

.shadow-blue-mini {
    transition: 0.3s;
    -webkit-box-shadow: 0px 1px 7px 2px rgba(0, 144, 255, 0.5);
    -moz-box-shadow: 0px 1px 7px 2px rgba(0, 144, 255, 0.5);
    box-shadow: 0px 1px 7px 2px rgba(0, 144, 255, 0.5); 
}

.container {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border-radius: 10px;
    padding: 5px;
    margin: 5px;

    .group-color {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        transition: 0.3s;

        &:hover {
            transition: 0.3s;
            -webkit-box-shadow: 0px 1px 7px 2px rgba(34, 60, 80, 0.2);
            -moz-box-shadow: 0px 1px 7px 2px rgba(34, 60, 80, 0.2);
            box-shadow: 0px 1px 7px 2px rgba(34, 60, 80, 0.2); 
        }

        
    }

    .group__expanded {
        display: flex;
        padding: 0 5px;
        white-space: nowrap;

        .tools {
            display: flex;
            justify-content: center;
            margin-left: 5px;

            &-button {
                transition: 0.3s;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                border-radius: 3px;

                &:hover {
                    transition: 0.3s;
                    background-color: rgba(143, 150, 155, 0.39);
                }
            }
        }

    }

}


</style>

