
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'user_sessions' })
export class user_sessions extends BaseEntity {

    @Column({
        nullable: false,
        type: 'integer',
    })
    user_id: Number;

    
    @OneToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity;

    @Column({
        nullable: true,
        type: 'varchar',
        length: 18
    })
    device_mac_address: String;

    @Column({
        nullable: true,
        type: 'text'
    })
    browser: String;

    @Column({
        nullable: true,
        type: 'text'
    })
    os: String;

    @Column({
        nullable: true,
        default: false
    })
    is_mobile: Boolean;

    @Column({
        nullable: true,
        default: false
    })
    is_tablet: Boolean;

    @Column({
        nullable: true,
        default: false
    })
    is_desktop: Boolean;
}