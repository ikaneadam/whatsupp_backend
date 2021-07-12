import BackendApp from "./backendApp";
import cors from "cors";
import express from "express";
import {Server, Socket} from "socket.io";

import UserController from "./controllers/userController";
import ChatController from "./controllers/chatController";
import MessageController from "./controllers/messageController";

import chatSocket from "./sockets/chatSocket";

const server = new BackendApp({
    port: 5000,
    middleWares: [
        cors(),
        express.json(),
        express.urlencoded({ extended: true })
    ],
    controllers: [
        new UserController(),
        new ChatController(),
        new MessageController()
    ]
})


const io:Server = new Server(server.server,{cors: {origin: String(process.env.FRONT_END_URL)}});

io.on("connection", (socket:Socket) => {
    new chatSocket(io, socket);
})
