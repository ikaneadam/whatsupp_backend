import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Chat} from "./entity/Chat";
import {Message} from "./entity/Message";


export const AppDataSource = new DataSource({
    url:"postgres://jaegicykdpdivx:d1d6844169950cc1986d6fba4812ca5c97dd8869646ad3f6f3319f64c39cf3c6@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d7l7kk1pks5er5",
    type: "postgres",
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    synchronize: true,
    logging: false,
    entities: [User, Chat, Message]
})

// postgres://jaegicykdpdivx:d1d6844169950cc1986d6fba4812ca5c97dd8869646ad3f6f3319f64c39cf3c6@ec2-52-18-116-67.eu-west-1.compute.amazonaws.com:5432/d7l7kk1pks5er5
