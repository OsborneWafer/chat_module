import { StatusCodes } from "http-status-codes";
import { Repository } from "typeorm";
import { ExpressException } from "~/errors";
import { ClientEntity, UserEntity } from "~/libs";
import { getTypeOrmRepository } from "~/utils";
import * as EmailValidator from 'email-validator';

export const registerNewUser = async (user_id: string, client_email: string, client_name: string, email: string, firstName: string, lastName: string, role: string) => {

    if (!user_id || user_id.trim() == '') {
        throw new ExpressException('Client User Id is missing', StatusCodes.FAILED_DEPENDENCY)
    }

    console.log(`Email Validator ${EmailValidator.validate(client_email)}`);
    const clientEmailValid = EmailValidator.validate(client_email);
    if (!clientEmailValid) {
        console.log(`Client Email validation error:- ${clientEmailValid}`);
        
        let errorMessage = 'Invalid Client Email Id';
        /* Object.values(clientEmailValid.validators).map(data => {
            if (data.reason && data.reason.trim() != '') {
                errorMessage = data.reason
                return data.reason;
            }
        }) */
        throw new ExpressException(errorMessage, StatusCodes.FAILED_DEPENDENCY)
    }
    const userEmailValid = EmailValidator.validate(email)
    if (!userEmailValid) {
        console.log(`User Email validation error:- ${userEmailValid}`);
        
        let errorMessage = 'Invalid User Email Id';
        throw new ExpressException(errorMessage, StatusCodes.FAILED_DEPENDENCY)
    }

    const clientRepo = getTypeOrmRepository( ClientEntity ) as Repository<ClientEntity>

    const checkClient = await clientRepo.findOne({
        where: {
            email: client_email
        }
    });

    let userClientId = checkClient ? checkClient.id : null;
    if (!checkClient) {
        const newClient = new ClientEntity();
        newClient.name = client_name;
        newClient.email = client_email;

        const clientResp = await clientRepo.save(newClient);
        userClientId = clientResp.id;
    }

    if (!userClientId) throw new ExpressException( 'Invalid User Client', StatusCodes.FAILED_DEPENDENCY )

    const userRepo = getTypeOrmRepository( UserEntity ) as Repository<UserEntity>

    const user = await userRepo.findOne( {
        where: {
            email,
            client_id: userClientId
        },
        relations: ["client"]
    } )

    if (user) {
        return user
    } else {
        const userRole = (role as string).trim();
        const newUser = new UserEntity();
        newUser.client_user_id = user_id;
        newUser.full_name = `${firstName} ${lastName}`;
        newUser.client_id = userClientId;
        newUser.email = email;
        newUser.role = userRole;
        const userResp = await userRepo.save(newUser)
    
        return userResp;
    } // throw new ExpressException( 'User already exists', StatusCodes.CONFLICT )

}