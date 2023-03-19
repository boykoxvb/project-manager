import * as ProjectManager from '@/classes'

export interface IRootState {
    userId: string,
    choosedProject: ProjectManager.Project,
}

export interface IProjectsState {
    groups: Array<ProjectManager.ProjectGroup>
    
}