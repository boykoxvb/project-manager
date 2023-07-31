import { Task } from '@/classes'

export default class TaskDto {
  public uuid: string | undefined
  public name: string | undefined
  public state: TaskState | undefined

  public constructor(uuid: string, name: string, state?: TaskState) {
    this.uuid = uuid
    this.name = name
    this.state = state
  }

  public static convertFromObject(task: Task) {
    return new TaskDto(task.uuid, task.name, task.state)
  }
}

export enum TaskState {
  STARTED = 2,
  FINISHED,
}
