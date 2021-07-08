import databaseConnector from "../util/databaseConnector";

class MessageDAO {

    private db: databaseConnector
    constructor() {
        this.db = new databaseConnector()
    }


    public async getUsers(){
        const { rows } = await this.db.query('SELECT uuid, username, friendShipCode FROM Users', []);
        return rows;
    }

}

export default MessageDAO
