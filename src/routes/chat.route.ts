import { Router } from "express"
import { joinChat } from "~/controllers"
import { authorizationMiddleware } from "~/middlewares"

export const chatRoute = ( app: Router ) => {
    const router = Router()

    router.post('/join', authorizationMiddleware, joinChat)

    app.use( '/chat', router )
}