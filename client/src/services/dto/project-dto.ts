export default class ProjectDto {
    public uuid: string | null
    public name: string | null
    public group_id: string | null
    public deadline: Date | null
    public state: ProjectState | null

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
