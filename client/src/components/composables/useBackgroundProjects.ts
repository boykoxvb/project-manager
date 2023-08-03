import { reactive } from 'vue'
import { Project, ProjectGroup, Task, TaskState } from '@/classes'

export default function useBackgroundProjects() {
  const bgProjects = reactive([
    new Project('1', 'Опять эта'),
    new Project('2', 'Научиться летать', new Date()),
    new Project('3', 'Понять смысл', new Date()),
    new Project('4', 'Тестовый 4', new Date(new Date().getMilliseconds() + 1000 * 60 * 60 * 25)),
    new Project('5', 'Тестовый 5', new Date()),
    new Project('6', 'Тестовый 6', new Date()),
    new Project('7', 'Тестовый 7', new Date()),
    new Project('8', 'Тестовый 8', new Date()),
    new Project('9', 'Сдаться', new Date()),
    new Project('10', 'Тестовый 10', new Date()),
  ])

  const bgGroups = reactive([
    new ProjectGroup('g1', 'Домашние', 'sky'),
    new ProjectGroup('g2', 'Бытие', 'red'),
    new ProjectGroup('g3', 'Хобби', 'pink'),
    new ProjectGroup('g4', 'Учеба', 'orange'),
    new ProjectGroup('g5', 'Работа', 'lime'),
  ])

  bgProjects[9].group = bgGroups[0]
  bgProjects[7].group = bgGroups[0]
  bgProjects[2].group = bgGroups[1]
  bgProjects[3].group = bgGroups[1]
  bgProjects[4].group = bgGroups[2]
  bgProjects[5].group = bgGroups[2]
  bgProjects[1].group = bgGroups[3]
  bgProjects[6].group = bgGroups[3]
  bgProjects[8].group = bgGroups[4]
  bgProjects[0].group = bgGroups[4]

  bgProjects[0].addTask(new Task('', ''))
  bgProjects[0].addTask(new Task('', ''))
  bgProjects[0].addTask(new Task('', ''))

  const animeProjectTasks = (project: Project, duration: number, tasks: number) => {
    project.tasks = []
    for (let i = 0; i < tasks; i++) {
      project.addTask(new Task('', ''))
      setTimeout(
        () => {
          project.tasks[i].setState(TaskState.FINISHED)
        },
        (duration / tasks) * (i + 1)
      )
    }
  }

  setInterval(() => {
    animeProjectTasks(bgProjects[0], 10000, 4)
    animeProjectTasks(bgProjects[1], 10000, 7)
    animeProjectTasks(bgProjects[2], 10000, 8)
  }, 10000)

  setInterval(() => {
    animeProjectTasks(bgProjects[3], 15000, 3)
    animeProjectTasks(bgProjects[4], 15000, 4)
  }, 15000)

  setInterval(() => {
    animeProjectTasks(bgProjects[5], 20000, 2)
    animeProjectTasks(bgProjects[6], 20000, 5)
    animeProjectTasks(bgProjects[7], 20000, 3)
  }, 20000)

  setInterval(() => {
    animeProjectTasks(bgProjects[8], 25000, 8)
    animeProjectTasks(bgProjects[9], 25000, 5)
  }, 25000)

  animeProjectTasks(bgProjects[0], 10000, 4)
  animeProjectTasks(bgProjects[1], 10000, 7)
  animeProjectTasks(bgProjects[2], 10000, 8)
  animeProjectTasks(bgProjects[3], 15000, 3)
  animeProjectTasks(bgProjects[4], 15000, 4)
  animeProjectTasks(bgProjects[5], 20000, 2)
  animeProjectTasks(bgProjects[6], 20000, 5)
  animeProjectTasks(bgProjects[7], 20000, 3)
  animeProjectTasks(bgProjects[8], 25000, 8)
  animeProjectTasks(bgProjects[9], 25000, 5)

  return {
    bgProjects,
  }
}
