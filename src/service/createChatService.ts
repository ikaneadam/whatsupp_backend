
import {Server, Socket} from "socket.io";
import MessageDAO from "../dao/messageDAO";
import UserQueries from "../util/queries/UserQueries";
import UserDAO from "../dao/userDAO";

class createChatService {
    private userUtil: UserQueries
    private socket: Socket
    private io: Server
    private dao: MessageDAO
    constructor(socketServer: Server, socket: Socket) {
        this.socket = socket;
        this.io = socketServer;
        this.dao = new MessageDAO();
        this.userUtil = new UserQueries();
    }

    public listenToCreateChat() {
        this.socket.on("createChat", (user_requester,user_receiver)=>{
            if(this.doesChatUsersExist(user_requester,user_receiver )) return

        })
    }

    private doesChatUsersExist(user_requester: string, user_receiver: string){
        return this.userUtil.doesUserExist(user_requester) && this.userUtil.doesUserExist(user_receiver)
    }
}

export default createChatService
