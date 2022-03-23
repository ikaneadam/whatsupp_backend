import createChatService from "../service/createChatService"
import {Server, Socket} from "socket.io";

class createChatSocket {
    private service: createChatService;

    constructor(io: Server, socket: Socket) {
        this.service = new createChatService(io, socket);
        this.sockets();
    }

    public sockets(){
        this.service.listenToCreateChat();
    }
}


export default createChatSocket
