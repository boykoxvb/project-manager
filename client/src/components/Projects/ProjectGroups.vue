<template>

    <div class="project-group__container">
        <div 
        v-if="!editingGroup"
        class="group-items">

          <group-item
          class="group-item"
          v-for="group, index in groups"
          :key="group.name + ' ' + index"
          :group="group"
          :choosed="choosedGroup == group"
          @choosed="chooseGroup(group)"
          @edit="openEditGroup(group)"
          />
          <div 
          class="group-item group-add"
          @click="openAddGroup"
          >
            <v-icon icon="mdi-plus" size="xs"/>
          </div>

        </div>
        <project-group-add-edit
        v-else
        :group="editingGroup"
        @cancelChange="cancelChanges"
        @groupChange="addEditGroup"
        />
        
    </div>

</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from 'vue'
import { useStore } from '@/store'
import * as PM from '@/classes'
import ProjectGroupAddEdit from './ProjectGroupAddEdit.vue'

export default defineComponent ({
    name: 'ProjectGroups',
    components: {
        ProjectGroupAddEdit
    },

    setup() {

 
        const store = useStore()

        const availableGroupColors = computed(() => store.getters['Projects/availableGroupColors'])
        const addProjectDialog = ref(false)

        const groups = computed(() => store.getters['Projects/allGroups'])
        const choosedGroup: Ref<PM.ProjectGroup | null> = ref(null)
        const editingGroup: Ref<PM.ProjectGroup | null> = ref(null)

        const chooseGroup = (group: PM.ProjectGroup) => {
            if (choosedGroup.value != group) {
              choosedGroup.value = group
              store.commit('Projects/setFilterState', {group: group})
            } else  {
              choosedGroup.value = null
              store.commit('Projects/unsetGroupFilter')
            }
        }

        const openEditGroup = (group: PM.ProjectGroup) => {
            editingGroup.value = group
        }

        const cancelChanges = () => {
            editingGroup.value = null
        }

        const openAddGroup = () => {
          editingGroup.value = new PM.ProjectGroup('', '', 'default')
        }

        const addEditGroup = (payload: any) => {
            if (payload.uuid) {
              store.dispatch('Projects/editGroup', {group: editingGroup.value, name: payload.name, color: payload.color})
            } else {
              store.dispatch('Projects/addGroup', {name: payload.name, color: payload.color})
            }
            editingGroup.value = null
        }

        

        return {
            store,
            groups,
            addProjectDialog,
            choosedGroup,
            chooseGroup,
            openEditGroup,
            editingGroup,

            availableGroupColors,
            cancelChanges,
            addEditGroup,
            openAddGroup,
        }
    }

})
</script>


<style lang="scss" scoped>

@use '@/components/scss/group-colors.scss';
@use '@/components/scss/highlighting.scss';

.project-group__container {

    display: flex;
    flex-wrap: nowrap;
    height: 50px;
    // overflow: auto;

    .group-items {
        display: flex;
        flex-wrap: wrap;
        // overflow: auto;
        align-items: center;
        align-content: center;
        // justify-content: center;

        .group-add {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color:#6E7475;
          cursor: pointer;

          &:hover {
            color: #383b3b;
            background-color: #efefef;
          }
        }
    }
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: #6E7475 #DFE9EB;
}


/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
*::-webkit-scrollbar-track {
  border-radius: 3px;
  background-color: #DFE9EB;
}

*::-webkit-scrollbar-track:hover {
  background-color: #B8C0C2;
}

*::-webkit-scrollbar-track:active {
  background-color: #B8C0C2;
}

*::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #6E7475;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #3774A3;
}

*::-webkit-scrollbar-thumb:active {
  background-color: #5D9CA3;
}

</style>
