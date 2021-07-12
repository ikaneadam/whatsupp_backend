import databaseConnector from "../util/databaseConnector";

class UserDAO {

    private db: databaseConnector
    constructor() {
        this.db = new databaseConnector()
    }

    public async getChat(chatUUID: string) {
        const { rows } = await this.db.query('SELECT * FROM Chats WHERE UUID = $1;', [chatUUID]);
        return rows[0];
    }

    public async getChats() {
        const { rows } = await this.db.query('SELECT * FROM Chats;', []);
        return rows;
    }

    public async getMessagesFromChat(chatUUID: string) {
        const { rows } = await this.db.query(`select * from Message where chatUUID = ${chatUUID}`, []);
        return rows;

    }

    public async insertChat(chatName: string, createdDate: string, isGroupsChat: boolean) {
        const {rows} = await this.db.query(`INSERT INTO Chats (chatName, createdDate, isGroupsChat) VALUES ('${chatName}', '${createdDate}', ${isGroupsChat});`, []);
        return rows[0];
    }
}

export default UserDAO
