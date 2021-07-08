import connectionService from "../service/connectionService"
import {Server, Socket} from "socket.io";

class chatSocket {
    private service: connectionService;

    constructor(io: Server, socket: Socket) {
        this.service = new connectionService(io, socket);
        this.sockets();
    }

    public sockets(){
        this.service.listenToChat();
        this.service.simplechat();
    }
}


export default chatSocket
