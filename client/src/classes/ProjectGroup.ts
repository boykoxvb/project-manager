import Project from "@/classes/Project"

export default class ProjectGroup {
    public uuid: string
    public name: string
    public projects: Array<Project>
    public color: string

    
    public constructor(uuid: string, name: string, color: string) {
        this.uuid = uuid
        this.name = name
        this.color = color
        this.projects = []
    }

    public addProject(project: Project) {
        project.group = this
        this.projects.push(project)
    }
}