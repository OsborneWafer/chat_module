import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { In, Repository } from 'typeorm'
import { ExpressException } from '~/errors'
import { IRequest } from '~/types'
import { getTypeOrmRepository, requestHandler } from '~/utils'
import { IChatUsers, UserEntity } from '~/libs'
import { addChatRoomDetails } from '~/services'

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

    const newChatUsers: IChatUsers[] = [];
    newChatUsers.push({
        user_id: userLoggedIn.id,
        is_group_admin: false
    });
    newChatUsers.push({
        user_id: user.id,
        is_group_admin: false
    });

    const clientData = user.client;

    const roomName = `${userLoggedIn.full_name.slice(0,3)}_${clientData.name.slice(0,3)}_${user.full_name.slice(0,3)}`.toLowerCase();

    const newChatRoom = await addChatRoomDetails(roomName,false,newChatUsers,user.full_name);

    return res.status(StatusCodes.OK).send({ newChatRoom })
})

export const joinGroupChat = requestHandler( async ( req: IRequest, res: Response ) => {
    const { toUsersList, group_name } = req.body;

    const userLoggedIn = req.authenticatedUser;

    console.log(`Logged In User ${JSON.stringify(userLoggedIn)}`);

    const groupUserList = toUsersList as number[];

    const userRepo = getTypeOrmRepository(UserEntity) as Repository<UserEntity>
    const user = await userRepo.find({
        where: {
            id: In(groupUserList),
            client_id: userLoggedIn.client_id
        },
        relations: ["client"]
    })

    if (user.length <= 0) {
        throw new ExpressException('Users not found', StatusCodes.FAILED_DEPENDENCY)
    }
    const clientData = user[0].client;

    let roomName = `${userLoggedIn.full_name.slice(0,3)}_${clientData.name.slice(0,3)}`;

    const groupChatUsers: IChatUsers[] = user.map(data => {
        if (data.id != userLoggedIn.id) {
            roomName += `_${data.full_name.slice(0,3)}`
            return {
                user_id: data.id,
                is_group_admin: false
            }
        }
    })

    groupChatUsers.push({
        user_id: userLoggedIn.id,
        is_group_admin: true
    })
    const roomNameLimit = 5 * groupChatUsers.length;
    const groupName = (group_name as string).trim().replaceAll(" ","_").toLowerCase();
    const groupShortName = groupName.slice(0,groupName.length)
    roomName = roomName.slice(0,roomNameLimit).concat('@').concat(groupShortName).toLowerCase();

    const newChatRoom = await addChatRoomDetails(roomName,true,groupChatUsers,group_name);

    return res.status(StatusCodes.OK).send({ newChatRoom })
})
