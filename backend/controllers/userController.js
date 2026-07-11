import {User} from '../models/user.js'

export async function createUser(req,res) {
    try{
        const {firebaseUID,name,email}=req.body

        const existingUser=await User.findOne({firebaseUID:firebaseUID})
        if(existingUser){
            return res.status(201).json(existingUser)
        }

        const user=await User.create({
            firebaseUID,
            name,
            email
        })
        console.log(user)
        res.status(201).json(user)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Failed to create user"})
    }
    
}