import TaskDto from "./task-dto"

export default class ProjectDto {
    public uuid: string | null | undefined
    public name: string | null | undefined
    public group_id: string | null | undefined
    public deadline: Date | null | undefined
    public state: ProjectState | null | undefined
    public tasks: Array<TaskDto> | null | undefined

    public constructor(uuid: string | null, name: string | null, group_id: string | null, deadline: Date | null, state: ProjectState | null) {
        this.uuid = uuid
        this.name = name
        this.group_id = group_id
        this.deadline = deadline
        this.state = state
    }
}

export enum ProjectState {
    STARTED = 7,
    PAUSED,
    FINISHED,
}
