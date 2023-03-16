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
        <projects-panel></projects-panel>
      </div>
      <div class="redactor-panel">
        <redactor-panel :project="testProject"></redactor-panel>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">

import { defineComponent, reactive } from 'vue';
import * as ProjectManager from '@/classes'
import { vbProgressBar, HeaderPanel, ProjectCardCompact, ProjectsPanel, TaskCard, RedactorPanel } from '@/components'

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
        
    const testProject: ProjectManager.Project = 
        reactive(new ProjectManager.Project
                    ('TestProject', new ProjectManager.ProjectGroup('ProjectTestGroup', '#000000'), new Date(), new Date(), 'Описание проекта')
                )

    testProject.addTask(new ProjectManager.Task('Погулять с собакой'))
    testProject.addTask(new ProjectManager.Task('Выпить пива'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))
    testProject.addTask(new ProjectManager.Task('Протереть стол'))

    return {
        testProject
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
    grid-template-columns: 1fr 1fr 1fr;
    background-color: #eaf0f4;
    gap: 20px;

    .projects-panel {
      flex-grow: 1;
      grid-column-start: 1;
      grid-column-end: 3;
    }

    .redactor-panel {
      grid-column-start: 3;
    }
  }
}
</style>
