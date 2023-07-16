import { ProjectGroup } from "../orm/entity"
import ProjectDto from "./project-dto"

export default class ProjectGroupDto {
    public uuid: string | undefined
    public name: string | undefined
    public color: string | undefined
    public projects: Array<ProjectDto> | undefined

    public constructor(group: ProjectGroup, projects?: Array<ProjectDto>) {
        this.uuid = group?.id
        this.name = group?.name
        this.color = group?.color
        this.projects = projects
    }
}