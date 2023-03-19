<template>
    <div 
    class="container"
    :class="{[`color-${group.color}`]: hovered}"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    >
        <div 
        class="group-color"
        :class="{[`color-${group.color}`]: true}"
        v-if="!hovered"
        ></div>
        <div 
        class="group-name"
        v-if="hovered"
        >
            {{ group.name }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue'
import * as ProjectManager from '@/classes'

export default defineComponent({
    props: {
        group: { type: Object as PropType<ProjectManager.ProjectGroup>, required: true }
    },
    setup(props) {
        const hovered = ref(false);

        return {
            hovered
        }
    },
})
</script>

<style lang="scss" scoped>

@use '@/components/scss/group-colors.scss';

.container {
    transition: 0.5s;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    border-radius: 10px;
    padding: 5px 10px;

    .group-color {
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }

}


</style>

