import { UserEntity } from './../libs/database/entities/user.entity'
import { Request } from 'express'
import { UserRole } from '~/libs'

export type IRequest = {
    payload?: {
        id: string,
        role: UserRole
        [key: string]: any
    },
    authenticatedUser?: Partial<UserEntity>
} & Request