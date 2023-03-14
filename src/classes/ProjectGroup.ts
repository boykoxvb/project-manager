import Project from "@/classes/Project"

export default class ProjectGroup {
    public name: String
    // public projects: Array<Project>
    public color: String

    public constructor(name: String, color: String) {
        this.name = name
        this.color = color
    }
}