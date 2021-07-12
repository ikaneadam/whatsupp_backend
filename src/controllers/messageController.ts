import * as express from 'express'
import MessageService from "../service/messageService"
import tokenVerification from "../middleware/jwtTokenCheck";

class MessageController {
    public path = '/api/message/:id?'
    public router = express.Router()
    private service = new MessageService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.use(this.path, tokenVerification)
        this.router.get(this.path, this.service.getMessage)
        this.router.post(this.path, this.service.postMessage)
    }
}


export default MessageController
