import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { chat_room } from "./chat_room.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'chat' })
export class chat extends BaseEntity {

    @Column({
        nullable: false,
        type: 'integer',
    })
    sender_id: Number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
    sender_data: UserEntity;

    @Column({
        nullable: false,
        type: 'integer',
    })
    receiver_id: Number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'receiver_id', referencedColumnName: 'id' })
    receiver_data: UserEntity;

    @Column({
        nullable: false,
        type: 'text',
    })
    message: String;

    @Column({
        nullable: true,
        default: false
    })
    read: Boolean;

    @Column({
        nullable: false,
        type: 'integer',
    })
    chat_room_id: Number;

    @ManyToOne(() => chat_room, (chatRoom) => chatRoom.chatLog)
    @JoinColumn({ name: 'chat_room_id', referencedColumnName: 'id' })
    chat_room_data: chat_room;

}