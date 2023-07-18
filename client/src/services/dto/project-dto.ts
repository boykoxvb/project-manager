import { Project } from "@/classes"
import TaskDto from "./task-dto"

export default class ProjectDto {
    public uuid: string | undefined
    public name: string
    public group_id: string
    public deadline: Date | undefined
    public state: ProjectState
    public tasks: Array<TaskDto> | undefined

    public constructor(uuid: string | undefined, name: string, group_id: string, deadline: Date | undefined, state: ProjectState, tasks?: Array<TaskDto>) {
        this.uuid = uuid
        this.name = name
        this.group_id = group_id
        this.deadline = deadline
        this.state = state
        this.tasks = tasks
    }

    public static convertFromObject(project: Project) {
        return new ProjectDto(project.uuid, project.name, project.group.uuid, project.deadline, project.state, project.tasks.map((task) => TaskDto.convertFromObject(task)))
    }
}

export enum ProjectState {
    STARTED = 7,
    PAUSED,
    FINISHED,
}
