import * as PM from '@/classes'

export interface IRootState {
    userId: string,
}

export interface IProjectsState {
    projects: Array<PM.Project>
    groups: Array<PM.ProjectGroup>
    choosedProject: PM.Project | undefined | null
    sortState: any
    filterState: any
}


export interface IAuthState {
    sessionId: string,
    userId: string,
    failAttempts: number,
}

export interface IUserState {
    id: string | null,
    is_activated: boolean | null,
    email: string | null,
    access_token: string | null | undefined,
    // access_token: string,
    // refresh_token: string,
}