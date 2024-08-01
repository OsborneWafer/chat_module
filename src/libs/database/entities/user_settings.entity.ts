
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";
import { IUserSettings } from "~/libs";

@Entity({ name: 'user_settings' })
export class user_settings extends BaseEntity {

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
        type: 'simple-json'
    })
    settings: IUserSettings
}