import express from 'express';
import {register,login,logout} from '../controllers/adminController.js'


const adminRouter=express.Router()

adminRouter.post('/register',register)
adminRouter.post('/login',login)
adminRouter.post('/logout',logout)

export {adminRouter}