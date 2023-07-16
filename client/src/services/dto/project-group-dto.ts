import ProjectDto from "./project-dto"

export default class ProjectGroupDto {
    public uuid: string
    public name: string
    public color: string
    public projects: Array<ProjectDto>

    // public constructor(group: ProjectGroup, projects?: Array<ProjectDto>) {
    //     this.uuid = group?.id
    //     this.name = group?.name
    //     this.color = group?.color
    //     this.projects = projects
    // }
}