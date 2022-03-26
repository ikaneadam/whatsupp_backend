import {Request, Response} from "express";
import * as joi from "joi";
import { AppDataSource } from '../data-source'
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import {Chat} from "../entity/Chat";

class UserService {
    private repository = AppDataSource.getRepository(User)
    constructor() {

    }


    private loginSchema = joi.object({
        "username": joi.string().min(6).required()
    })

    public loginUser =  async (req: Request, res: Response) => {
        const { error } = this.loginSchema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        if (!await this.doesUserExist(req.body.username)) return res.status(400).send({auth: false })
        res.send({auth: true });
    }

    public async doesUserExist(Username: string): Promise<Boolean> {
        const user = await this.repository.findOne({ where: { username: Username } })
        return user != null
    }

    private registerSchema = joi.object({
        "username": joi.string().min(6).required()
    })

    public registerUser =  async (req: Request, res: Response) => {
        const { error } = this.registerSchema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        if (await this.doesUserExist(req.body.username)) return res.status(400).send({auth: false })

        try {
            await this.saveUser(req.body.username);
            res.status(201).send({auth: true })
        } catch (error) {
            res.status(500);
        }
    }


    public async saveUser(username: string){
        const user = new User()
        user.username = username
        return await AppDataSource.manager.save(user)
    }
}

export default UserService
