import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"

@Entity('tokens')
export class Token {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    refresh_token: string

    @CreateDateColumn()
    create_date: Date

    @UpdateDateColumn()
    update_date: Date

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE',
    })
    user: User

    public constructor(
        refresh_token: string,
        user: User
    ) {
        this.refresh_token = refresh_token
        this.user = user
    }

}
