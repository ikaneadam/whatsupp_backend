import {Server, Socket} from "socket.io";
import MessageDAO from "../dao/messageDAO";

class connectionService {
    private socket: Socket
    private io: Server
    public dao: MessageDAO
    constructor(socketServer: Server, socket: Socket) {
        this.socket = socket;
        this.io = socketServer;
        this.dao = new MessageDAO();
    }

    public listenToChat() {
        //luistert naar chat
        // als user een chatuuid geeft dan wordt daar een nieuwe event voor gemaakt en naar geluisterd

        this.socket.on("chat", (dataFromClient)=>{
            const chatUUID = dataFromClient
            this.socket.on("chat" + chatUUID, async (dataFromClient, next)=>{
                //todo middelware hiervan maken
                if(dataFromClient.message == undefined){ next(new Error('undefined message'))}
                if(this.isMessageValid(dataFromClient.message)){ next(new Error('incorrect Message'))}

                const message = dataFromClient.message;
                await this.dao.insertMessage(message.content, message.chatUUID, message.username)
                this.io.emit("chatMessage"+ chatUUID, message)
            })
        })
    }

    public isMessageValid(message: any){
        return (message.content == undefined) || (message.chatUUID == undefined) || (message.username == undefined)
    }

}

export default connectionService
