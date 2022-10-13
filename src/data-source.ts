import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Chat} from "./entity/Chat";
import {Message} from "./entity/Message";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "db-persist",
    username: "postgres",
    password: "password",
    database: "postgres",
    port: 5432,
    synchronize: true,
    logging: false,
    entities: [User, Chat, Message]
})
