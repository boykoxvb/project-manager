import { mount } from '@vue/test-utils'
import TaskCard from '../../../src/components/Projects/TaskCard.vue'
import { Task } from '@/classes'
// import * as components from '../../../node_modules/vuetify/lib/components/index'


describe('TaskCard.vue', () => {
  it('Отрисовывает название таски', () => {
    const tc = mount(TaskCard, {
      props: {
        task: new Task('uuid of task', 'TestTask')
      },
    })

    const taskNameInput = tc.find('input.task__label')
    expect((taskNameInput.element as HTMLInputElement).value).toBe('TestTask')
    taskNameInput.setValue('Новое название')
    expect((taskNameInput.element as HTMLInputElement).value).toBe('Новое название')
  
  })
})