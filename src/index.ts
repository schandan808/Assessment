import express from 'express'
const indexRouter = express.Router()
import {apiRouter,} from './api/index'

indexRouter.use('/api',apiRouter)

export { indexRouter }