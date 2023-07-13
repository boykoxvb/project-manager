import ProjectDto from "./project-dto"

export default class ProjectGroupDto {
    public uuid: string | undefined
    public name: string | undefined
    public color: string | undefined
    public projects: Array<ProjectDto> | undefined

    public constructor(groupDto: any) {
        this.uuid = groupDto?.uuid
        this.name = groupDto?.name
        this.color = groupDto?.color
        this.projects = groupDto?.projects
    }
}