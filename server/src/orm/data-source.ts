import "reflect-metadata"
import { DataSource } from "typeorm"
import { User, Token } from "./entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "192.168.1.10",
    port: 5432,
    username: "postgres",
    password: "gupafcwu",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Token],
    migrations: [],
    subscribers: [],
})
