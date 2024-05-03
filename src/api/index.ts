import express from 'express'
const apiRouter = express.Router()
import {userRouters} from './user/router'

apiRouter.use('/',userRouters)


export { apiRouter }