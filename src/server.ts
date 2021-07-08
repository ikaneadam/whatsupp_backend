import BackendApp from "./backendApp";
import cors from "cors";
import express from "express";
import {Server, Socket} from "socket.io";
import UserController from "./controllers/userController";
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
    ]
})


const io:Server = new Server(server.server,{cors: {origin: String(process.env.FRONT_END_URL)}});
// in de eerste connection moet er duidelijk worden welke user geconnect is uuid is genoeg
// dit kan dan met elke klasse meegegeven worden.

//neeeeeee
//de frontend vraagt gwn met een http request alle user chats berichten en vriendne op

//we gebruiekn de sockets alleen voor de real time data aan elkaar te geven.




io.on("connection", (socket:Socket) => {
    new chatSocket(io, socket);
})
