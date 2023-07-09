import ProjectGroup from "./ProjectGroup";

class FilterState {

    public nameSearch: string | null
    public groupFilter: ProjectGroup | null
    public stateFilter: string | null

    private static _instance: FilterState;

    constructor() {
        this.nameSearch = null
        this.groupFilter = null
        this.stateFilter = null
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

}

const sortState = FilterState.Instance;
export default sortState;

