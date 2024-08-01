import { NextFunction, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { IRequest } from '~/types'
import { getTypeOrmRepository, verifyToken } from '~/utils'
import { Repository } from 'typeorm'
import { UserEntity } from '~/libs'

export const authorizationMiddleware = async ( req: IRequest, res: Response, next: NextFunction ) => {
    if ( !req.headers.authorization || !req.headers.authorization.startsWith( 'Bearer ' ) ) {
        return res.status( StatusCodes.UNAUTHORIZED ).send( {
            message: 'Unauthorized',
        } )
    }

    const token = req.headers.authorization.split( 'Bearer ' )[ 1 ]
    await verifyToken( token )
        .then( async ( payload ) => {
            req.payload = payload.payload
            const userRepo = getTypeOrmRepository( UserEntity ) as Repository<UserEntity>
            return await userRepo.findOneOrFail( {
                where: {
                    id: payload.payload.id
                }
            } )
                .then( ( user ) => {
                    req.authenticatedUser = user
                    next()
                } )
                .catch( ( err ) => {
                    return res.status( StatusCodes.UNAUTHORIZED ).send( {
                        message: 'Unauthorized',
                    } )
                } )
        } )
        .catch( ( err ) => {
            return res.status( StatusCodes.UNAUTHORIZED ).send( {
                message: 'Unauthorized',
            } )
        } )
}