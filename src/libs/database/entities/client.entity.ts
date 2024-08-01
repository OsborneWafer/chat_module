import { Column, Entity, JoinColumn, OneToMany } from 'typeorm'
import { UserStatus } from './../../enums/user.enum'
import { BaseEntity } from './base.entity'
import { UserEntity } from './user.entity'

@Entity( { name: 'clients' } )
export class ClientEntity extends BaseEntity {

    @OneToMany(() => UserEntity, (user) => user.client)
    users: UserEntity[]
    
    @Column( {
        unique: true,
        nullable: false,
        type: 'varchar',
    })
    name: string

    @Column( {
        unique: true,
        nullable: true,
        type: 'varchar',
    })
    email: string

    @Column( { enum: UserStatus,
        type: 'enum',
        nullable: false,
        default: UserStatus.NOT_VERIFIED
    } )
    status: UserStatus
}