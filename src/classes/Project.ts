import { Task, TaskState, ProjectGroup } from '@/classes'

export default class Project {
    public uuid: string
    public deadline: Date | undefined
    public name: string
    public group: ProjectGroup | undefined
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

        return Math.round(100 * (finishedTasks/(this.tasks.length)))

    }

    constructor(uuid: string, name: string, deadline?: Date, startDate?: Date, description?: string) {
        this.uuid = uuid
        this.name = name
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
    STARTED = 7,
    PAUSED,
    FINISHED,
}
