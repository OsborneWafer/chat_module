
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { chat_room } from "./chat_room.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'chat_room_users' })
export class chat_room_users extends BaseEntity {

    @Column({
        nullable: false,
        type: 'integer',
    })
    chat_room_id: number;

    @ManyToOne(() => chat_room, (chatRoom) => chatRoom.chatUsers)
    @JoinColumn({ name: 'chat_room_id', referencedColumnName: 'id' })
    chat_room_data: chat_room;

    @Column({
        nullable: false,
        type: 'integer',
    })
    user_id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity;

    @Column({
        nullable: true,
        default: false
    })
    is_group_admin: boolean;

    @Column({
        nullable: false,
        default: false
    })
    user_exited: boolean;

}