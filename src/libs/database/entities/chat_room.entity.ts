import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { chat_room_users } from "./chat_room_users.entity";
import { chat } from "./chat.entity";
import { chat_socket } from "./chat_socket.entity";

@Entity({ name: 'chat_room' })
export class chat_room extends BaseEntity {

    @OneToMany(() => chat_room_users, (chatRoomUsers) => chatRoomUsers.chat_room_data)
    chatUsers: chat_room_users[];

    @OneToMany(() => chat, (chatData) => chatData.chat_room_data)
    chatLog: chat[];

    @OneToMany(() => chat_socket, (chatSocket) => chatSocket.chat_room_data)
    chatSocket: chat_socket[];

    @Column({
        nullable: true,
        type: 'varchar',
        length: 100
    })
    name: string;

    @Column({
        nullable: true,
        default: false
    })
    is_group: boolean;

    @Column({
        nullable: false,
        default: false
    })
    is_deleted: boolean;

}