import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "../Auth/User"

@Entity('project_groups')
export class ProjectGroup {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE',
    })
    user: User

    @Column()
    color: string

    @CreateDateColumn()
    create_date: Date

    @UpdateDateColumn()
    update_date: Date

    constructor(
        name: string,
        user: User,
        color: string,
    ) {
        this.name = name
        this.user = user
        this.color = color
    }

}
