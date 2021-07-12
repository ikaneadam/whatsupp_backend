import * as express from 'express'
import UserService from "../service/userService"
import tokenVerification from "../middleware/jwtTokenCheck";

class UserController {
    public path = '/api/user/:id?'
    public pathLogin = '/api/user/login'
    public pathRegister = '/api/user/register'
    public router = express.Router()
    private service = new UserService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.post(this.pathLogin, this.service.loginUser)
        this.router.post(this.pathRegister, this.service.registerUser)
        this.router.use(this.path, tokenVerification)
        this.router.get(this.path, this.service.getUser)
        this.router.get(this.path + "/chats", this.service.getUserChats)
        this.router.delete(this.path, this.service.deleteUser)
    }
}


export default UserController
