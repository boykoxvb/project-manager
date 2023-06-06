<template>
  <CardCompact
  @project:choosed="$emit('project:choosed', testProject)"
  :key="testProject.uuid"
  :project="testProject"
  :choosed="testProject"
  ></CardCompact>
</template>
  
  <script lang="ts">
  
  import { defineComponent, reactive, computed } from 'vue';
  import * as ProjectManager from '@/classes'
  import { vbProgressBar, HeaderPanel, CardCompact, ProjectsPanel, TaskCard, RedactorPanel, vbChoosableInput } from '@/components'
  import { useStore } from '@/store'
  
  export default defineComponent({
    name: 'ComponentTest',
    components: {
      vbProgressBar,
      HeaderPanel,
      CardCompact,
      ProjectsPanel,
      TaskCard,
      RedactorPanel,
      vbChoosableInput,
    },
    setup(props) {
  
      const store = useStore()
  
      const chooseProject = (project: ProjectManager.Project) => {
        store.commit('Projects/chooseProject', project)
      }
  
      const choosedProject = computed(() => store.getters['Projects/choosedProject'])
      
      
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