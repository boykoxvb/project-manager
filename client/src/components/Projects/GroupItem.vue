<template>
  <div
    class="container"
    :class="{ [`color-${group.color}`]: choosed, 'shadow-blue-mini': choosed }"
    @click="chooseGroup"
  >
    <div class="group-color" :class="{ [`color-${group.color}`]: true }" v-if="!choosed"></div>
    <div class="group__expanded" v-if="choosed">
      <p class="group__name">{{ group.name }}</p>
      <div class="tools">
        <div class="tools-button tools-edit">
          <v-icon @click.stop="editGroup()" icon="mdi-pencil-outline" size="small"></v-icon>
        </div>
        <vb-icon-timer @timeout="deleteGroup()"></vb-icon-timer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue'
import * as ProjectManager from '@/classes'
import vbIconTimer from '../atom-components/vb-icon-timer.vue'

export default defineComponent({
  props: {
    group: { type: Object as PropType<ProjectManager.ProjectGroup>, required: true },
    choosed: { type: Boolean, required: false },
  },
  components: {
    vbIconTimer,
  },
  setup(props, { emit }) {
    const hovered = ref(false)

    const isDeleting = ref(false)
    const deleteTimeout = ref()

    const chooseGroup = () => {
      emit('choosed')
    }

    const editGroup = () => {
      emit('edit')
    }

    const deleteGroup = () => {
      emit('delete')
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
  flex: 0 0 auto;
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

    .group__name {
      max-width: 150px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .tools {
      display: flex;
      justify-content: center;
      align-items: center;
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
