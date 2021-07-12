import ChatDAO from "../dao/ChatDAO";
import {Request, Response} from "express";
import * as joi from "joi";

class ChatService {
    public dao: ChatDAO

    constructor() {
        this.dao = new ChatDAO();
    }

    public getChat =  async (req: Request, res: Response) => {
        if(req.params.id == undefined){
            try{
                let chats = await this.dao.getChats();
                res.json(chats)
            }catch (e){
                res.statusCode = 500
                res.json({"error": e})
            }
        } else{
            try{
                let chat = await this.dao.getChat(req.params.id)
                res.json(chat)
            }catch (e){
                res.statusCode = 500
                res.json({"error": e})
            }
        }
    }

    public getMessagesFromChat =  async (req: Request, res: Response) => {
        if(req.params.id == undefined) return res.status(400).send("chat uuid undefined")
        try {
            let user = await this.dao.getMessagesFromChat(req.params.id);
            res.json(user)
        } catch (error) {
            res.status(500);
        }
    }

    private postChatScheme = {
        "chatName": joi.number().required(),
        "isGroupsChat": joi.boolean().required(),
    }

    public postChat = async (req: Request, res: Response) => {
        const { error } = joi.validate(req.body, this.postChatScheme)
        if(error) return res.status(400).send(error.details[0].message)
        try{
            const currentTime = new Date().toLocaleString();
            const insertedChat = await this.dao.insertChat(req.body.chatName, currentTime, req.body.isGroupsChat)
            res.json({message: insertedChat})
        }catch (e){
            res.statusCode = 500
            res.json({"error": e})
        }

    }

}

export default ChatService
