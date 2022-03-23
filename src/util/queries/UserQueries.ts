import UserDAO from "../../dao/userDAO";

class UserQueries{
    public dao: UserDAO
    constructor() {
        this.dao = new UserDAO();
    }
    public async doesUserExist(username: string) {
        let usernameQuery = await this.dao.getUsername(username);
        return usernameQuery.length == 0
    }
}

export default UserQueries
