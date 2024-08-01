import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { Repository } from 'typeorm'
import { ExpressException } from '~/errors'
import { IRequest } from '~/types'
import { getTypeOrmRepository, requestHandler } from '~/utils'
import { UserEntity } from '~/libs'

export const joinChat = requestHandler( async ( req: IRequest, res: Response ) => {

    const { toUserId } = req.body;

    const userLoggedIn = req.authenticatedUser;

    console.log(`Logged In User ${JSON.stringify(userLoggedIn)}`);

    if (toUserId && toUserId == userLoggedIn.id) throw new ExpressException('Cannot send message to self', StatusCodes.FAILED_DEPENDENCY)

    const userRepo = getTypeOrmRepository(UserEntity) as Repository<UserEntity>

    const user = await userRepo.findOne( {
        where: {
            id: toUserId,
            client_id: userLoggedIn.client_id
        },
        relations: ["client"]
    })

    if (!user) throw new ExpressException('Invalid User', StatusCodes.FAILED_DEPENDENCY)

    console.log(`User data ${JSON.stringify(user)}`);

    const clientData = user.client;

    const roomName = `${userLoggedIn.full_name.slice(0,3)}_${clientData.name.slice(0,3)}_${user.full_name.slice(0,3)}`.toLowerCase();

    return res.status(StatusCodes.OK).send({ roomName, user })
})
