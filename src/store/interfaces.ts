import * as PM from '@/classes'

export interface IRootState {
    userId: string,
}

export interface IProjectsState {
    projects: Array<PM.Project>
    groups: Array<PM.ProjectGroup>
    choosedProject: PM.Project | undefined | null
    sortState: any
}


export interface IAuthState {
    sessionId: string,
    userId: string,
    failAttempts: number,
}