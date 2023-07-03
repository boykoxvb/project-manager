
export default class TestProject {
    public deadline: Date
    public name: string
    public groupname: string | undefined
    public groupcolor: string | undefined

    get progress(): number {

        return Math.floor(Math.random() * 100)

    }

    constructor(name: string, groupname: string, groupcolor: string, deadline: Date) {
        this.name = name
        this.deadline = deadline
        this.groupname = groupname 
        this.groupcolor = groupcolor
    }

}