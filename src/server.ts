import BackendApp from "./backendApp";
import cors from "cors";
import express from "express";
import {Server, Socket} from "socket.io";

import UserController from "./controllers/userController";
import chatSocket from "./sockets/ChatSocket";

const server = new BackendApp({
    port: Number(process.env.PORT) | 5000,
    middleWares: [
        cors(),
        express.json(),
        express.urlencoded({ extended: true })
    ],
    controllers: [
        new UserController()
    ]
})


const io:Server = new Server(server.server,{cors: {origin: "*"}});

io.on("connection", (socket:Socket) => {
    new chatSocket(io, socket);
})


