import { Project } from "../orm/entity"
import TaskDto from "./task-dto"

export default class ProjectDto {
    public uuid: string | undefined 
    public name: string | undefined
    public group_id: string | undefined
    public deadline: Date | undefined
    public state: ProjectState | undefined
    public tasks: Array<TaskDto> | undefined

    public constructor(project: Project, tasks?: Array<TaskDto>) {
        this.uuid = project.id
        this.name = project.name
        this.group_id = project.project_group.id
        this.deadline = project.deadline
        this.state = project.state
        this.tasks = tasks
    }
}

export enum ProjectState {
    STARTED = 7,
    PAUSED,
    FINISHED,
}
