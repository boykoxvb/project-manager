import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { Project } from "./Project"
import { TaskState } from "../../../dto/task-dto"

@Entity('tasks')
export class Task {


    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({default: TaskState.STARTED})
    state: number

    @ManyToOne(() => Project, (project) => project.id, {
        onDelete: 'CASCADE',
    })
    project: Project

    @CreateDateColumn()
    create_date: Date

    @UpdateDateColumn()
    update_date: Date

    constructor(
        name: string,
        project: Project,
    ) {
        this.name = name
        this.project = project
        this.state = TaskState.STARTED
    }

}
