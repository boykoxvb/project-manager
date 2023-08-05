<template>
  <div class="layout">
    <div class="navbar">
      <header-panel />
    </div>
    <div class="main">
      <div class="content">
        <div class="projects-panel" :class="{ maxh: choosedProject, 'col-span': !choosedProject }">
          <projects-panel @project:choosed="chooseProject($event)" />
        </div>
        <div v-if="choosedProject && choosedProject.uuid != ''" class="redactor-panel">
          <redactor-panel :project="choosedProject" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import * as ProjectManager from '@/classes'
import { HeaderPanel, ProjectsPanel, RedactorPanel } from '@/components'
import { useStore } from '@/store'

export default defineComponent({
  name: 'TestView',
  components: {
    HeaderPanel,
    ProjectsPanel,
    RedactorPanel,
  },
  setup() {
    const store = useStore()

    const chooseProject = (project: ProjectManager.Project) => {
      store.commit('Projects/chooseProject', project)
    }

    const choosedProject = computed(() => store.getters['Projects/choosedProject'])

    return {
      chooseProject,
      choosedProject,
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/components/scss/index.scss';
// @import '@/components/scss/breakpoints.scss';

.layout {
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100svh;
  box-sizing: border-box;
  overflow: hidden;

  .navbar {
    display: block;
    height: 6svh;
    box-sizing: border-box;
  }

  .main {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: $bg-light;

    .content {
      padding: 0 20px;
      flex-grow: 1;
      min-height: 94svh;
      max-height: 94svh;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding-bottom: 20px;

      .maxh {
        height: 50svh;
      }

      .col-span {
        @include desktop {
          grid-column: span 2;
        }
      }

      // @include mobile {
      //   // flex-grow: 1;
      // }

      @include desktop {
        display: grid;
        grid-template-columns: 2fr 1fr;
      }

      .projects-panel {
        flex-grow: 1;
        display: flex;
        max-height: 94svh;

        @include desktop {
          height: 94svh;
        }
      }

      .redactor-panel {
        height: 40svh;

        @include desktop {
          grid-column-start: 2;
          height: 94svh;
        }
      }
    }
  }
}
</style>
