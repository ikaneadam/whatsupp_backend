import express from "express";
import {Express} from 'express-serve-static-core';
import { Server } from "http";
import { AppDataSource } from "./data-source"

class BackendApp {
    public app: Express
    public port: number
    public server: Server
    constructor(appInit: { port: number; controllers: any; middleWares: any;}) {
        this.app = express()
        this.port = appInit.port
        this.middlewares(appInit.middleWares)
        this.routes(appInit.controllers)
        this.server = this.listen();
        AppDataSource.initialize().then(async () => {}).catch(error => console.log(error))
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        });

        this.app.use((req, res, next) => {
            res.status(404).send('<h1> Page not found </h1>');
        });
    }

    public listen() {
        const server = this.app.listen(this.port)
        console.log(`Server listening on http://localhost:${this.port}`)
        return server
    }
}

export default BackendApp
