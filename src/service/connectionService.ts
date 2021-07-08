import {Server, Socket} from "socket.io";

class connectionService {
    private socket: Socket
    private io: Server

    constructor(socketServer: Server, socket: Socket) {
        this.socket = socket;
        this.io = socketServer;
    }

    public listenToChat() {
        //luistert naar chat
        // als user een chatuuid geeft dan wordt daar een nieuwe event voor gemaakt en naar geluisterd

        this.socket.on("chat", (dataFromClient)=>{
            const chatUUID = dataFromClient
            this.socket.on("chat" + chatUUID, (dataFromClient)=>{
                console.log("chatMessage"+ chatUUID)
                this.io.emit("chatMessage"+ chatUUID, dataFromClient)
            })
        })
    }

    public simplechat(){
        // this.socket.on("message", (dataFromClient)=>{
        //     this.io.emit("test",dataFromClient);
        //     console.log(dataFromClient)
        // })
    }

}

export default connectionService
