import BackendApp from "./backendApp";
import cors from "cors";
import express from "express";
import {Server, Socket} from "socket.io";

import UserController from "./controllers/userController";
import createChatSocket from "./sockets/createChatSocket";
const server = new BackendApp({
    port: 5000,
    middleWares: [
        cors(),
        express.json(),
        express.urlencoded({ extended: true })
    ],
    controllers: [
        new UserController()
    ]
})


const io:Server = new Server(server.server,{cors: {origin:"http://localhost:4200"}});

io.on("connection", (Socket: Socket) => {
    new createChatSocket(io, Socket)
})


