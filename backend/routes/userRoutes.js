import express from 'express'
import { createUser } from '../controllers/userController.js'

const router=express.Router()//mini express application


router.post('/auth/signin',createUser)


export default router