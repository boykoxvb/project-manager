export default class ProjectDto {
    public uuid: string | undefined 
    public name: string | undefined
    public state: TaskState | undefined

    public constructor(TaskDto: any) {
        this.uuid = TaskDto.uuid
        this.name = TaskDto.name
        this.state = TaskDto.state
    }
}

export enum TaskState {
    CREATED = 2,
    STARTED,
    PAUSED,
    FINISHED
}