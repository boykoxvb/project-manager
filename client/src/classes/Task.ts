import TaskDto from "@/services/dto/task-dto"

export default class Task {

    public uuid: string

    public name: string
    
    public _state: TaskState

    get state(): TaskState {
        return this._state
    }

    

    public constructor(uuid?: string, name?: string, dto?: TaskDto) {
        if (dto) {
            this.uuid = dto.uuid ?? ""
            this.name = dto.name ?? ""
            this._state = TaskState.STARTED
        } else {
            this.uuid = uuid ?? ''
            this.name = name ?? ''
            this._state = TaskState.STARTED
        }
    }

    public setState(state: TaskState){
        this._state = state
    }

}

export enum TaskState {
    STARTED = 2,
    FINISHED
}

