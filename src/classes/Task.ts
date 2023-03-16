export default class Task {

    public name: string
    public deadline: Date | undefined
    
    get state(): TaskState {
        return this._state
    }

    //! какого-то хрена приватные поля не экспортируются из-за чего вылетает ошибка несовместимости типов поэтому пока просто именуем поля с _ 
    public _state: TaskState
    

    public constructor(name: string, deadline?: Date) {
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

