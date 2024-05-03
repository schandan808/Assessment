import express from 'express'
import { getUser,Login,Registor,create ,FindData,updateData,deleteData} from './Controller'
import {auth} from '../../token'
const userRouters = express.Router()

userRouters.post('/Registor',Registor)
userRouters.post('/login',Login)
userRouters.get("/getUser",auth, getUser) // this is get the only user and get the user data
userRouters.post('/create',auth,create)
userRouters.patch('/updateData/:id',auth,updateData)
userRouters.delete('/deleteData/:id',auth,deleteData)
userRouters.get('/filterData',auth,FindData)

export { userRouters }