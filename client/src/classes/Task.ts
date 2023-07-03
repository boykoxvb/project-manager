export default class Task {

    public uuid: string

    public name: string
    public deadline: Date | undefined
    
    get state(): TaskState {
        return this._state
    }

    //! какого-то хрена приватные поля не экспортируются из-за чего вылетает ошибка несовместимости типов поэтому пока просто именуем поля с _ 
    public _state: TaskState
    

    public constructor(uuid: string, name: string, deadline?: Date) {
        this.uuid = uuid
        this.name = name
        this.deadline = deadline
        this._state = TaskState.CREATED
    }

    public setState(state: TaskState){
        this._state = state
    }

}

export enum TaskState {
    CREATED = 2,
    STARTED,
    PAUSED,
    FINISHED
}

