<template>

    <div 
    class="project-group__addedit"
    :class="{[`color-${changes?.color}`]: true}"
    >
        <div class="group__name">

            <div class="group__color">
                <v-icon 
                icon="mdi-palette" 
                size="small">
                </v-icon>

                <v-menu activator="parent">
                    <v-list>
                        <v-list-item
                            v-for="color, index in availableGroupColors"
                            :key="index"
                            :value="index"
                            @click="changes.color = color"
                        >
                            <v-list-item-title
                            style="display: flex;">
                                <div class="color-name">
                                    {{ color }}
                                </div>
                                <div class="color-picker"
                                :class="{[`color-${color}`]: true }"
                                style="height: 20px; width: 20px; border-radius: 50%; margin-left: 10px;"
                                >
                                </div>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </div>

            <input class="group__name__input" type="text" :value="changes.name" @input="changeName" placeholder="Название группы">

        </div>

        <div class="tools">
            <div class="tools-button tools-ok">
                <v-icon 
                @click.stop="addEditGroup"
                v-if="hasChanges"
                icon="mdi-check-outline" 
                size="small"></v-icon>
            </div>
            <div class="tools-button tools-close">
                <v-icon 
                @click.stop="cancelChanges"
                icon="mdi-close-outline" 
                size="small"></v-icon>
            </div>
        </div>
        
    </div>

</template>

<script lang="ts">
import { defineComponent, computed, reactive, PropType } from 'vue'
import { useStore } from '@/store'
import * as PM from '@/classes'

export default defineComponent ({
    name: 'ProjectGroups',
    props: {
        group: { type: Object as PropType<PM.ProjectGroup | null>, required: true },
        isNew: { type: Boolean, required: false }
    },

    setup(props, {emit}) {

        const store = useStore()
        // store.dispatch('Projects/fetchGroups')

        const availableGroupColors = computed(() => store.getters['Projects/availableGroupColors'])
        const changes = reactive({
            color: props?.group?.color,
            name: props?.group?.name,
        })

        const hasChanges = computed((): boolean => {
            return !!(changes.color != props?.group?.color || changes.name != props?.group?.name)
        })

        const cancelChanges = () => {
            emit('cancelChange')
        }

        const changeName = (event: any) => {
            changes.name = event.target.value
        }

        const addEditGroup = () => {
            emit('groupChange', changes)
        }

        

        return {
            store,
            changes,
            availableGroupColors,
            hasChanges,
            changeName,
            addEditGroup,
            cancelChanges,
        }
    }

})
</script>


<style lang="scss" scoped>

@use '@/components/scss/group-colors.scss';
@use '@/components/scss/highlighting.scss';


.project-group__addedit {
    display: flex;
    flex-wrap: nowrap;
    height: 40px;
    width: 100%;
    border-radius: 10px;

    .group__name {

        display: flex;
        flex-grow: 1;

        .group__color {
            margin-left: 5px;
            cursor: pointer;
        }

        &__input {
            margin-left: 5px;
            color: rgba(#000000, 0.7);
            font-family: Tahoma, Geneva, sans-serif;
            font-size: 0.8em;
            outline: none;
            background-color: inherit;
            border-width: 0;
            // border-bottom: 2px solid rgba(#000000, 0.5);
            width: 100%;

        }
    }

    .tools {
        display: flex;
        justify-self: end;
        margin: 0 10px;

        &-color {
            margin-left: 10px;
            cursor: pointer;
        }
    }
}

</style>
