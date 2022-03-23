import databaseConnector from "../util/databaseConnector";

class ChatDAO {

    private db: databaseConnector
    constructor() {
        this.db = new databaseConnector()
    }


    public async createChat(chatName: string){
        const createdChat = await this.db.query(`INSERT INTO Chats (chatName) VALUES ('${chatName}') RETURNING id`, []);
        const chatUUID = createdChat.rows[0]
        await this.db.query(`INSERT INTO Chats (chatName) VALUES ('${chatName}') RETURNING id`, []);
    }


}

// CREATE TABLE UsersChats (
//     UUID uuid DEFAULT uuid_generate_v4 (),
//     userUUID uuid NOT NULL,
//     chatUUID uuid NOT NULL,
//     CONSTRAINT UsersChats_pk PRIMARY KEY (UUID)
// );
//
// CREATE TABLE Chats(
//     UUID uuid DEFAULT uuid_generate_v4 (),
//     chatName varchar(255) NOT NULL,
//     CONSTRAINT Chats_pk PRIMARY KEY (UUID)
// );
export default ChatDAO


