export default class ProjectDto {
    public uuid: string | undefined 
    public name: string | undefined
    public group_id: string | undefined
    public deadline: Date | undefined
    public state: ProjectState | undefined

    public constructor(projectDto: any) {
        this.uuid = projectDto.uuid
        this.name = projectDto.name
        this.group_id = projectDto.group_id
        this.deadline = projectDto.deadline
        this.state = projectDto.state
    }
}

export enum ProjectState {
    STARTED = 7,
    PAUSED,
    FINISHED,
}
