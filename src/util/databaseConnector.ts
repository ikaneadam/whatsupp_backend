import {Sequelize} from "sequelize";

const db  = new Sequelize('postgres://postgres:password@db-persist:5432/postgres')

export {db}

