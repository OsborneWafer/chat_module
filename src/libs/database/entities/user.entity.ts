import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { UserStatus } from './../../enums/user.enum'
import { BaseEntity } from './base.entity'
import { ClientEntity } from './client.entity'

@Entity( { name: 'users' } )
export class UserEntity extends BaseEntity {

    @Column( {
        nullable: false,
    } )
    client_id: number;

    @ManyToOne(() => ClientEntity, (data) => data.users)
    @JoinColumn({ name: 'client_id', referencedColumnName: 'id' }) // Important to mention column names
    client: ClientEntity;
    
    @Column( {
        nullable: false,
        type: 'varchar',
    } )
    full_name: string;

    @Column( {
        nullable: true,
        type: 'varchar',
    } )
    short_name: string;

    @Column( {
        nullable: false,
        type: 'varchar',
    } )
    client_user_id: string;

    @Column( {
        type: 'varchar',
        nullable: false,
    })
    role: string;

    @Column( {
        nullable: false,
        type: 'varchar',
    } )
    email: string;

    @Column({
        nullable: true,
        type: 'bigint'
    })
    mobile_no: number;

    @Column({
        nullable: true,
        type: 'text'
    })
    profile_pic: string;

    @Column( { enum: UserStatus,
        type: 'enum',
        nullable: false,
        default: UserStatus.NOT_VERIFIED
    } )
    status: UserStatus;
}