import databaseConnector from "../util/databaseConnector";

class MessageDAO {

    private db: databaseConnector
    constructor() {
        this.db = new databaseConnector()
    }


    public async insertMessage(content: string, chatUUID: string, username: string) {
        const currentTime = new Date().toLocaleString();
        const {rows} = await this.db.query(`INSERT INTO Message (content, chatUUID, username, TimeStamp) VALUES ('${content}', ${chatUUID}, '${username}', '${currentTime}');`, []);
        return rows[0];
    }


}

export default MessageDAO
