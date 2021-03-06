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
        // this.getOfflineMessagesSocket()
        // this.setMessageOnReceivedSocket()
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
            console.log(createdChat)
            this.socket.broadcast.emit(`receiveChat-${user_receiver}`, createdChat)
        })
    }

    public messagingSocket(){
        this.socket.on("sendMessage", async (user_requester, user_receiver,chatUUID, message) => {
            const requester = await this.chatDao.getUser(user_requester)
            const insertedMessage = await this.chatDao.createMessage(requester, message, chatUUID)
            insertedMessage.chat = null
            console.log(`receiveMessage-${chatUUID}`)
            this.socket.broadcast.emit(`receiveMessage-${chatUUID}`, insertedMessage)
        })
    }
    // public getOfflineMessagesSocket(){
    //     this.socket.on("getOfflineMessages", async (username) => {
    //         const messages = await this.chatDao.getOfflineMessages(username)
    //         this.socket.emit(`offlineMessages-${username}`,messages)
    //         await this.chatDao.setMessagesReceived(messages)
    //     })
    // }
    //
    // public setMessageOnReceivedSocket(){
    //     this.socket.on("setMessageReceived", async (messageUUID) => {
    //         await this.chatDao.setMessageReceived(messageUUID)
    //     })
    // }
}

export default ChatService
