import { Task } from "@/classes"

export default class TaskDto {
    public uuid: string | undefined
    public name: string | undefined

    public constructor(uuid: string, name: string) {
        this.uuid = uuid
        this.name = name
    }

    public static convertFromObject(task: Task) {
        return new TaskDto(task.uuid, task.name)
    }
}

export enum TaskState {
    CREATED = 2,
    STARTED,
    PAUSED,
    FINISHED
}