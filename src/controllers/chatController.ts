import * as express from 'express'
import ChatService from "../service/chatService"
import tokenVerification from "../middleware/jwtTokenCheck";

class ChatController {
    public path = '/api/chat/:id?'
    public router = express.Router()
    private service = new ChatService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.use(this.path, tokenVerification)
        this.router.get(this.path, this.service.getChat)
        this.router.get(this.path + "/messages", this.service.getMessagesFromChat)
        this.router.post(this.path, this.service.postChat)
    }
}


export default ChatController
