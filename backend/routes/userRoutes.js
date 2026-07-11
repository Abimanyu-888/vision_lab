import express from 'express'
const router=express.Router()//mini express application
import { createUser } from '../controllers/userController.js'


router.get('/user/:id',(req,res)=>{
    res.send("user found")
})

router.post('/user',createUser)

export default router