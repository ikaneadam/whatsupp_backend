import {Server, Socket} from "socket.io";
import MessageDAO from "../dao/messageDAO";

class friendshipService {
    private socket: Socket
    private io: Server
    public dao: MessageDAO
    constructor(socketServer: Server, socket: Socket) {
        this.socket = socket;
        this.io = socketServer;
        this.dao = new MessageDAO();
    }

    public listenToChat() {
        this.socket.on("friendRequest", (dataFromClient)=>{

        })
    }
}

export default friendshipService
