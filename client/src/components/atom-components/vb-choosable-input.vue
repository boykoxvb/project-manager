<template>
    <div :class="{'full-container': !disabled}" ref="projectContainer" @click="openCloseMenu">
        <v-icon icon="mdi-menu-down" :class="{'transparent': disabled}"></v-icon>
        <input class="default-input" :value="selected" type="text" placeholder="Группа проекта" readonly="true">
        <v-icon icon="mdi-menu-down" :class="{'transparent': disabled}"></v-icon>

        <div v-if="!disabled" class="menu" :class="{'menu-shown' : isMenuShown}">
            <div class="menu-element"
            v-for="el in menu"
            :key="el"
            @click="choice(el)"
            >
                {{ el }}
            </div>
        </div>

    </div>
</template>
  
<script lang="ts">

import { type PropType, defineComponent, ref, onUnmounted, watch } from 'vue'

export default defineComponent ({
    name: 'vbChoosableInput',
    props: {
        select: { type: String, required: false },
        menu: { type: Object as PropType<Array<string>>, required: true },
        disabled: { type: Boolean, required: false}
    },

    setup(props, {emit}) {

        const selected = ref(props.select)
        const isMenuShown = ref(false)

        const openCloseMenu = () => {
            isMenuShown.value = !isMenuShown.value;
        }

        const choice = (menuElement: string) => {
            selected.value = menuElement
            emit('select-changed', selected.value)
        }

        watch(props, () => {
            isMenuShown.value = false
            selected.value = props.select
        })

        onUnmounted(() => {
            isMenuShown.value = false
        })

        return {
            openCloseMenu,
            isMenuShown,
            selected,
            choice,
        }
    }
    
})
</script>
  
<style lang="scss" scoped>

.default-input {

    cursor: pointer;
    text-align: center;
    transition: 0.3s;
    font: {
            family: "MS Sans Serif";
        }
    display: inline-block;
    outline: none;

}

.transparent {
    color: transparent;
}

.full-container {
    display: inline-block;
    transition: 0.3s;
    position: relative;
    background-color: inherit;
    cursor: pointer;

    &:hover {
        transition: 0.3s;
        -webkit-box-shadow: 0px 0px 7px 3px rgba(34, 60, 80, 0.24);
        -moz-box-shadow: 0px 0px 7px 3px rgba(34, 60, 80, 0.24);
        box-shadow: 0px 0px 7px 3px rgba(34, 60, 80, 0.24);
    }

    .menu {
        transition: 0.3s;
        max-height: 75px;
        display: none;
        z-index: 3;
    }

    .menu-shown {
        transition: 0.3s;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        background-color: inherit;
        position:absolute; 
        width: 100%; 
        left:0; 
        z-index:2;

        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        &::-webkit-scrollbar { width: 0; }
        
        // &:hover {
        //     -webkit-box-shadow: 0px 7px 7px 3px rgba(34, 60, 80, 0.24);
        //     -moz-box-shadow: 0px 7px 7px 3px rgba(34, 60, 80, 0.24);
        //     box-shadow: 0px 7px 7px 3px rgba(34, 60, 80, 0.24);
        // }
    }

    .menu-element {
        margin: 3px;
        box-sizing: border-box;
        background-color: inherit;
        cursor: pointer;
        font: {
            size: 0.8em;
        }
        color: rgba(58, 58, 58, 0.856);
        &:hover {
            color: rgba($color: #3e8fbe, $alpha: 1.0)
        }
    }

}



  
</style>
  