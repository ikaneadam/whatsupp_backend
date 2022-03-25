import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {Chat} from "./Chat";

@Entity('message')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    UUID: string;

    @Column({nullable: false})
    content: string

    @Column({nullable: false})
    chatUUID: string

    @Column({nullable: false})
    userName: string

    @Column()
    isReceived: boolean

    @Column()
    TimeStamp: string

    @ManyToOne(() => Chat, Chat => Chat.Messages)
    chat: Chat;
}

