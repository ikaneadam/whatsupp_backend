import ChatService from "../service/ChatService"
import {Server, Socket} from "socket.io";

class chatSocket {
    private service: ChatService;

    constructor(io: Server, socket: Socket) {
        this.service = new ChatService(io, socket);
        this.sockets();
    }

    public sockets(){
        this.service.chatSockets();
    }
}


export default chatSocket
