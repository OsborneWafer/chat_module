import { Router } from 'express'
import { loginController, searchUser, verifyController } from '~/controllers'
import { loginBodyValidator } from '~/middlewares'
import { authorizationMiddleware } from '~/middlewares'

export const userRoute = ( app: Router ) => {
    const router = Router()

    /* router.post( '/register',
        signupBodyValidator,
        signupController
    ) */

    router.post('/login', loginBodyValidator, loginController)
    
    router.get('/users', authorizationMiddleware, searchUser)

    router.get( '/verify',
        authorizationMiddleware,
        verifyController
    )

    app.use( '/auth', router )
}