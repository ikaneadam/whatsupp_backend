import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Chat} from "./Chat";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    UUID: string;

    @Column({ unique: true })
    username: string

    @ManyToMany(() => Chat)
    @JoinTable()
    chats: Chat[];
}
