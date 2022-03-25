import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import {User} from "./User";
import {Message} from "./Message";

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    UUID: string;

    @Column({ unique: true })
    chatName: string

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];

    @OneToMany(() => Message, Message => Message.chat)
    Messages: Message[];
}
