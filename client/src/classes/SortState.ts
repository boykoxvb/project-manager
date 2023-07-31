class SortState {
  public name: boolean | null
  public deadline: boolean | null

  private static _instance: SortState

  constructor() {
    this.name = null
    this.deadline = null
  }

  public static get Instance() {
    return this._instance || (this._instance = new this())
  }

  public set(key: string, asc: boolean | null) {
    if (key == 'name') {
      this.name = asc
      this.deadline = null
    } else if (key == 'deadline') {
      this.deadline = asc
      this.name = null
    } else {
      throw new Error(`В типе SortState не существует поля ${key}`)
    }
  }

  public getActive() {
    if (this.name != null) {
      return 'name'
    } else if (this.deadline != null) {
      return 'deadline'
    } else {
      return null
    }
  }
}

const sortState = SortState.Instance
export default sortState
