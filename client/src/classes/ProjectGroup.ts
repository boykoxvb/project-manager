import Project from "@/classes/Project"
import ProjectGroupDto from "@/services/dto/project-group-dto"

export default class ProjectGroup {
    public uuid: string
    public name: string
    public color: string
    public projects: Array<Project> 

    
    constructor(uuid?: string, name?: string, color?: string, dto?: ProjectGroupDto) {
        if (dto) {
            this.uuid = dto.uuid ?? ""
            this.name = dto.name
            this.color = dto.color
            this.projects = dto.projects ? dto.projects.map((pr) => {
                const newProject = new Project(undefined, undefined, undefined, pr)
                newProject.setGroup(this)
                return newProject
            }) : []
        }else if(uuid && name && color) {
            this.uuid = uuid
            this.name = name
            this.color = color
            this.projects = []
        }

    }

    public addProject(project: Project) {
        project.group = this
        this.projects.push(project)
    }

    // public static parseDto(dto: ProjectGroupDto): ProjectGroup {
    //     const group = new ProjectGroup()

    // }
}