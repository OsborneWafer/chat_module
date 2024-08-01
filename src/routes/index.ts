import { Router } from 'express'
import { userRoute } from './auth.route'
import { chatRoute } from './chat.route'
export const router = Router()

userRoute(router)
chatRoute(router)