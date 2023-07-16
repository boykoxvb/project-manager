
export default class TaskDto {
    public uuid: string | undefined 
    public name: string | undefined

    // public constructor(task: Task) {
    //     this.uuid = task.id
    //     this.name = task.name
    // }
}

export enum TaskState {
    CREATED = 2,
    STARTED,
    PAUSED,
    FINISHED
}