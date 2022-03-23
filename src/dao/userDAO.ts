import databaseConnector from "../util/databaseConnector";

class UserDAO {

    private db: databaseConnector
    constructor() {
        this.db = new databaseConnector()
    }


    public async getUsers(){
        const { rows } = await this.db.query('SELECT uuid, username, friendShipCode FROM Users', []);
        return rows;
    }

    public async getChatsFromUser(UserUUID:string){
        const { rows } = await this.db.query(`SELECT * FROM Chats WHERE uuid IN (Select chatUUID from UsersChats where userUUID= ${UserUUID});`, []);
        return rows;
    }

    public async getUser(id: string){
        const { rows } = await this.db.query('SELECT uuid, username, friendShipCode FROM Users WHERE UUID = $1', [id]);
        return rows[0];
    }

    public async insertUser(username: string) {
        const {rows} = await this.db.query(`INSERT INTO Users (username) VALUES ('${username}');`, []);
        return rows[0];
    }
    public async getUsername(username: string) {
        const {rows} = await this.db.query(`SELECT * FROM Users where username = '${username}';`, []);
        return rows;
    }

    public async deleteUser(number: number) {
        const { rows } = await this.db.query(`DELETE FROM Users WHERE UUID = ${number};`, []);
        return rows;
    }
}

export default UserDAO
