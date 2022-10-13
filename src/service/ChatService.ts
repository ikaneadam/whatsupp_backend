import {Server, Socket} from "socket.io";
import ChatDAO from "../dao/chatDAO";


class ChatService {
    private chatDao: ChatDAO
    private socket: Socket
    private io: Server
    constructor(socketServer: Server, socket: Socket) {
        this.chatDao = new ChatDAO()
        this.socket = socket;
        this.io = socketServer;
    }

    public chatSockets() {
        this.getAllChatsSocket()
        this.createChatSocket()
        this.messagingSocket()
    }

    public getAllChatsSocket() {
        this.socket.on("getChats", async (username) => {
            const user = await this.chatDao.getUser(username)
            const chats = await this.chatDao.getUserChats(user.UUID)
            this.socket.emit(`receiveChats-${username}`,chats)
        })
    }

    public createChatSocket(){
        this.socket.on("createChat", async (user_requester, user_receiver,chatName) => {
            if(user_requester === user_receiver){
                return
            }
            const requester = await this.chatDao.getUser(user_requester)
            const receiver = await this.chatDao.getUser(user_receiver)
            if( requester === null || receiver === null){
                return
            }
            const chat = await this.chatDao.createChat(requester, receiver, chatName)
            const createdChat = await this.chatDao.getChat(chat.UUID)
            this.socket.broadcast.emit(`receiveChat-${user_receiver}`, createdChat)
        })
    }

    public messagingSocket(){
        this.socket.on("sendMessage", async (user_requester, user_receiver,chatUUID, message) => {
            const requester = await this.chatDao.getUser(user_requester)
            const insertedMessage = await this.chatDao.createMessage(requester, message, chatUUID)
            insertedMessage.chat = null
            this.socket.broadcast.emit(`receiveMessage-${chatUUID}`, insertedMessage)
        })
    }
}

export default ChatService
