import MessageDAO from "../dao/messageDAO";
import {Request, Response} from "express";

class MessageService {
    public dao: MessageDAO

    constructor() {
        this.dao = new MessageDAO();
    }

    public getMessage =  async (req: Request, res: Response) => {

    }





}

export default MessageService
