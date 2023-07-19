import { ProjectGroup } from "@/classes"
import ProjectDto from "./project-dto"

export default class ProjectGroupDto {
    public uuid: string | undefined
    public name: string
    public color: string
    public projects: Array<ProjectDto> | undefined

    public constructor(group: ProjectGroup) {
        this.uuid = group.uuid
        this.name = group.name
        this.color = group.color
        this.projects = group.projects ? group.projects.map((pr) => ProjectDto.convertFromObject(pr)) : undefined
    }
}




