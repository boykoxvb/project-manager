import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { ProjectGroup } from "./ProjectGroup"
import { User } from "../Auth/User"

@Entity('projects')
export class Project {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE',
    })
    user: User

    @ManyToOne(() => ProjectGroup, (project_group) => project_group.id, {
        onDelete: 'CASCADE',
    })
    project_group: ProjectGroup

    @Column()
    state: number

    @Column({nullable: true}) 
    deadline: Date

    @CreateDateColumn()
    create_date: Date

    @UpdateDateColumn()
    update_date: Date

    constructor(
        name: string,
        user: User,
        project_group: ProjectGroup,
        state: number,
        deadline: Date | null,
    ) {
        this.name = name
        this.user = user
        this.project_group = project_group
        this.state = state
        this.deadline = deadline
    }

}
