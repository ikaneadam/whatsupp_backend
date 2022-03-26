import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import {Message} from "../entity/Message";
import {Chat} from "../entity/Chat";
import {Repository} from "typeorm";
class ChatDAO {
    private userRepository: Repository<User>
    private messageRepository: Repository<Message>
    private chatRepository: Repository<Chat>

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
        this.messageRepository = AppDataSource.getRepository(Message)
        this.chatRepository = AppDataSource.getRepository(Chat)
    }

    public async createChat(requester: User, receiver: User, chatName: string){
        const users = [requester, receiver]
        const chat = new Chat()
        chat.chatName = chatName
        chat.users = users
        await this.chatRepository.save(chat)
        return chat
    }
//todo teveel parameters
    public async createMessage(requester: User, receiver: User, content: string, chatUUID: string){
        const message = new Message()
        message.content = content
        message.chat = await this.getChat(chatUUID)
        message.isReceived = false
        message.TimeStamp = String(this.getLocalTime())
        message.userName = requester.username
        message.userNameReceiver = receiver.username
        await this.messageRepository.save(message)
    }

    public async addChatToUser(chat: Chat, userUUid: string){
        const user: User = await this.userRepository.findOne({ where: { UUID: userUUid } })
        if (user.chats = undefined){
            user.chats = [chat]
        }

        user.chats = user.chats.concat([chat]);
        await this.userRepository.save(user);
    }

    //todo util
    public getLocalTime(){
         return Date.now();
    }

    public async doesUserExist(Username: string): Promise<Boolean> {
        const user = await this.userRepository.findOne({ where: { username: Username } })
        return user != undefined
    }

    public async getUser(username: string): Promise<User> {
        return await this.userRepository.findOne({ where: { username: username } })
    }

    public async getChat(UUID: string): Promise<Chat> {
        return await this.chatRepository.findOne({ where: { UUID: UUID }})
    }

    public async getMessage(UUID: string): Promise<Message> {
        return await this.messageRepository.findOne({ where: { UUID: UUID } })
    }

    public async setMessageReceived(messageUUID: string) {
        const message = await this.getMessage(messageUUID)
        message.isReceived = true
        await this.messageRepository.save(message);
    }

    public async setMessagesReceived(messages: Message[]) {
        for (let message of messages) {
            message.isReceived = true
            await this.messageRepository.save(message);
        }
    }

    public async getOfflineMessages(username: string): Promise<Message[]>{
        return await this.messageRepository.find(
            {where: {
                userNameReceiver: username,
                isReceived: false}
            })
    }

    public async getUserChats(userUUID: string): Promise<Chat[]>{
        const chats = await AppDataSource.getRepository(Chat)
            .createQueryBuilder("chat")
            .leftJoin("chat.users", "user")
            .where(`user.UUID= :id`,{id: userUUID})
            .getMany();
        const chatWithMessages: Chat[] = []
        for(let chat of chats){
            chatWithMessages.push(await this.getChat(chat.UUID))
        }
        return chatWithMessages
    }
}

export default ChatDAO
