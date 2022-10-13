import {Request, Response} from "express";
import * as joi from "joi";
import { AppDataSource } from '../data-source'
import {User} from "../entity/User";

class UserService {
    private repository = AppDataSource.getRepository(User)
    constructor() {

    }


    private loginSchema = joi.object({
        "username": joi.string().min(3).required()
    })

    public loginUser =  async (req: Request, res: Response) => {
        const { error } = this.loginSchema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        if (!await this.doesUserExist(req.body.username)) return res.status(400).send({auth: false })
        res.send({auth: true });
    }

    public getUser =  async (req: Request, res: Response) => {
        try {
            const user = await this.repository.findOne({ where: { username: req.params.id } })

            if(user === null){ return res.status(404).send() }
            res.status(200).send(user)

        } catch (error) {
            res.status(500);
        }
    }

    public async doesUserExist(Username: string): Promise<Boolean> {
        const user = await this.repository.findOne({ where: { username: Username } })
        return user != null
    }

    private registerSchema = joi.object({
        "username": joi.string().min(3).required()
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

    //for DOA layer
    public async saveUser(username: string){
        const user = new User()
        user.username = username
        return await AppDataSource.manager.save(user)
    }
}

export default UserService
