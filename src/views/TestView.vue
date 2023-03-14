<template>
  <!-- <vb-progress-bar :progress="70" :falseProgress="30" :height="10"></vb-progress-bar> -->
  <!-- <HeaderPanel></HeaderPanel>
  <ProjectsPanel></ProjectsPanel> -->
  <TaskCard></TaskCard>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as ProjectManager from '@/classes'
import {vbProgressBar, HeaderPanel, ProjectCardCompact, ProjectsPanel, TaskCard} from '@/components'

export default defineComponent({
  name: 'TestView',
  components: {
    vbProgressBar,
    HeaderPanel,
    ProjectCardCompact,
    ProjectsPanel,
    TaskCard,
  },
  data() {
    return {
      testTask: new ProjectManager.Task('TestTask', new Date())
    }
  }
});
</script>
