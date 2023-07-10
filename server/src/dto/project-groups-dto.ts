import { Project } from "../orm/entity"

export default class ProjectGroupDto {
    public uuid: string
    public name: string
    public projects: Array<Project>
    public color: string

    public constructor(uuid: string, name: string, color: string, projects: Array<Project>) {
        this.uuid = uuid
        this.name = name
        this.color = color
        this.projects = []
    }
}