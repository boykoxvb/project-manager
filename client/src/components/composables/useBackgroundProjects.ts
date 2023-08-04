import { reactive } from 'vue'
import { Project, ProjectGroup, Task, TaskState } from '@/classes'

export default function useBackgroundProjects() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const bgProjects = reactive([
    new Project('1', 'Найти уже'),
    new Project('2', 'Научиться летать', tomorrow),
    new Project('3', 'Понять смысл', tomorrow),
    new Project('4', 'Искать дзен', tomorrow),
    new Project('5', 'Навести суету', tomorrow),
    new Project('6', 'Купить феррари', new Date()),
    new Project('7', 'Не числануться'),
    new Project('8', 'Перевернуть календарь', new Date('2023-09-03')),
    new Project('9', 'И снова', tomorrow),
    new Project('10', 'Че купить?', tomorrow),
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
