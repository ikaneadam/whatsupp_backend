import * as express from 'express'
import UserService from "../service/userService"

class UserController {
    public path = '/api/user/:id?'
    public pathLogin = '/api/user/login'
    public pathRegister = '/api/user/register'
    public yo = '/api/user/yo'
    public router = express.Router()
    private service = new UserService()

    constructor() {
        this.routes()
    }

    public routes(){
        this.router.post(this.pathLogin, this.service.loginUser)
        this.router.post(this.pathRegister, this.service.registerUser)
        this.router.get(this.yo,this.service.wrmnetjes)
    }
}


export default UserController
