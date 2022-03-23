import {Server, Socket} from "socket.io";


class createChatService {
    private socket: Socket
    private io: Server
    constructor(socketServer: Server, socket: Socket) {
        this.socket = socket;
        this.io = socketServer;
    }

    public listenToCreateChat() {
        this.socket.on("createChat", (user_requester,user_receiver)=>{


        })
    }

    // private doesChatUsersExist(user_requester: string, user_receiver: string){
    //     return this.userUtil.doesUserExist(user_requester) && this.userUtil.doesUserExist(user_receiver)
    // }
}

export default createChatService
