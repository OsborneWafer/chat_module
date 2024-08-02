import { Router } from "express"
import { joinChat, joinGroupChat } from "~/controllers"
import { authorizationMiddleware } from "~/middlewares"

export const chatRoute = ( app: Router ) => {
    const router = Router()

    router.post('/join', authorizationMiddleware, joinChat)
    router.post('/group/join', authorizationMiddleware, joinGroupChat)

    app.use( '/chat', router )
}