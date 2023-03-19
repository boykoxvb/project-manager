<template>
  <!-- <vb-progress-bar :progress="70" :falseProgress="30" :height="10"></vb-progress-bar> -->
  <!-- <HeaderPanel></HeaderPanel>
  <ProjectsPanel></ProjectsPanel> -->
  <!-- <RedactorPanel :project="testProject"></RedactorPanel> -->
  <div class="layout">
    <div class="navbar">
      <header-panel></header-panel>
    </div>
    <div class="content">
      <div class="projects-panel">
        <projects-panel
        @project:choosed="chooseProject($event)"
        ></projects-panel>
      </div>
      <div class="redactor-panel">
        <redactor-panel :project="choosedProject"></redactor-panel>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">

import { defineComponent, reactive, computed } from 'vue';
import * as ProjectManager from '@/classes'
import { vbProgressBar, HeaderPanel, ProjectCardCompact, ProjectsPanel, TaskCard, RedactorPanel } from '@/components'
import { useStore } from '@/store'

export default defineComponent({
  name: 'TestView',
  components: {
    vbProgressBar,
    HeaderPanel,
    ProjectCardCompact,
    ProjectsPanel,
    TaskCard,
    RedactorPanel
  },
  setup(props) {

    const store = useStore()

    const chooseProject = (project: ProjectManager.Project) => {
      store.commit('chooseProject', project)
    }

    const choosedProject = computed(() => {
      return store.state.choosedProject
    })
    
    
    const testProject: ProjectManager.Project = 
        reactive(new ProjectManager.Project
                    ('uuid', 'TestProject', new Date(), new Date(), 'Описание проекта')
                )

    testProject.addTask(new ProjectManager.Task('uuid', 'Погулять с собакой'))
    testProject.addTask(new ProjectManager.Task('uuid', 'Выпить пива'))

    return {
        testProject,
        chooseProject,
        choosedProject
    }

  }
});
</script>

<style lang="scss" scoped>

.layout {
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100%;
  background-color: #605e4e;
  box-sizing: border-box;
  overflow: hidden;

  .navbar {
    display: block;
    height: 6vh;
    box-sizing: border-box;
    background-color: #008e39;
  }

  .content {
    height: 94vh;
    padding: 20px;
    box-sizing: border-box;
    flex-grow: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: #eaf0f4;
    gap: 20px;

    .projects-panel {
      flex-grow: 1;
      grid-column-start: 1;
      grid-column-end: 4;
    }

    .redactor-panel {
      grid-column-start: 4;
    }
  }
}
</style>
