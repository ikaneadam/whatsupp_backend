import {DataTypes} from "sequelize";

const db = require("./util/databaseConnector")
const Chat = db.define("Chat", {
    chatName: {
        type: DataTypes.STRING
    }
})
