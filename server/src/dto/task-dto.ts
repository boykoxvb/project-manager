import { Task } from "../orm/entity"

export default class TaskDto {
    public uuid: string | undefined 
    public name: string | undefined
    public state: string | undefined

    public constructor(task: Task) {
        this.uuid = task.id
        this.name = task.name
        this.state = task?.state.toString()
    }
}

export enum TaskState {
    STARTED = 2,
    FINISHED
}