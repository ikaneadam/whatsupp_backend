import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {User} from "./User";
import {Message} from "./Message";

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    UUID: string;

    @Column()
    chatName: string

    @ManyToMany(() => User,user => user.chats)
    @JoinTable()
    users: User[];

    @OneToMany(() => Message, Message => Message.chat,{ eager : true})
    Messages: Message[];

}
