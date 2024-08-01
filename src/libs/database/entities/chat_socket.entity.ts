import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { chat_room } from "./chat_room.entity";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'chat_socket' })
export class chat_socket extends BaseEntity {

    @Column({
        nullable: false,
        type: 'varchar',
        length: 100
    })
    socket_room: string;

    @Column({
        nullable: false,
        type: 'integer',
    })
    chat_room_id: number;

    @ManyToOne(() => chat_room, (chatRoom) => chatRoom.chatSocket)
    @JoinColumn({ name: 'chat_room_id', referencedColumnName: 'id' })
    chat_room_data: chat_room;

}