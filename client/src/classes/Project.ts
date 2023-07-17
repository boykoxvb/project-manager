import { Task, TaskState, ProjectGroup, IDateString } from '@/classes'
import ProjectDto from '@/services/dto/project-dto'

export default class Project implements IDateString {
    public uuid: string
    public deadline: Date | undefined
    public name: string
    public group: ProjectGroup | undefined
    public tasks: Array<Task>
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

    constructor(uuid?: string, name?: string, deadline?: Date, dto?: ProjectDto) {
        if (dto) {
            this.uuid = dto.uuid ?? ""
            this.name = dto.name ?? ""
            this.deadline = dto.deadline ?? new Date()
            this.tasks = dto.tasks ? dto.tasks.map((task) => new Task(undefined, undefined, task)) : []
            this._state = dto.state ?? ProjectState.STARTED
        }else if (uuid && name && deadline) {
            this.uuid = uuid
            this.name = name
            this.deadline = deadline
            this.tasks = []
            this._state = ProjectState.STARTED
        }
    }

    public dateString(date: Date | undefined | null): string {
        if (!date) { return 'Бессрочный' }
        var d: string = date.getDate().toString()
        var m: string = Months[date.getMonth() + 1]
        var y: string = date.getFullYear().toString()
        return d + ' ' + m + ', ' + y
    }

    public setState(state: ProjectState) {
        this._state = state
    }

    public addTask(task: Task) {
        this.tasks.push(task)
    }

    public setGroup(group: ProjectGroup) {
        this.group = group
    }

}

export enum ProjectState {
    STARTED = 7,
    PAUSED,
    FINISHED,
}

enum Months {
    'Января' = 1,
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
}
