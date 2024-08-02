import { Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ILike, Not, Repository } from 'typeorm'
import { ExpressException } from '~/errors'
import { UserEntity } from '~/libs'
import { IRequest } from '~/types'
import { generateToken, getTypeOrmRepository, requestHandler } from '~/utils'
import { registerNewUser } from '~/services'

export const loginController = requestHandler( async ( req: IRequest, res: Response ) => {
    const { client_email, user_id, client_name, email, firstName, lastName, role } = req.body

    const newUserData = await registerNewUser(user_id ? user_id.toString() : '', client_email, client_name, email, firstName, lastName, role);
    console.log(`New User Data:- `);
    console.log({ newUserData })

    const userRepo = getTypeOrmRepository( UserEntity ) as Repository<UserEntity>

    const user = await userRepo.findOne({
        where: {
            client_id: newUserData.client_id,
            email,
        },
        relations: {
            client: true
        }
    })

    if ( !user ) throw new ExpressException( 'User not found', StatusCodes.NOT_FOUND )

    console.log(`User data ${JSON.stringify(user)}`);

    // const isPasswordValid = bcrypt.compareSync( password, user.password )

    // if ( !isPasswordValid ) throw new ExpressException( 'Invalid credentials', StatusCodes.BAD_REQUEST )

    return res.status( StatusCodes.OK ).send( {
        user, 
        ...await generateToken( {
        id: user.id,
        email: user.email,
        role: user.role,
    } ) } )
} )

export const signupController = requestHandler( async ( req: IRequest, res: Response ) => {
    const { client_email, user_id, client_name, email, firstName, lastName, role } = req.body

    const newUserData = await registerNewUser(user_id ? user_id.toString() : '', client_email, client_name, email, firstName, lastName, role);
    console.log(`New User Data:- `);
    console.log({ newUserData })

    return res.status(StatusCodes.CREATED).send({
        message: 'User created successfully',
    })
} )

export const searchUser = requestHandler( async ( req: IRequest, res: Response ) => {
    const search = req.query.search ? (req.query.search as string).trim() : "";
    const userLoggedIn = req.authenticatedUser;
    console.log(`Logged In User ${userLoggedIn.full_name}`)

    if (search.length >= 2) {
        console.log(`Search ${search}`)
        const userRepo = getTypeOrmRepository(UserEntity) as Repository<UserEntity>
        const users = await userRepo.find({
            select: {
                id: true,
                full_name: true,
                short_name: true,
                role: true,
                profile_pic: true
            },
            where: {
                full_name: ILike(`%${search}%`),
                id: Not(req.authenticatedUser.id)
            },
            order: {
                full_name: "asc"
            }
        })
        return res.status(StatusCodes.OK).send({
            list: users,
        })
    } else {
        return res.status(StatusCodes.OK).send({
            list: [],
        })
    }
})

export const verifyController = requestHandler( async ( req: IRequest, res: Response ) => {
    return res.status( StatusCodes.OK ).send( {
        message: 'Ok',
    } )
} ) 