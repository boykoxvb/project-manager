import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity('users')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({unique: true})
    login: string

    @Column()
    password: string

    @Column()
    email: string

    @Column() 
    is_activated: boolean

    @Column({nullable: true}) 
    activation_link: string | null

    @CreateDateColumn()
    create_date: Date

    @UpdateDateColumn()
    update_date: Date

    constructor(
        name: string,
        login: string,
        password: string,
        email: string,
        activation_link?: string
    ) {
        this.name = name
        this.login = login
        this.password = password
        this.email = email
        this.is_activated = false
        this.activation_link = activation_link ?? null
    }

}
