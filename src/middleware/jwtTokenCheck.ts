import * as jwt from 'jsonwebtoken'
import {Request, Response} from "express";

let tokenVerification = (req: Request, res: Response, next: any) => {
    const SECERET_TOKEN = String(process.env.seceret_token)
    let accessToken = req.header("Authorization")

    if (!accessToken) {
        return res.status(403).send()
    }

    let payload
    try{
        payload = jwt.verify(accessToken, SECERET_TOKEN)
        next()
        return
    }
    catch(e){
        res.status(401)
        res.json(e.message)
        return
    }
}

export default tokenVerification
