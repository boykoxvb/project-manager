<template>
  <!-- <vb-progress-bar :progress="70" :falseProgress="30" :height="10"></vb-progress-bar> -->
  <!-- <HeaderPanel></HeaderPanel>
  <ProjectsPanel></ProjectsPanel> -->
  <RedactorPanel :project="testProject"></RedactorPanel>
</template>

<script lang="ts">

import { defineComponent, reactive } from 'vue';
import * as ProjectManager from '@/classes'
import {vbProgressBar, HeaderPanel, ProjectCardCompact, ProjectsPanel, TaskCard, RedactorPanel} from '@/components'

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

    return {
        testProject
    }

  }
});
</script>
