import { Task, TaskState, ProjectGroup } from '@/classes'

export default class Project {
    public deadline: Date | undefined
    public name: string
    public group: ProjectGroup 
    public tasks: Array<Task>
    public startDate: Date | undefined
    public description: string | undefined
    public _state: ProjectState

    get state(): ProjectState {
        return this._state
    }

    get progress(): number {

        if (this.tasks.length == 0) {
            return 0
        }

        const finishedTasks: number = this.tasks.filter((task) => {
            return task.state == TaskState.FINISHED
        }).length

        return 100 * (finishedTasks/(this.tasks.length))

    }

    constructor(name: string, group: ProjectGroup, deadline?: Date, startDate?: Date, description?: string) {
        this.name = name
        this.group = group
        this.deadline = deadline
        this.tasks = []
        this.startDate = startDate
        this.description = description
        this._state = ProjectState.STARTED
    }

    public setState(state: ProjectState) {
        this._state = state
    }

    public addTask(task: Task) {
        this.tasks.push(task)
    }

}

export enum ProjectState {
    STARTED,
    PAUSED,
    FINISHED,
}
