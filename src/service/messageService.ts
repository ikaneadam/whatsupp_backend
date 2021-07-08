import {Server, Socket} from "socket.io";
import UserDAO from "../dao/userDAO";

class connectionService {
    public dao: UserDAO

    constructor() {
        this.dao = new UserDAO();
    }



}

export default connectionService
