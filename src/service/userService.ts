import {Request, Response} from "express";
import UserDAO from "../dao/userDAO"
import * as joi from "joi";
import * as jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

class UserService {
    public dao: UserDAO
    private SECERET_TOKEN = String(process.env.seceret_token)
    constructor() {
        this.dao = new UserDAO()
    }

    public getUser =  async (req: Request, res: Response) => {
        if(req.params.id == undefined){
            let user = await this.dao.getUsers();
            res.json(user)
        } else{
            let user = await this.dao.getUser(req.params.id)
            res.json(user)
        }

    }

    private loginSchema = {
        "username": joi.string().min(6).required(),
        "password": joi.string().min(6).required()
    }

    public loginUser =  async (req: Request, res: Response) => {
        const { error } = joi.validate(req.body, this.loginSchema)
        if(error) return res.status(400).send(error.details[0].message)

        //check if username already exist
        let username = await this.dao.getUsername(req.body.username);
        if (username.length == 0 ) return res.status(200).send("username or password is incorrect")
        // is the password correct


        // @ts-ignore
        const password = username[0].password;
        const validPassword = await bcrypt.compare(req.body.password,password);
        if (!validPassword) return res.status(200).send("email or password is incorrect")

        //shi token
        // @ts-ignore
        const payload = { username: username[0].username, userid: username[0].uuid,code: username[0].friendshipcode}
        const token = jwt.sign(payload, this.SECERET_TOKEN);
        res.send({auth: token });
    }


    private registerSchema = {
        "username": joi.string().min(6).required(),
        "password": joi.string().min(6).required()
    }


    public registerUser =  async (req: Request, res: Response) => {
        // validate data
        const { error } = joi.validate(req.body, this.registerSchema)
        if(error) return res.status(400).send(error.details[0].message)

        //check if mail already exist
        let user = await this.dao.getUsername(req.body.username);
        if (user.length >= 1 ) return res.status(200).send("username already exist")

        try {
            // hash password
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.password, salt);

            //insert user to db
            let insertUser = await this.dao.insertUser(req.body.username, encryptedPassword, this.genarateFriendshipCode(req.body.username));
            let user = await this.dao.getUsername(req.body.username);
            // @ts-ignore
            let savedUser = {id: user[0].uuid, username: user[0].username, code: user[0].friendshipcode}
            res.send(savedUser);
        } catch (error) {
            res.status(500);
        }
    }

    public deleteUser =  async (req: Request, res: Response) => {
        try {
            let deletedProduct = await this.dao.deleteUser(parseInt(req.params.id))
            res.json({message: "succesfully deleted user"})
        }catch (e) {
            res.statusCode = 500
            res.json({"error": e})
        }
    }


    public genarateFriendshipCode(username: string): string{
        const code = Math.floor(1000 + Math.random() * 9000);
        return `${username}#${code}`
    }
}

export default UserService
