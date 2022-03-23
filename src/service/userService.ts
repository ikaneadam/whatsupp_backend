import {Request, Response} from "express";
import * as joi from "joi";


class UserService {
    constructor() {
    }

    private loginSchema = {
        "username": joi.string().min(6).required()
    }


    public loginUser =  async (req: Request, res: Response) => {
        const { error } = joi.validate(req.body, this.loginSchema)
        if(error) return res.status(400).send(error.details[0].message)
        // if (await this.userUtil.doesUserExist(req.body.username)) return res.status(400).send(false)
        res.send({auth: true });
    }

    private registerSchema = {
        "username": joi.string().min(6).required()
    }

    public registerUser =  async (req: Request, res: Response) => {
        const { error } = joi.validate(req.body, this.registerSchema)
        if(error) return res.status(400).send(error.details[0].message)

        // // let user = await this.dao.getUsername(req.body.username);
        // if (user.length >= 1 ) return res.status(400).send(false)

        try {
            // await this.dao.insertUser(req.body.username);
            res.status(201).send(true)
        } catch (error) {
            res.status(500);
        }
    }
}

export default UserService
