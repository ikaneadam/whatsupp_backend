import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Chat} from "./entity/Chat";
import {Message} from "./entity/Message";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db-persist",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User, Chat, Message],
    migrations: [],
    subscribers: [],
})
